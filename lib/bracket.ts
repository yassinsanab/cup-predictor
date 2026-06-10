import type { Team } from "./teams";
import { THIRD_PLACE_ALLOCATION, WINNER_COLS } from "./thirdPlaceAllocation";

export type Round = "R32" | "R16" | "QF" | "SF" | "3P" | "F";

export type Slot =
  | { kind: "winner"; group: string }
  | { kind: "runner"; group: string }
  | { kind: "third" } // resolved per-match via the allocation table
  | { kind: "matchWinner"; match: number }
  | { kind: "matchLoser"; match: number };

export type MatchDef = { id: number; round: Round; home: Slot; away: Slot };

const w = (group: string): Slot => ({ kind: "winner", group });
const r = (group: string): Slot => ({ kind: "runner", group });
const third: Slot = { kind: "third" };
const mw = (match: number): Slot => ({ kind: "matchWinner", match });
const ml = (match: number): Slot => ({ kind: "matchLoser", match });

// Official 2026 schedule (FIFA regulations / Wikipedia knockout stage).
export const MATCHES: MatchDef[] = [
  // Round of 32
  { id: 73, round: "R32", home: r("A"), away: r("B") },
  { id: 74, round: "R32", home: w("E"), away: third },
  { id: 75, round: "R32", home: w("F"), away: r("C") },
  { id: 76, round: "R32", home: w("C"), away: r("F") },
  { id: 77, round: "R32", home: w("I"), away: third },
  { id: 78, round: "R32", home: r("E"), away: r("I") },
  { id: 79, round: "R32", home: w("A"), away: third },
  { id: 80, round: "R32", home: w("L"), away: third },
  { id: 81, round: "R32", home: w("D"), away: third },
  { id: 82, round: "R32", home: w("G"), away: third },
  { id: 83, round: "R32", home: r("K"), away: r("L") },
  { id: 84, round: "R32", home: w("H"), away: r("J") },
  { id: 85, round: "R32", home: w("B"), away: third },
  { id: 86, round: "R32", home: w("J"), away: r("H") },
  { id: 87, round: "R32", home: w("K"), away: third },
  { id: 88, round: "R32", home: r("D"), away: r("G") },
  // Round of 16
  { id: 89, round: "R16", home: mw(74), away: mw(77) },
  { id: 90, round: "R16", home: mw(73), away: mw(75) },
  { id: 91, round: "R16", home: mw(76), away: mw(78) },
  { id: 92, round: "R16", home: mw(79), away: mw(80) },
  { id: 93, round: "R16", home: mw(83), away: mw(84) },
  { id: 94, round: "R16", home: mw(81), away: mw(82) },
  { id: 95, round: "R16", home: mw(86), away: mw(88) },
  { id: 96, round: "R16", home: mw(85), away: mw(87) },
  // Quarter-finals
  { id: 97, round: "QF", home: mw(89), away: mw(90) },
  { id: 98, round: "QF", home: mw(93), away: mw(94) },
  { id: 99, round: "QF", home: mw(91), away: mw(92) },
  { id: 100, round: "QF", home: mw(95), away: mw(96) },
  // Semi-finals
  { id: 101, round: "SF", home: mw(97), away: mw(98) },
  { id: 102, round: "SF", home: mw(99), away: mw(100) },
  // Third place + Final
  { id: 103, round: "3P", home: ml(101), away: ml(102) },
  { id: 104, round: "F", home: mw(101), away: mw(102) },
];

export const ROUND_LABELS: Record<Round, string> = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-finals",
  SF: "Semi-finals",
  "3P": "Third-place match",
  F: "Final",
};

// Which R32 match holds the 3rd-place slot for each group winner (column order A,B,D,E,G,I,K,L).
const WINNER_TO_THIRD_MATCH: Record<string, number> = {
  A: 79, B: 85, D: 81, E: 74, G: 82, I: 77, K: 87, L: 80,
};

/** Map of R32 matchId -> the group whose 3rd-placed team fills its third slot. */
export function resolveThirdGroups(advancedGroups: string[]): Record<number, string> {
  if (advancedGroups.length !== 8) return {};
  const key = [...advancedGroups].sort().join("");
  const alloc = THIRD_PLACE_ALLOCATION[key];
  if (!alloc) return {};
  const out: Record<number, string> = {};
  WINNER_COLS.forEach((winnerGroup, i) => {
    out[WINNER_TO_THIRD_MATCH[winnerGroup]] = alloc[i];
  });
  return out;
}

export type Order = Record<string, Team[]>; // group -> [1st,2nd,3rd,4th]
export type MatchResult = { home: Team | null; away: Team | null; winner: Team | null; loser: Team | null };

function resolveSlot(
  slot: Slot,
  matchId: number,
  order: Order,
  thirdGroups: Record<number, string>,
  results: Record<number, MatchResult>
): Team | null {
  switch (slot.kind) {
    case "winner":
      return order[slot.group]?.[0] ?? null;
    case "runner":
      return order[slot.group]?.[1] ?? null;
    case "third": {
      const g = thirdGroups[matchId];
      return g ? order[g]?.[2] ?? null : null;
    }
    case "matchWinner":
      return results[slot.match]?.winner ?? null;
    case "matchLoser":
      return results[slot.match]?.loser ?? null;
  }
}

/**
 * Compute every match's teams + result.
 * `picks` maps matchId -> chosen winner's team code. Stale picks (team no longer
 * present after an upstream change) auto-clear, since the winner must match a side.
 */
export function buildBracket(
  order: Order,
  advancedGroups: string[],
  picks: Record<number, string>
): { results: Record<number, MatchResult>; thirdGroups: Record<number, string> } {
  const thirdGroups = resolveThirdGroups(advancedGroups);
  const results: Record<number, MatchResult> = {};
  for (const def of MATCHES) {
    const home = resolveSlot(def.home, def.id, order, thirdGroups, results);
    const away = resolveSlot(def.away, def.id, order, thirdGroups, results);
    const pick = picks[def.id];
    let winner: Team | null = null;
    if (pick && home?.code === pick) winner = home;
    else if (pick && away?.code === pick) winner = away;
    const loser = winner ? (winner === home ? away : home) : null;
    results[def.id] = { home, away, winner, loser };
  }
  return { results, thirdGroups };
}
