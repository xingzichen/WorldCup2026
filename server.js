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
    standings: normalizeStandings(standings)
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
      "cache-control": "no-cache"
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
