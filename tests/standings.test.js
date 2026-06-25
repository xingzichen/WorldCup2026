import assert from "node:assert/strict";
import test from "node:test";

import { normalizeStandings, rankGroupEntries } from "../server.js";

function entry(name, { points, goalDifference, goalsFor }) {
  return {
    rank: 0,
    team: {
      name,
      shortName: name,
      abbreviation: name.slice(0, 3).toUpperCase(),
      logo: ""
    },
    note: "",
    played: 3,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor,
    goalsAgainst: goalsFor - goalDifference,
    goalDifference,
    goalDifferenceDisplay: goalDifference > 0 ? `+${goalDifference}` : String(goalDifference),
    points,
    teamConductScore: 0,
    fifaRank: 999
  };
}

function match(home, away, homeScore, awayScore) {
  return {
    stage: "group-stage",
    status: { state: "post" },
    home: { name: home, shortName: home, abbreviation: home.slice(0, 3).toUpperCase(), score: homeScore },
    away: { name: away, shortName: away, abbreviation: away.slice(0, 3).toUpperCase(), score: awayScore }
  };
}

function standingsEntry(name, { points, goalDifference, goalsFor }) {
  return {
    team: {
      displayName: name,
      shortDisplayName: name,
      abbreviation: name.slice(0, 3).toUpperCase(),
      logos: []
    },
    stats: [
      { name: "gamesPlayed", value: 3 },
      { name: "wins", value: 0 },
      { name: "ties", value: 0 },
      { name: "losses", value: 0 },
      { name: "pointsFor", value: goalsFor },
      { name: "pointsAgainst", value: goalsFor - goalDifference },
      {
        name: "pointDifferential",
        value: goalDifference,
        displayValue: goalDifference > 0 ? `+${goalDifference}` : String(goalDifference)
      },
      { name: "points", value: points }
    ]
  };
}

test("head-to-head result ranks ahead of overall goal difference inside a group", () => {
  const ranked = rankGroupEntries(
    [
      entry("Alpha", { points: 6, goalDifference: 0, goalsFor: 3 }),
      entry("Bravo", { points: 6, goalDifference: 5, goalsFor: 8 }),
      entry("Charlie", { points: 3, goalDifference: -1, goalsFor: 2 }),
      entry("Delta", { points: 0, goalDifference: -4, goalsFor: 1 })
    ],
    [match("Alpha", "Bravo", 1, 0)]
  );

  assert.deepEqual(
    ranked.map((item) => item.team.name),
    ["Alpha", "Bravo", "Charlie", "Delta"]
  );
});

test("remaining tied teams restart head-to-head before falling back to overall criteria", () => {
  const ranked = rankGroupEntries(
    [
      entry("Alpha", { points: 6, goalDifference: 0, goalsFor: 2 }),
      entry("Bravo", { points: 6, goalDifference: 0, goalsFor: 3 }),
      entry("Charlie", { points: 6, goalDifference: 5, goalsFor: 6 }),
      entry("Delta", { points: 0, goalDifference: -5, goalsFor: 0 })
    ],
    [
      match("Alpha", "Bravo", 1, 0),
      match("Alpha", "Charlie", 1, 0),
      match("Bravo", "Charlie", 2, 2)
    ]
  );

  assert.deepEqual(
    ranked.map((item) => item.team.name),
    ["Alpha", "Charlie", "Bravo", "Delta"]
  );
});

test("third-place ranking uses goals scored before FIFA ranking", () => {
  const rawStandings = {
    children: [
      {
        id: "a",
        name: "Group A",
        standings: {
          entries: [
            standingsEntry("Spain", { points: 9, goalDifference: 6, goalsFor: 7 }),
            standingsEntry("Brazil", { points: 6, goalDifference: 3, goalsFor: 5 }),
            standingsEntry("Ghana", { points: 4, goalDifference: 0, goalsFor: 5 }),
            standingsEntry("Haiti", { points: 0, goalDifference: -9, goalsFor: 0 })
          ]
        }
      },
      {
        id: "b",
        name: "Group B",
        standings: {
          entries: [
            standingsEntry("France", { points: 9, goalDifference: 6, goalsFor: 7 }),
            standingsEntry("England", { points: 6, goalDifference: 3, goalsFor: 5 }),
            standingsEntry("Argentina", { points: 4, goalDifference: 0, goalsFor: 4 }),
            standingsEntry("Qatar", { points: 0, goalDifference: -9, goalsFor: 0 })
          ]
        }
      }
    ]
  };

  const standings = normalizeStandings(rawStandings);

  assert.deepEqual(
    standings.thirdPlace.map((item) => item.team.name),
    ["Ghana", "Argentina"]
  );
});
