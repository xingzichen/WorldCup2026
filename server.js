import { createServer } from "node:http";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "public");

function loadLocalEnv() {
  try {
    const envFile = readFileSync(join(__dirname, ".env.local"), "utf8");
    for (const line of envFile.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const separator = trimmed.indexOf("=");
      if (separator === -1) continue;

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // Local env is optional; production can use real environment variables.
  }
}

loadLocalEnv();

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 5173);

const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200";
const STANDINGS_URL =
  "https://site.web.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";
const EVENT_SUMMARY_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary";
const THE_ODDS_API_KEY = process.env.THE_ODDS_API_KEY || "";
const THE_ODDS_API_SPORT_KEY = process.env.THE_ODDS_API_SPORT_KEY || "soccer_fifa_world_cup";
const THE_ODDS_API_BOOKMAKERS =
  process.env.THE_ODDS_API_BOOKMAKERS || "williamhill,ladbrokes_uk,bet365";
const THE_ODDS_API_URL =
  `https://api.the-odds-api.com/v4/sports/${THE_ODDS_API_SPORT_KEY}/odds/`;
const ODDS_REFRESH_TIMEZONE = process.env.ODDS_REFRESH_TIMEZONE || "Asia/Shanghai";
const ODDS_REFRESH_START_HOUR = Number(process.env.ODDS_REFRESH_START_HOUR || 8);
const ODDS_REFRESH_END_HOUR = Number(process.env.ODDS_REFRESH_END_HOUR || 20);
const ODDS_REFRESH_INTERVAL_MS = Number(process.env.ODDS_REFRESH_INTERVAL_MS || 3 * 60 * 60 * 1000);
const ODDS_CACHE_FILE = process.env.ODDS_CACHE_FILE || join(__dirname, "data", "odds-cache.json");
const PLAYER_RATINGS_CACHE_FILE =
  process.env.PLAYER_RATINGS_CACHE_FILE || join(__dirname, "data", "player-ratings-cache.json");
const PLAYER_RATING_FORMULA_VERSION = "espn-site-rating-v3";

const PLAYER_RATING_FORMULA = {
  version: PLAYER_RATING_FORMULA_VERSION,
  source: "ESPN public event summary roster stats and key events",
  name: "本站 ESPN 数据评分",
  range: "3.0-10.0",
  base: 6,
  eligibility: {
    matchMinutes: 15,
    rankingMinutes: 30,
    positions: ["midfielder", "forward"],
    description: "仅统计中场和前锋；后卫和门将不进入评分榜。单场出场少于 15 分钟不进入榜单；累计有效出场时间少于 30 分钟不进入总榜。"
  },
  aggregation: "按有效单场出场时间加权平均：sum(rating * minutes) / sum(minutes)。",
  rules: [
    "基础分 6.0。",
    "运动战进球：中场/前锋 +1.00；点球进球 +0.60，不再按普通进球加分。",
    "助攻 +0.70。",
    "射正 +0.15，其他未射正射门 -0.05。",
    "被犯规 +0.05。",
    "犯规 -0.06，黄牌 -0.35，红牌 -1.20，乌龙球 -1.00。",
    "最终单场分限制在 3.0 到 10.0 之间，并保留 1 位小数。"
  ]
};

function loadPersistedOddsCache() {
  try {
    const persisted = JSON.parse(readFileSync(ODDS_CACHE_FILE, "utf8"));
    return {
      expiresAt: Number(persisted.expiresAt ?? 0),
      fetchedAt: persisted.fetchedAt ?? "",
      data: Array.isArray(persisted.data) ? persisted.data : [],
      status: persisted.status ?? "persisted",
      error: persisted.error ?? ""
    };
  } catch {
    return {
      expiresAt: 0,
      fetchedAt: "",
      data: [],
      status: "empty",
      error: ""
    };
  }
}

function persistOddsCache(cache) {
  try {
    mkdirSync(dirname(ODDS_CACHE_FILE), { recursive: true });
    writeFileSync(
      ODDS_CACHE_FILE,
      JSON.stringify(
        {
          ...cache,
          persistedAt: new Date().toISOString()
        },
        null,
        2
      )
    );
  } catch (error) {
    console.warn(`Failed to persist odds cache: ${error.message}`);
  }
}

let oddsApiCache = loadPersistedOddsCache();
let oddsApiRequest = null;
const eventSummaryCache = new Map();
let playerRatingsCache = loadPersistedPlayerRatingsCache();
let playerRatingsRequest = null;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

function statMap(stats = []) {
  return Object.fromEntries(
    stats.map((stat) => [
      stat.name,
      {
        value: stat.value ?? 0,
        displayValue: stat.displayValue ?? String(stat.value ?? "")
      }
    ])
  );
}

function loadPersistedPlayerRatingsCache() {
  try {
    const persisted = JSON.parse(readFileSync(PLAYER_RATINGS_CACHE_FILE, "utf8"));
    return {
      version: persisted.version === PLAYER_RATING_FORMULA_VERSION ? persisted.version : PLAYER_RATING_FORMULA_VERSION,
      matches: persisted.version === PLAYER_RATING_FORMULA_VERSION && persisted.matches ? persisted.matches : {},
      calculatedAt: persisted.calculatedAt ?? "",
      errors: persisted.errors ?? {}
    };
  } catch {
    return {
      version: PLAYER_RATING_FORMULA_VERSION,
      matches: {},
      calculatedAt: "",
      errors: {}
    };
  }
}

