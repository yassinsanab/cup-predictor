"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SCORES_URL,
  type RawMatch,
  flagCode,
  isRealTeam,
  prettyTeam,
  parseKickoff,
  getScore,
} from "@/lib/wcScores";

type Filter = "all" | "group" | "knockout";

const KNOCKOUT_ROUNDS = new Set([
  "Round of 32",
  "Round of 16",
  "Quarter-final",
  "Semi-final",
  "Match for third place",
  "Final",
]);

export function ScoresBoard() {
  const [matches, setMatches] = useState<RawMatch[] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(SCORES_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { matches: RawMatch[] };
      setMatches(data.matches ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 5 * 60 * 1000); // refresh every 5 min
    return () => clearInterval(id);
  }, []);

  const byDate = useMemo(() => {
    if (!matches) return [];
    const filtered = matches.filter((m) => {
      const ko = KNOCKOUT_ROUNDS.has(m.round);
      return filter === "all" || (filter === "knockout" ? ko : !ko);
    });
    const withDt = filtered.map((m) => ({ m, dt: parseKickoff(m.date, m.time) }));
    withDt.sort((a, b) => (a.dt?.getTime() ?? 0) - (b.dt?.getTime() ?? 0));
    const groups: { key: string; label: string; items: typeof withDt }[] = [];
    for (const row of withDt) {
      const label = row.dt
        ? row.dt.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })
        : row.m.date;
      const key = row.dt ? row.dt.toDateString() : row.m.date;
      let g = groups.find((x) => x.key === key);
      if (!g) {
        g = { key, label, items: [] };
        groups.push(g);
      }
      g.items.push(row);
    }
    return groups;
  }, [matches, filter]);

  const todayKey = new Date().toDateString();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">Scores &amp; fixtures</h1>
          <p className="mt-1 text-sm text-muted">
            World Cup 2026 · times in your local timezone · results refresh periodically.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-btn border border-line bg-card px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
        >
          Refresh
        </button>
      </div>

      <div className="mt-5 inline-flex rounded-btn border border-line bg-card p-1 text-sm font-semibold">
        {(["all", "group", "knockout"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-[10px] px-4 py-1.5 capitalize transition-colors ${
              filter === f ? "bg-ink text-white" : "text-muted hover:text-ink"
            }`}
          >
            {f === "all" ? "All" : f === "group" ? "Group stage" : "Knockouts"}
          </button>
        ))}
      </div>

      {loading && !matches && <p className="mt-10 text-center text-sm text-muted">Loading fixtures…</p>}

      {error && (
        <div className="mt-10 rounded-card border border-line bg-card p-8 text-center">
          <p className="text-sm text-ink-soft">Couldn&apos;t load the schedule right now.</p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-btn bg-pitch px-5 py-2 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-8 space-y-8">
        {byDate.map((day) => (
          <section key={day.key}>
            <div className="mb-3 flex items-center gap-2">
              <h2 className="font-display text-lg font-extrabold text-ink">{day.label}</h2>
              {day.key === todayKey && (
                <span className="rounded-full bg-pitch/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-pitch-deep">
                  Today
                </span>
              )}
            </div>
            <div className="overflow-hidden rounded-card border border-line bg-card">
              {day.items.map(({ m, dt }, i) => (
                <MatchRow key={`${m.num ?? i}-${m.round}`} m={m} dt={dt} first={i === 0} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted">
        Data: openfootball (public domain). Not affiliated with FIFA.
      </p>
    </div>
  );
}

function Side({ name, align }: { name: string; align: "left" | "right" }) {
  const code = flagCode(name);
  const real = isRealTeam(name);
  return (
    <div className={`flex min-w-0 flex-1 items-center gap-2.5 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      {code ? (
        <span className={`fi fi-${code} shrink-0`} style={{ width: 22, height: 16 }} />
      ) : (
        <span className="h-4 w-[22px] shrink-0 rounded-[3px] bg-line" />
      )}
      <span className={`truncate text-sm ${real ? "font-semibold text-ink" : "italic text-muted"}`}>
        {prettyTeam(name)}
      </span>
    </div>
  );
}

function MatchRow({ m, dt, first }: { m: RawMatch; dt: Date | null; first: boolean }) {
  const score = getScore(m);
  const finished = !!score;
  const past = dt ? dt.getTime() < Date.now() : false;
  const center = finished
    ? `${score![0]} – ${score![1]}`
    : dt
      ? dt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
      : m.time;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${first ? "" : "border-t border-line"}`}>
      <Side name={m.team1} align="left" />
      <div className="flex shrink-0 flex-col items-center" style={{ minWidth: 64 }}>
        <span
          className={`font-display text-sm font-extrabold tabular-nums ${finished ? "text-ink" : past ? "text-muted" : "text-pitch-deep"}`}
        >
          {finished ? center : past ? "—" : center}
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">
          {m.group ? m.group.replace("Group ", "Gp ") : m.round}
        </span>
      </div>
      <Side name={m.team2} align="right" />
    </div>
  );
}
