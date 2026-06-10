import { GROUPS } from "./teams";

export const SCORES_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

export type RawMatch = {
  round: string;
  date: string;
  time: string;
  team1: string;
  team2: string;
  group?: string;
  ground?: string;
  num?: number;
  score?: { ft?: [number, number]; ht?: [number, number] };
  score1?: number;
  score2?: number;
};

// Build name -> flag-icons code from our confirmed squad, plus openfootball aliases.
const FLAG_BY_NAME: Record<string, string> = {};
for (const g of GROUPS) for (const t of g.teams) FLAG_BY_NAME[t.name] = t.code;
const ALIASES: Record<string, string> = {
  "Czech Republic": "Czechia",
  "Ivory Coast": "Côte d'Ivoire",
  USA: "United States",
  Turkey: "Türkiye",
};
for (const [openfootball, ours] of Object.entries(ALIASES)) {
  if (FLAG_BY_NAME[ours]) FLAG_BY_NAME[openfootball] = FLAG_BY_NAME[ours];
}

export function flagCode(name: string): string | null {
  return FLAG_BY_NAME[name] ?? null;
}

export function isRealTeam(name: string): boolean {
  return name in FLAG_BY_NAME;
}

/** Turn placeholders like "1A", "2B", "W73", "L101", "3A/B/C/D/F" into readable labels. */
export function prettyTeam(name: string): string {
  if (isRealTeam(name)) return name;
  let m = name.match(/^([12])([A-L])$/);
  if (m) return `${m[1] === "1" ? "Winner" : "Runner-up"} Gp ${m[2]}`;
  if (name.startsWith("3")) return `3rd: ${name.slice(1)}`;
  m = name.match(/^W(\d+)$/);
  if (m) return `Winner M${m[1]}`;
  m = name.match(/^L(\d+)$/);
  if (m) return `Loser M${m[1]}`;
  return name;
}

/** Parse "2026-06-11" + "13:00 UTC-6" into a Date (UTC-correct). */
export function parseKickoff(date: string, time: string): Date | null {
  const t = time.match(/(\d{1,2}):(\d{2})/);
  if (!t) return null;
  const off = time.match(/UTC([+-]\d{1,2})/);
  let iso = `${date}T${t[1].padStart(2, "0")}:${t[2]}:00`;
  if (off) {
    const h = parseInt(off[1], 10);
    const sign = h < 0 ? "-" : "+";
    iso += `${sign}${String(Math.abs(h)).padStart(2, "0")}:00`;
  } else {
    iso += "Z";
  }
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

export function getScore(m: RawMatch): [number, number] | null {
  if (m.score?.ft) return m.score.ft;
  if (typeof m.score1 === "number" && typeof m.score2 === "number") return [m.score1, m.score2];
  return null;
}