function persistPlayerRatingsCache(cache) {
  try {
    mkdirSync(dirname(PLAYER_RATINGS_CACHE_FILE), { recursive: true });
    writeFileSync(
      PLAYER_RATINGS_CACHE_FILE,
      JSON.stringify(
        {
          ...cache,
          persistedAt: new Date().toISOString()
        },
        null,
        2
      )
    );
  } catch (error) {
    console.warn(`Failed to persist player ratings cache: ${error.message}`);
  }
}

function pickCompetitor(competition, side) {
  const competitor = competition.competitors?.find((item) => item.homeAway === side);
  return {
    name: competitor?.team?.displayName ?? "TBD",
    shortName: competitor?.team?.shortDisplayName ?? competitor?.team?.displayName ?? "TBD",
    abbreviation: competitor?.team?.abbreviation ?? "",
    logo: competitor?.team?.logo ?? competitor?.team?.logos?.[0]?.href ?? "",
    score: competition.status?.type?.state === "pre" ? null : Number(competitor?.score ?? 0),
    winner: Boolean(competitor?.winner)
  };
}

// Static FIFA/Coca-Cola Men's World Ranking for the 48 teams in this schedule.
// Source: FIFA official men's ranking page, last official update 2026-06-11.
const FIFA_RANKINGS = {
  Argentina: 1,
  Spain: 2,
  France: 3,
  England: 4,
  Portugal: 5,
  Brazil: 6,
  Morocco: 7,
  Netherlands: 8,
  Belgium: 9,
  Germany: 10,
  Croatia: 11,
  Mexico: 13,
  Colombia: 14,
  Senegal: 15,
  Uruguay: 16,
  USA: 17,
  Japan: 18,
  Switzerland: 19,
  Iran: 20,
  "South Korea": 22,
  Türkiye: 23,
  Ecuador: 24,
  Austria: 25,
  Australia: 27,
  Algeria: 28,
  Egypt: 29,
  Canada: 30,
  Norway: 31,
  "Ivory Coast": 33,
  Panama: 34,
  Sweden: 38,
  Paraguay: 40,
  Scotland: 41,
  Czechia: 43,
  Tunisia: 45,
  "Congo DR": 46,
  Uzbekistan: 50,
  Qatar: 56,
  Iraq: 57,
  "Saudi Arabia": 60,
  "South Africa": 61,
  Jordan: 63,
  "Bosnia-Herz": 64,
  "Cape Verde": 67,
  Ghana: 73,
  Curaçao: 82,
  Haiti: 83,
  "New Zealand": 85
};

const FIFA_RANKING_ALIASES = {
  "Bosnia and Herzegovina": "Bosnia-Herz",
  "Bosnia-Herzegovina": "Bosnia-Herz",
  "Cabo Verde": "Cape Verde",
  "Côte d'Ivoire": "Ivory Coast",
  "IR Iran": "Iran",
  "Korea Republic": "South Korea",
  "United States": "USA"
};

function fifaRankingName(value) {
  return FIFA_RANKING_ALIASES[value] ?? value;
}

function fifaRankForTeam(team) {
  const candidates = [team?.name, team?.shortName, team?.abbreviation].filter(Boolean);
  for (const candidate of candidates) {
    const rank = FIFA_RANKINGS[fifaRankingName(candidate)];
    if (rank) return rank;
  }
  return Number.MAX_SAFE_INTEGER;
}

function compareProjectedStandings(a, b) {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
  if (a.fifaRank !== b.fifaRank) return a.fifaRank - b.fifaRank;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return a.team.name.localeCompare(b.team.name);
}

function formatOddsValue(value) {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "number") {
    if (Number.isInteger(value) && Math.abs(value) >= 100) return value > 0 ? `+${value}` : String(value);
    return String(value);
  }
  return String(value);
}

function normalizeOdds(competition) {
  return (competition.odds ?? [])
    .filter(Boolean)
    .map((odds) => ({
      provider: odds.provider?.name ?? odds.provider?.displayName ?? odds.provider ?? "",
      details: odds.details ?? odds.summary ?? "",
      overUnder: odds.overUnder ?? null,
      spread: odds.spread ?? null,
      opening: {
        home: "",
        draw: "",
        away: ""
      },
      current: {
        home: formatOddsValue(
          odds.homeTeamOdds?.displayOdds ??
            odds.homeTeamOdds?.moneyLine ??
            odds.homeTeamOdds?.current?.displayOdds ??
            odds.homeMoneyline ??
            odds.home
        ),
        draw: formatOddsValue(
          odds.drawOdds?.displayOdds ??
            odds.drawOdds?.moneyLine ??
            odds.drawOdds?.current?.displayOdds ??
            odds.drawMoneyline ??
            odds.draw
        ),
        away: formatOddsValue(
          odds.awayTeamOdds?.displayOdds ??
            odds.awayTeamOdds?.moneyLine ??
            odds.awayTeamOdds?.current?.displayOdds ??
            odds.awayMoneyline ??
            odds.away
        )
      }
    }));
}

