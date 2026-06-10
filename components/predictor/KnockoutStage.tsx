"use client";

import { useEffect, useMemo, useState } from "react";
import { GROUPS, type Team } from "@/lib/teams";
import { KNOCKOUT_KEY, loadGroupOrder, type Order } from "@/lib/prediction";
import {
  MATCHES,
  ROUND_LABELS,
  buildBracket,
  type MatchResult,
  type Round,
} from "@/lib/bracket";
import { Button } from "@/components/ui/Button";

const ROUND_ORDER: Round[] = ["R32", "R16", "QF", "SF", "3P", "F"];

export function KnockoutStage() {
  const [order, setOrder] = useState<Order>({});
  const [thirds, setThirds] = useState<string[]>([]); // group letters, max 8
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOrder(loadGroupOrder());
    try {
      const raw = localStorage.getItem(KNOCKOUT_KEY);
      if (raw) {
        const s = JSON.parse(raw) as { thirds?: string[]; picks?: Record<number, string> };
        if (s.thirds) setThirds(s.thirds);
        if (s.picks) setPicks(s.picks);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(KNOCKOUT_KEY, JSON.stringify({ thirds, picks }));
    } catch {
      /* ignore */
    }
  }, [thirds, picks, mounted]);

  const built = useMemo(
    () => buildBracket(order, thirds, picks),
    [order, thirds, picks]
  );

  function toggleThird(g: string) {
    setThirds((prev) => {
      if (prev.includes(g)) return prev.filter((x) => x !== g);
      if (prev.length >= 8) return prev; // cap at 8
      return [...prev, g];
    });
  }

  function pickWinner(matchId: number, team: Team | null) {
    if (!team) return;
    setPicks((prev) => {
      const next = { ...prev };
      if (next[matchId] === team.code) delete next[matchId];
      else next[matchId] = team.code;
      return next;
    });
  }

  function reset() {
    setThirds([]);
    setPicks({});
  }

  const champion = built.results[104]?.winner ?? null;
  const runnerUp = built.results[104]?.loser ?? null;
  const thirdPlace = built.results[103]?.winner ?? null;
  const thirdsReady = thirds.length === 8;

  if (!mounted) {
    return <div className="py-20 text-center text-sm text-muted">Loading your bracket…</div>;
  }

  return (
    <div className="pb-4">
      {/* Podium summary */}
      <div className="grid grid-cols-3 gap-3">
        <Podium label="Champion" team={champion} tone="gold" />
        <Podium label="Runner-up" team={runnerUp} tone="silver" />
        <Podium label="Third place" team={thirdPlace} tone="bronze" />
      </div>

      {/* Third-place selector */}
      <div className="mt-6 rounded-card border border-line bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-base font-extrabold text-ink">
            Select the 8 best third-place teams
          </h3>
          <span className="text-xs font-semibold tabular-nums text-muted">
            {thirds.length}/8 selected
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          The eight you pick are slotted into the Round of 32 using FIFA&apos;s
          official allocation table — no team meets a group rival early.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {GROUPS.map((g) => {
            const t = order[g.id]?.[2];
            const on = thirds.includes(g.id);
            const full = thirds.length >= 8 && !on;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggleThird(g.id)}
                disabled={full}
                className={[
                  "flex items-center gap-2 rounded-[10px] border px-3 py-2 text-left text-sm transition-colors",
                  on
                    ? "border-pitch bg-pitch/10 text-ink"
                    : full
                      ? "cursor-not-allowed border-line bg-white text-muted opacity-50"
                      : "border-line bg-white text-ink-soft hover:border-ink/30",
                ].join(" ")}
              >
                <span className="font-display text-xs font-extrabold text-gold-deep">
                  3{g.id}
                </span>
                {t && <span className={`fi fi-${t.code}`} style={{ width: 20, height: 15 }} />}
                <span className="min-w-0 flex-1 truncate">{t?.name ?? "—"}</span>
                <span
                  className={`grid h-4 w-4 place-items-center rounded-[5px] text-[10px] font-extrabold ${
                    on ? "bg-pitch text-white" : "bg-line text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
        {!thirdsReady && (
          <p className="mt-3 text-xs font-medium text-gold-deep">
            Pick {8 - thirds.length} more to unlock the Round of 32 matchups.
          </p>
        )}
      </div>

      {/* Rounds */}
      <div className="mt-8 space-y-10">
        {ROUND_ORDER.map((round) => {
          const ms = MATCHES.filter((m) => m.round === round);
          const cols =
            round === "R32"
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : round === "R16"
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : round === "QF"
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "sm:grid-cols-2";
          return (
            <section key={round}>
              <h3 className="mb-4 font-display text-xl font-extrabold tracking-tight text-ink">
                {ROUND_LABELS[round]}
              </h3>
              <div className={`grid grid-cols-1 gap-3 ${cols}`}>
                {ms.map((m) => (
                  <MatchCard
                    key={m.id}
                    id={m.id}
                    result={built.results[m.id]}
                    needThirds={!thirdsReady}
                    onPick={pickWinner}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Save / reset */}
      <div className="mt-10 flex flex-col items-center gap-3 rounded-card border border-line bg-card px-6 py-10 text-center">
        <div className="font-display text-xl font-extrabold text-ink">
          {champion ? `Your champion: ${champion.name}` : "Pick your champion"}
        </div>
        <p className="max-w-md text-sm text-ink-soft">
          {champion
            ? "Save your full bracket — sharing comes next."
            : "Work down to the final to crown a winner. Picks are kept on this device."}
        </p>
        <div className="mt-2 flex gap-3">
          <Button variant="primary" arrow>Save my bracket</Button>
          <Button variant="ghost" onClick={reset}>Reset knockouts</Button>
        </div>
      </div>
    </div>
  );
}

function Podium({
  label,
  team,
  tone,
}: {
  label: string;
  team: Team | null;
  tone: "gold" | "silver" | "bronze";
}) {
  const ring =
    tone === "gold"
      ? "text-gold border-gold/40"
      : tone === "silver"
        ? "text-muted border-line"
        : "text-[#B07A3C] border-[#B07A3C]/30";
  return (
    <div className={`rounded-card border bg-card p-4 text-center ${ring}`}>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em]">{label}</div>
      <div className="mt-2 flex items-center justify-center gap-2">
        {team ? (
          <>
            <span className={`fi fi-${team.code}`} style={{ width: 22, height: 16 }} />
            <span className="font-display text-sm font-extrabold text-ink sm:text-base">
              {team.name}
            </span>
          </>
        ) : (
          <span className="font-display text-lg text-line">—</span>
        )}
      </div>
    </div>
  );
}

function MatchCard({
  id,
  result,
  needThirds,
  onPick,
}: {
  id: number;
  result: MatchResult | undefined;
  needThirds: boolean;
  onPick: (id: number, team: Team | null) => void;
}) {
  const home = result?.home ?? null;
  const away = result?.away ?? null;
  const winner = result?.winner ?? null;
  return (
    <div className="overflow-hidden rounded-[12px] border border-line bg-card">
      <div className="border-b border-line px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
        Match {id}
      </div>
      <TeamRow team={home} isWinner={winner?.code === home?.code} needThirds={needThirds} onClick={() => onPick(id, home)} />
      <div className="h-px bg-line" />
      <TeamRow team={away} isWinner={winner?.code === away?.code} needThirds={needThirds} onClick={() => onPick(id, away)} />
    </div>
  );
}

function TeamRow({
  team,
  isWinner,
  needThirds,
  onClick,
}: {
  team: Team | null;
  isWinner: boolean;
  needThirds: boolean;
  onClick: () => void;
}) {
  if (!team) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted">
        <span className="h-[15px] w-5 rounded-[3px] bg-line" />
        <span className="italic">{needThirds ? "Pick 8 thirds" : "TBD"}</span>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors",
        isWinner ? "bg-pitch/10 font-bold text-ink" : "text-ink-soft hover:bg-paper",
      ].join(" ")}
    >
      <span className={`fi fi-${team.code} shrink-0`} style={{ width: 20, height: 15 }} />
      <span className="min-w-0 flex-1 truncate">{team.name}</span>
      {isWinner && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-pitch">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
