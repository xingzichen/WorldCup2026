import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "public");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 5173);

const SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719&limit=200";
const STANDINGS_URL =
  "https://site.web.api.espn.com/apis/v2/sports/soccer/fifa.world/standings";

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
    away: pickCompetitor(competition, "away")
  };
}

function normalizeStandings(rawStandings) {
  const groups = (rawStandings.children ?? []).map((group) => {
    const entries = (group.standings?.entries ?? []).map((entry, index) => {
      const stats = statMap(entry.stats);
      return {
        rank: index + 1,
        team: {
          name: entry.team?.displayName ?? "",
          shortName: entry.team?.shortDisplayName ?? entry.team?.displayName ?? "",
          abbreviation: entry.team?.abbreviation ?? "",
          logo: entry.team?.logos?.[0]?.href ?? ""
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
        points: stats.points?.value ?? 0
      };
    });

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
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.team.name.localeCompare(b.team.name);
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

async function getWorldCupData() {
  const [scoreboard, standings] = await Promise.all([
    fetchJson(SCOREBOARD_URL),
    fetchJson(STANDINGS_URL)
  ]);

  const matches = (scoreboard.events ?? [])
    .map(normalizeEvent)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    source: "ESPN public soccer APIs",
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