function normalizeTeamKey(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

function matchOddsKey(homeTeam, awayTeam, date) {
  const day = new Date(date).toISOString().slice(0, 10);
  return [normalizeTeamKey(homeTeam), normalizeTeamKey(awayTeam), day].join("|");
}

function normalizeTheOddsApiBookmakerOdds(oddsEvent) {
  return (oddsEvent.bookmakers ?? [])
    .map((bookmaker) => {
      const h2h = (bookmaker.markets ?? []).find((market) => market.key === "h2h");
      const outcomes = h2h?.outcomes ?? [];
      const findOutcome = (name) =>
        outcomes.find((outcome) => normalizeTeamKey(outcome.name) === normalizeTeamKey(name));
      const draw = outcomes.find((outcome) => /^draw$/i.test(outcome.name));

      return {
        provider: bookmaker.title ?? bookmaker.key ?? "",
        bookmakerKey: bookmaker.key ?? "",
        lastUpdate: h2h?.last_update ?? bookmaker.last_update ?? "",
        details: "h2h",
        overUnder: null,
        spread: null,
        current: {
          home: formatOddsValue(findOutcome(oddsEvent.home_team)?.price),
          draw: formatOddsValue(draw?.price),
          away: formatOddsValue(findOutcome(oddsEvent.away_team)?.price)
        }
      };
    })
    .filter((bookmaker) =>
      [bookmaker.current.home, bookmaker.current.draw, bookmaker.current.away].some(Boolean)
    );
}

function buildOddsIndex(oddsEvents = []) {
  const index = new Map();
  for (const event of oddsEvents) {
    const bookmakerOdds = normalizeTheOddsApiBookmakerOdds(event);
    if (bookmakerOdds.length) {
      index.set(matchOddsKey(event.home_team, event.away_team, event.commence_time), bookmakerOdds);
    }
  }
  return index;
}

function mergePreferredOdds(match, oddsIndex, oddsCacheStatus) {
  const preferredOdds = oddsIndex.get(matchOddsKey(match.home.name, match.away.name, match.date));
  if (preferredOdds?.length) {
    return { ...match, odds: preferredOdds, oddsSource: "The Odds API" };
  }

  return {
    ...match,
    odds: [],
    oddsSource: oddsCacheStatus
  };
}

function normalizeEvent(event) {
  const competition = event.competitions?.[0] ?? {};
  const status = competition.status?.type ?? {};

  return {
    id: event.id,
    date: event.date,
    name: event.name,
    shortName: event.shortName,
    stage: event.season?.slug ?? "scheduled",
    status: {
      state: status.state ?? "pre",
      detail: status.detail ?? status.shortDetail ?? "",
      shortDetail: status.shortDetail ?? "",
      completed: Boolean(status.completed)
    },
    venue: {
      name: competition.venue?.fullName ?? "待定",
      city: competition.venue?.address?.city ?? "",
      country: competition.venue?.address?.country ?? ""
    },
    home: pickCompetitor(competition, "home"),
    away: pickCompetitor(competition, "away"),
    odds: normalizeOdds(competition)
  };
}

function normalizeStandings(rawStandings) {
  const groups = (rawStandings.children ?? []).map((group) => {
    const entries = (group.standings?.entries ?? []).map((entry) => {
      const stats = statMap(entry.stats);
      const team = {
        name: entry.team?.displayName ?? "",
        shortName: entry.team?.shortDisplayName ?? entry.team?.displayName ?? "",
        abbreviation: entry.team?.abbreviation ?? "",
        logo: entry.team?.logos?.[0]?.href ?? ""
      };
      return {
        rank: 0,
        team: {
          ...team
        },
        note: entry.note?.description ?? "",
        played: stats.gamesPlayed?.value ?? 0,
        wins: stats.wins?.value ?? 0,
        draws: stats.ties?.value ?? 0,
        losses: stats.losses?.value ?? 0,
        goalsFor: stats.pointsFor?.value ?? 0,
        goalsAgainst: stats.pointsAgainst?.value ?? 0,
        goalDifference: stats.pointDifferential?.value ?? 0,
        goalDifferenceDisplay: stats.pointDifferential?.displayValue ?? "0",
        points: stats.points?.value ?? 0,
        fifaRank: fifaRankForTeam(team)
      };
    })
      .sort(compareProjectedStandings)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    return {
      id: group.id,
      name: group.name,
      entries
    };
  });

  const thirdPlace = groups
    .map((group) => ({ group: group.name, ...group.entries[2] }))
    .filter((entry) => entry.team?.name)
    .sort((a, b) => {
      return compareProjectedStandings(a, b);
    })
    .map((entry, index) => ({ ...entry, thirdRank: index + 1, currentlyAdvancing: index < 8 }));

  return { groups, thirdPlace };
}

function numericStat(stats = [], name) {
  const stat = stats.find((item) => item.name === name);
  return Number(stat?.value ?? 0);
}

function teamFromSummary(summaryTeam = {}) {
  return {
    id: summaryTeam.id ?? "",
    name: summaryTeam.displayName ?? "",
    shortName: summaryTeam.shortDisplayName ?? summaryTeam.displayName ?? "",
    abbreviation: summaryTeam.abbreviation ?? "",
    logo: summaryTeam.logo ?? summaryTeam.logos?.[0]?.href ?? ""
  };
}

function goalEventsFromSummary(summary) {
  return (summary.keyEvents ?? []).filter((event) => {
    const type = event.type?.type ?? "";
    return Boolean(event.scoringPlay) || type.includes("goal");
  });
}

function matchDurationSeconds(summary, match) {
  const eventMax = Math.max(0, ...((summary.keyEvents ?? []).map((event) => Number(event.clock?.value ?? 0))));
  if (match.status?.completed) return Math.max(90 * 60, eventMax);
  return Math.max(eventMax, 0);
}

function playerSubstitutionTimes(summary) {
  const substitutions = new Map();
  for (const event of summary.keyEvents ?? []) {
    if (event.type?.type !== "substitution") continue;
    const seconds = Number(event.clock?.value ?? 0);
    const subIn = event.participants?.[0]?.athlete?.id;
    const subOut = event.participants?.[1]?.athlete?.id;
    if (subIn) substitutions.set(subIn, { ...(substitutions.get(subIn) ?? {}), in: seconds });
    if (subOut) substitutions.set(subOut, { ...(substitutions.get(subOut) ?? {}), out: seconds });
  }
  return substitutions;
}

function estimatedMinutesPlayed(player, substitutions, durationSeconds) {
  const id = player.athlete?.id;
  const times = substitutions.get(id) ?? {};
  const appeared = numericStat(player.stats, "appearances") > 0 || player.starter || player.subbedIn;
  if (!appeared) return null;

  const start = player.starter ? 0 : times.in;
  if (start === undefined) return null;

  const end = player.subbedOut ? times.out : durationSeconds;
  if (end === undefined || end < start) return null;

  return Math.max(1, Math.ceil((end - start) / 60));
}

function rounded(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function positionGroup(position = "", positionName = "") {
  const value = String(position).toUpperCase();
  const name = String(positionName).toUpperCase();
  const defenderAbbreviations = new Set(["D", "DF", "CD", "CB", "LB", "RB", "LWB", "RWB", "SW"]);

  if (value === "G" || value === "GK" || name.includes("GOALKEEPER")) return "goalkeeper";
  if (name.includes("DEFENDER") || name.includes("BACK")) return "defender";
  if (defenderAbbreviations.has(value) || /^C?D[-/]/.test(value) || /^[LR]B[-/]/.test(value)) {
    return "defender";
  }
  if (value.includes("M") || name.includes("MIDFIELDER") || name.includes("MIDFIELD")) return "midfielder";
  if (value.includes("F") || value.includes("W") || name.includes("FORWARD") || name.includes("STRIKER")) {
    return "forward";
  }
  return "unknown";
}

function isRatingEligiblePosition(position, positionName) {
  return PLAYER_RATING_FORMULA.eligibility.positions.includes(positionGroup(position, positionName));
}

function goalValueForPosition(position, positionName) {
  const group = positionGroup(position, positionName);
  return 1;
}

function ratingComponent(label, value, weight) {
  if (!value || !weight) return null;
  return {
    label,
    value,
    weight,
    points: rounded(value * weight, 2)
  };
}

function playerMatchRating(player, substitutions, durationSeconds, penaltyGoals = 0) {
  const stats = statMap(player.stats);
  const position = player.position?.abbreviation ?? "";
  const positionName = player.position?.displayName ?? player.position?.name ?? "";
  const goals = Number(stats.totalGoals?.value ?? 0);
  const penaltyGoalCount = Math.min(goals, Math.max(0, penaltyGoals));
  const openPlayGoals = Math.max(0, goals - penaltyGoalCount);
  const assists = Number(stats.goalAssists?.value ?? 0);
  const shotsOnTarget = Number(stats.shotsOnTarget?.value ?? 0);
  const totalShots = Number(stats.totalShots?.value ?? 0);
  const foulsSuffered = Number(stats.foulsSuffered?.value ?? 0);
  const foulsCommitted = Number(stats.foulsCommitted?.value ?? 0);
  const yellowCards = Number(stats.yellowCards?.value ?? 0);
  const redCards = Number(stats.redCards?.value ?? 0);
  const ownGoals = Number(stats.ownGoals?.value ?? 0);
  const saves = Number(stats.saves?.value ?? 0);
  const goalsConceded = Number(stats.goalsConceded?.value ?? 0);
  const otherShots = Math.max(0, totalShots - shotsOnTarget);
  const minutes = estimatedMinutesPlayed(player, substitutions, durationSeconds);

  const components = [
    ratingComponent("goals", openPlayGoals, goalValueForPosition(position, positionName)),
    ratingComponent("penaltyGoals", penaltyGoalCount, 0.6),
    ratingComponent("assists", assists, 0.7),
    ratingComponent("shotsOnTarget", shotsOnTarget, 0.15),
    ratingComponent("otherShots", otherShots, -0.05),
    ratingComponent("foulsSuffered", foulsSuffered, 0.05),
    ratingComponent("saves", saves, 0.2),
    ratingComponent("goalsConceded", goalsConceded, positionGroup(position, positionName) === "goalkeeper" ? -0.25 : 0),
    ratingComponent("foulsCommitted", foulsCommitted, -0.06),
    ratingComponent("yellowCards", yellowCards, -0.35),
    ratingComponent("redCards", redCards, -1.2),
    ratingComponent("ownGoals", ownGoals, -1)
  ].filter(Boolean);
  const rawRating = PLAYER_RATING_FORMULA.base + components.reduce((sum, item) => sum + item.points, 0);
  const rating = rounded(clamp(rawRating, 3, 10), 1);

  return {
    rating,
    rawRating: rounded(rawRating, 2),
    eligible: minutes !== null && minutes >= PLAYER_RATING_FORMULA.eligibility.matchMinutes,
    minutes,
    minutesEstimated: minutes !== null,
    stats: {
      goals,
      openPlayGoals,
      penaltyGoals: penaltyGoalCount,
      assists,
      shotsOnTarget,
      totalShots,
      foulsSuffered,
      foulsCommitted,
      yellowCards,
      redCards,
      ownGoals,
      saves,
      goalsConceded
    },
    components
  };
}

function playerKey(player, team) {
  return player.athlete?.id || `${team.id || team.name}:${player.athlete?.displayName}`;
}

function mergePlayerStat(leaderboards, entry) {
  const existing = leaderboards.get(entry.id) ?? {
    ...entry,
    goals: 0,
    assists: 0,
    penaltyGoals: 0,
    ownGoals: 0,
    appearances: 0,
    minutes: 0,
    minutesEstimated: false,
    matches: []
  };

  existing.goals += entry.goals;
  existing.assists += entry.assists;
  existing.penaltyGoals += entry.penaltyGoals;
  existing.ownGoals += entry.ownGoals;
  existing.appearances += entry.appearances;
  existing.minutes += entry.minutes ?? 0;
  existing.minutesEstimated = existing.minutesEstimated || entry.minutesEstimated;
  existing.matches.push(...entry.matches);
  leaderboards.set(entry.id, existing);
}

function normalizePlayerLeaderboardsFromSummaries(summaries) {
  const players = new Map();

  for (const { match, summary } of summaries) {
    const substitutions = playerSubstitutionTimes(summary);
    const durationSeconds = matchDurationSeconds(summary, match);
    const penaltyGoals = new Map();

    for (const event of goalEventsFromSummary(summary)) {
      const scorerId = event.participants?.[0]?.athlete?.id;
      if (!scorerId) continue;
      if (/\bpenalty\b/i.test(`${event.text ?? ""} ${event.shortText ?? ""} ${event.type?.text ?? ""}`)) {
        penaltyGoals.set(scorerId, (penaltyGoals.get(scorerId) ?? 0) + 1);
      }
    }

    for (const rosterTeam of summary.rosters ?? []) {
      const team = teamFromSummary(rosterTeam.team);
      for (const player of rosterTeam.roster ?? []) {
        const goals = numericStat(player.stats, "totalGoals");
        const assists = numericStat(player.stats, "goalAssists");
        const ownGoals = numericStat(player.stats, "ownGoals");
        const appearances = numericStat(player.stats, "appearances");
        if (!goals && !assists) continue;

        const minutes = estimatedMinutesPlayed(player, substitutions, durationSeconds);
        mergePlayerStat(players, {
          id: playerKey(player, team),
          name: player.athlete?.displayName ?? player.athlete?.fullName ?? "Unknown",
          shortName: player.athlete?.shortName ?? player.athlete?.displayName ?? "",
          jersey: player.jersey ?? player.athlete?.jersey ?? "",
          position: player.position?.abbreviation ?? "",
          team,
          goals,
          assists,
          penaltyGoals: penaltyGoals.get(player.athlete?.id) ?? 0,
          ownGoals,
          appearances,
          minutes,
          minutesEstimated: minutes !== null,
          matches: [
            {
              id: match.id,
              date: match.date,
              name: match.name,
              goals,
              assists
            }
          ]
        });
      }
    }
  }

  const entries = [...players.values()];
  const minutesForSort = (entry) => (entry.minutes > 0 ? entry.minutes : Number.MAX_SAFE_INTEGER);
  const byScorers = [...entries]
    .filter((entry) => entry.goals > 0)
    .sort((a, b) => {
      if (b.goals !== a.goals) return b.goals - a.goals;
      if (b.assists !== a.assists) return b.assists - a.assists;
      if (minutesForSort(a) !== minutesForSort(b)) return minutesForSort(a) - minutesForSort(b);
      if (a.penaltyGoals !== b.penaltyGoals) return a.penaltyGoals - b.penaltyGoals;
      return a.name.localeCompare(b.name);
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const byAssists = [...entries]
    .filter((entry) => entry.assists > 0)
    .sort((a, b) => {
      if (b.assists !== a.assists) return b.assists - a.assists;
      if (b.goals !== a.goals) return b.goals - a.goals;
      if (minutesForSort(a) !== minutesForSort(b)) return minutesForSort(a) - minutesForSort(b);
      return a.name.localeCompare(b.name);
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  return {
    scorers: byScorers,
    assists: byAssists,
    source: "ESPN event summary roster stats and key events",
    matchesCounted: summaries.length
  };
}

function completedMatchMeta(match) {
  return {
    id: match.id,
    date: match.date,
    name: match.name,
    shortName: match.shortName,
    home: match.home,
    away: match.away,
    score: {
      home: match.home.score,
      away: match.away.score
    }
  };
}

function normalizePlayerRatingsFromSummary(match, summary) {
  const substitutions = playerSubstitutionTimes(summary);
  const durationSeconds = matchDurationSeconds(summary, match);
  const penaltyGoals = new Map();
  const ratings = [];

  for (const event of goalEventsFromSummary(summary)) {
    const scorerId = event.participants?.[0]?.athlete?.id;
    if (!scorerId) continue;
    if (/\bpenalty\b/i.test(`${event.text ?? ""} ${event.shortText ?? ""} ${event.type?.text ?? ""}`)) {
      penaltyGoals.set(scorerId, (penaltyGoals.get(scorerId) ?? 0) + 1);
    }
  }

  for (const rosterTeam of summary.rosters ?? []) {
    const team = teamFromSummary(rosterTeam.team);
    for (const player of rosterTeam.roster ?? []) {
      const appearances = numericStat(player.stats, "appearances");
      const appeared = appearances > 0 || player.starter || player.subbedIn;
      if (!appeared) continue;

      const matchRating = playerMatchRating(
        player,
        substitutions,
        durationSeconds,
        penaltyGoals.get(player.athlete?.id) ?? 0
      );
      ratings.push({
        id: playerKey(player, team),
        name: player.athlete?.displayName ?? player.athlete?.fullName ?? "Unknown",
        shortName: player.athlete?.shortName ?? player.athlete?.displayName ?? "",
        jersey: player.jersey ?? player.athlete?.jersey ?? "",
        position: player.position?.abbreviation ?? "",
        positionName: player.position?.displayName ?? player.position?.name ?? "",
        team,
        starter: Boolean(player.starter),
        subbedIn: Boolean(player.subbedIn),
        subbedOut: Boolean(player.subbedOut),
        ...matchRating
      });
    }
  }

  return {
    version: PLAYER_RATING_FORMULA_VERSION,
    match: completedMatchMeta(match),
    ratings,
    calculatedAt: new Date().toISOString()
  };
}

function cacheHasPlayerRatings(match) {
  const cached = playerRatingsCache.matches?.[match.id];
  return cached?.version === PLAYER_RATING_FORMULA_VERSION && Array.isArray(cached.ratings);
}

async function refreshMissingPlayerRatings(matches) {
  const completedMatches = matches.filter((match) => match.status.completed);
  const missingMatches = completedMatches.filter((match) => !cacheHasPlayerRatings(match));
  if (!missingMatches.length) return playerRatingsCache;

  const nextCache = {
    version: PLAYER_RATING_FORMULA_VERSION,
    matches: { ...(playerRatingsCache.matches ?? {}) },
    errors: { ...(playerRatingsCache.errors ?? {}) },
    calculatedAt: new Date().toISOString()
  };

  const calculated = await mapWithConcurrency(missingMatches, 4, async (match) => {
    try {
      const summary = await fetchEventSummary(match);
      return { match, ratingSet: normalizePlayerRatingsFromSummary(match, summary), error: "" };
    } catch (error) {
      return {
        match,
        ratingSet: null,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  });

  for (const result of calculated) {
    if (result.ratingSet) {
      nextCache.matches[result.match.id] = result.ratingSet;
      delete nextCache.errors[result.match.id];
    } else {
      nextCache.errors[result.match.id] = {
        match: completedMatchMeta(result.match),
        error: result.error,
        failedAt: new Date().toISOString()
      };
      console.warn(`Failed to calculate player ratings ${result.match.id}: ${result.error}`);
    }
  }

  playerRatingsCache = nextCache;
  persistPlayerRatingsCache(playerRatingsCache);
  return playerRatingsCache;
}

async function getPlayerRatingsCache(matches) {
  if (!playerRatingsRequest) {
    playerRatingsRequest = refreshMissingPlayerRatings(matches).finally(() => {
      playerRatingsRequest = null;
    });
  }
  return playerRatingsRequest;
}

function mergePlayerRating(aggregates, entry, match) {
  const existing = aggregates.get(entry.id) ?? {
    id: entry.id,
    name: entry.name,
    shortName: entry.shortName,
    jersey: entry.jersey,
    position: entry.position,
    positionName: entry.positionName,
    team: entry.team,
    validAppearances: 0,
    totalAppearances: 0,
    minutes: 0,
    weightedRatingTotal: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    highMatchRating: null,
    lowMatchRating: null,
    latestMatchRating: null,
    matches: []
  };

  existing.totalAppearances += 1;
  existing.latestMatchRating = {
    matchId: match.id,
    matchName: match.name,
    date: match.date,
    rating: entry.rating
  };

  if (entry.eligible) {
    const minutes = entry.minutes ?? 0;
    existing.validAppearances += 1;
    existing.minutes += minutes;
    existing.weightedRatingTotal += entry.rating * minutes;
    existing.goals += entry.stats?.goals ?? 0;
    existing.assists += entry.stats?.assists ?? 0;
    existing.yellowCards += entry.stats?.yellowCards ?? 0;
    existing.redCards += entry.stats?.redCards ?? 0;
    existing.highMatchRating =
      !existing.highMatchRating || entry.rating > existing.highMatchRating.rating
        ? { matchId: match.id, matchName: match.name, date: match.date, rating: entry.rating }
        : existing.highMatchRating;
    existing.lowMatchRating =
      !existing.lowMatchRating || entry.rating < existing.lowMatchRating.rating
        ? { matchId: match.id, matchName: match.name, date: match.date, rating: entry.rating }
        : existing.lowMatchRating;
    existing.matches.push({
      matchId: match.id,
      matchName: match.name,
      date: match.date,
      rating: entry.rating,
      minutes,
      starter: entry.starter,
      stats: entry.stats,
      components: entry.components
    });
  }

  aggregates.set(entry.id, existing);
}

function buildPlayerRatingRankings(cache) {
  const aggregates = new Map();
  const matchSets = Object.values(cache.matches ?? {}).filter(
    (set) => set?.version === PLAYER_RATING_FORMULA_VERSION && Array.isArray(set.ratings)
  );

  for (const set of matchSets) {
    for (const entry of set.ratings) {
      if (!isRatingEligiblePosition(entry.position, entry.positionName)) continue;
      mergePlayerRating(aggregates, entry, set.match);
    }
  }

  const eligiblePlayers = [...aggregates.values()]
    .filter(
      (entry) =>
        entry.validAppearances > 0 &&
        entry.minutes >= PLAYER_RATING_FORMULA.eligibility.rankingMinutes &&
        entry.weightedRatingTotal > 0
    )
    .map((entry) => ({
      ...entry,
      averageRating: rounded(entry.weightedRatingTotal / entry.minutes, 2),
      matches: entry.matches.sort((a, b) => new Date(b.date) - new Date(a.date))
    }));

  const high = [...eligiblePlayers]
    .sort((a, b) => {
      if (b.averageRating !== a.averageRating) return b.averageRating - a.averageRating;
      if (b.minutes !== a.minutes) return b.minutes - a.minutes;
      if (b.validAppearances !== a.validAppearances) return b.validAppearances - a.validAppearances;
      if (b.goals !== a.goals) return b.goals - a.goals;
      if (b.assists !== a.assists) return b.assists - a.assists;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 50)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const low = [...eligiblePlayers]
    .sort((a, b) => {
      if (a.averageRating !== b.averageRating) return a.averageRating - b.averageRating;
      if (b.minutes !== a.minutes) return b.minutes - a.minutes;
      if (b.validAppearances !== a.validAppearances) return b.validAppearances - a.validAppearances;
      if (b.redCards !== a.redCards) return b.redCards - a.redCards;
      if (b.yellowCards !== a.yellowCards) return b.yellowCards - a.yellowCards;
      if (a.goals !== b.goals) return a.goals - b.goals;
      if (a.assists !== b.assists) return a.assists - b.assists;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 50)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  return {
    high,
    low,
    formula: PLAYER_RATING_FORMULA,
    matchesCounted: matchSets.length,
    playersCounted: eligiblePlayers.length,
    calculatedAt: cache.calculatedAt,
    errors: Object.values(cache.errors ?? {})
  };
}

async function getPlayerRatingRankings(matches) {
  const cache = await getPlayerRatingsCache(matches);
  return buildPlayerRatingRankings(cache);
}

async function fetchEventSummary(match) {
  const cached = eventSummaryCache.get(match.id);
  const ttl = match.status?.completed ? 24 * 60 * 60 * 1000 : 60 * 1000;
  if (cached && cached.expiresAt > Date.now()) return cached.data;

  const url = new URL(EVENT_SUMMARY_URL);
  url.searchParams.set("event", match.id);
  const data = await fetchJson(url);
  eventSummaryCache.set(match.id, {
    expiresAt: Date.now() + ttl,
    data
  });
  return data;
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function getPlayerLeaderboards(matches) {
  const startedMatches = matches.filter((match) => match.status.state !== "pre" || match.status.completed);
  if (!startedMatches.length) {
    return {
      scorers: [],
      assists: [],
      source: "ESPN event summary roster stats and key events",
      matchesCounted: 0
    };
  }

  const summaries = (
    await mapWithConcurrency(startedMatches, 6, async (match) => {
      try {
        return { match, summary: await fetchEventSummary(match) };
      } catch (error) {
        console.warn(`Failed to fetch event summary ${match.id}: ${error.message}`);
        return null;
      }
    })
  ).filter(Boolean);

  return normalizePlayerLeaderboardsFromSummaries(summaries);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "user-agent": "world-cup-schedule-local-site/1.0"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Upstream request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function zonedParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ODDS_REFRESH_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).formatToParts(date);

  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function refreshWindowState(date = new Date()) {
  const parts = zonedParts(date);
  const hour = Number(parts.hour);
  return {
    hour,
    isOpen: hour >= ODDS_REFRESH_START_HOUR && hour < ODDS_REFRESH_END_HOUR
  };
}

async function fetchTheOddsApiJson(url) {
  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "user-agent": "world-cup-schedule-local-site/1.0"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`The Odds API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function refreshTheOddsApiOdds() {
  const url = new URL(THE_ODDS_API_URL);
  url.searchParams.set("apiKey", THE_ODDS_API_KEY);
  url.searchParams.set("regions", "uk");
  url.searchParams.set("markets", "h2h");
  url.searchParams.set("oddsFormat", "decimal");
  url.searchParams.set("dateFormat", "iso");
  url.searchParams.set("bookmakers", THE_ODDS_API_BOOKMAKERS);
  url.searchParams.set("commenceTimeFrom", "2026-06-11T00:00:00Z");
  url.searchParams.set("commenceTimeTo", "2026-07-20T00:00:00Z");

  try {
    const payload = await fetchTheOddsApiJson(url);
    oddsApiCache = {
      expiresAt: Date.now() + ODDS_REFRESH_INTERVAL_MS,
      fetchedAt: new Date().toISOString(),
      data: Array.isArray(payload) ? payload : [],
      status: "ready",
      error: ""
    };
    persistOddsCache(oddsApiCache);
  } catch (error) {
    console.warn(`The Odds API request failed: ${error.message}`);
    oddsApiCache = {
      expiresAt: Date.now() + ODDS_REFRESH_INTERVAL_MS,
      fetchedAt: new Date().toISOString(),
      data: oddsApiCache.data ?? [],
      status: oddsApiCache.data?.length ? "stale_error" : "error",
      error: error.message
    };
    persistOddsCache(oddsApiCache);
  } finally {
    oddsApiRequest = null;
  }

  return oddsApiCache;
}

async function getOddsApiCached() {
  if (!THE_ODDS_API_KEY) {
    return {
      expiresAt: 0,
      fetchedAt: "",
      data: [],
      status: "not_configured",
      error: ""
    };
  }

  const windowState = refreshWindowState();
  if (!windowState.isOpen) {
    return {
      ...oddsApiCache,
      status: oddsApiCache.data.length ? "outside_window" : "outside_window_empty"
    };
  }

  if (oddsApiCache.expiresAt > Date.now()) {
    return oddsApiCache;
  }

  if (!oddsApiRequest) {
    oddsApiRequest = refreshTheOddsApiOdds();
  }

  return oddsApiRequest;
}

async function getWorldCupData() {
  const [scoreboard, standings, oddsCache] = await Promise.all([
    fetchJson(SCOREBOARD_URL),
    fetchJson(STANDINGS_URL),
    getOddsApiCached()
  ]);

  const oddsIndex = buildOddsIndex(oddsCache.data);
  const matches = (scoreboard.events ?? [])
    .map(normalizeEvent)
    .map((match) => mergePreferredOdds(match, oddsIndex, oddsCache.status))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const [playerLeaderboards, playerRatings] = await Promise.all([
    getPlayerLeaderboards(matches),
    getPlayerRatingRankings(matches)
  ]);

  return {
    source: "ESPN public soccer APIs",
    oddsSource: THE_ODDS_API_KEY
      ? `The Odds API cached odds (${THE_ODDS_API_BOOKMAKERS})`
      : "Set THE_ODDS_API_KEY to enable The Odds API odds",
    oddsCache: {
      status: oddsCache.status,
      fetchedAt: oddsCache.fetchedAt,
      expiresAt: oddsCache.expiresAt ? new Date(oddsCache.expiresAt).toISOString() : "",
      ttlMinutes: Math.round(ODDS_REFRESH_INTERVAL_MS / 60000),
      error: oddsCache.error,
      timezone: ODDS_REFRESH_TIMEZONE,
      refreshWindow: `${ODDS_REFRESH_START_HOUR}:00-${ODDS_REFRESH_END_HOUR}:00`
    },
    fetchedAt: new Date().toISOString(),
    matches,
    standings: normalizeStandings(standings),
    playerLeaderboards,
    playerRatings
  };
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const safePath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicDir, safePath);

  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": contentTypes[extname(filePath)] ?? "application/octet-stream",
        "cache-control": "no-store"
      });
    response.end(body);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = createServer(async (request, response) => {
  if (request.url?.startsWith("/api/worldcup")) {
    try {
      const data = await getWorldCupData();
      response.writeHead(200, {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      });
      response.end(JSON.stringify(data));
    } catch (error) {
      response.writeHead(502, {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store"
      });
      response.end(
        JSON.stringify({
          error: "无法获取最新世界杯数据",
          detail: error instanceof Error ? error.message : String(error)
        })
      );
    }
    return;
  }

  await serveStatic(request, response);
});

server.listen(port, host, () => {
  console.log(`World Cup schedule site running at http://${host}:${port}`);
});
