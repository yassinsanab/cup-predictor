"use client";

import { useEffect, useMemo, useState } from "react";
import { GROUPS } from "@/lib/teams";
import { GROUP_ORDER_KEY, defaultOrder, type Order } from "@/lib/prediction";
import { GroupCard } from "./GroupCard";
import { Button } from "@/components/ui/Button";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function GroupStage() {
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Load any saved prediction once on mount (guarded to avoid SSR mismatch).
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(GROUP_ORDER_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { order: Order; touched: string[] };
        setOrder(saved.order);
        setTouched(new Set(saved.touched));
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        GROUP_ORDER_KEY,
        JSON.stringify({ order, touched: [...touched] })
      );
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [order, touched, mounted]);

  function move(groupId: string, index: number, dir: -1 | 1) {
    setOrder((prev) => {
      const teams = [...prev[groupId]];
      const target = index + dir;
      if (target < 0 || target >= teams.length) return prev;
      [teams[index], teams[target]] = [teams[target], teams[index]];
      return { ...prev, [groupId]: teams };
    });
    setTouched((prev) => new Set(prev).add(groupId));
  }

  function shuffleAll() {
    const o: Order = {};
    for (const g of GROUPS) o[g.id] = shuffle(g.teams);
    setOrder(o);
    setTouched(new Set(GROUPS.map((g) => g.id)));
  }

  function reset() {
    setOrder(defaultOrder());
    setTouched(new Set());
  }

  const progress = touched.size;
  const done = progress === GROUPS.length;

  const headline = useMemo(
    () => (done ? "Group stage complete" : "Rank all four teams in each group"),
    [done]
  );

  return (
    <div>
      {/* Sticky progress bar */}
      <div className="sticky top-16 z-30 -mx-5 mb-6 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="mx-auto flex max-w-shell items-center justify-between gap-4">
          <div>
            <div className="font-display text-base font-extrabold text-ink">
              {headline}
            </div>
            <div className="text-xs text-muted">
              <span className="tabular-nums font-semibold text-ink">
                {progress}/{GROUPS.length}
              </span>{" "}
              groups set · top 2 + 8 best 3rd-place advance
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="md" onClick={shuffleAll}>
              Shuffle
            </Button>
            <Button
              variant="gold"
              size="md"
              arrow
              onClick={() => {
                document
                  .getElementById("save-cta")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {done ? "Save & share" : "Finish"}
            </Button>
          </div>
        </div>
      </div>

      {/* Group grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GROUPS.map((g) => (
          <GroupCard
            key={g.id}
            id={g.id}
            teams={order[g.id]}
            onMove={(i, dir) => move(g.id, i, dir)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
        <Legend swatch="bg-gold" label="1st — advances" />
        <Legend swatch="bg-pitch" label="2nd — advances" />
        <Legend swatch="bg-[#E08A2B]" label="3rd — may advance (8 best)" />
        <Legend swatch="bg-line" label="4th — eliminated" />
      </div>

      {/* Save CTA (wires to Phase 1 share-image generator next) */}
      <div
        id="save-cta"
        className="mt-10 flex flex-col items-center gap-3 rounded-card border border-line bg-card px-6 py-10 text-center"
      >
        <div className="font-display text-xl font-extrabold text-ink">
          Lock your bracket
        </div>
        <p className="max-w-md text-sm text-ink-soft">
          Save your group-stage prediction, then continue to the knockout
          bracket. Your picks are kept on this device until kickoff.
        </p>
        <div className="mt-2 flex gap-3">
          <Button variant="primary" arrow>Save my prediction</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${swatch}`} />
      {label}
    </span>
  );
}
