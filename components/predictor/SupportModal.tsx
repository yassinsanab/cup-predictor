"use client";

import { useEffect } from "react";
import type { Team } from "@/lib/teams";

type Props = {
  champion: Team | null;
  runnerUp: Team | null;
  third: Team | null;
  onClose: () => void;
};

const ROWS: { key: "champion" | "runnerUp" | "third"; label: string; color: string }[] = [
  { key: "champion", label: "Champion", color: "#D7A028" },
  { key: "runnerUp", label: "Runner-up", color: "#8C8A82" },
  { key: "third", label: "Third place", color: "#B07A3C" },
];

export function SupportModal({ champion, runnerUp, third, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const teams = { champion, runnerUp, third };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm rounded-card border border-line bg-card p-6 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="kicker text-[11px] text-gold-deep">Image saved</div>
            <h2 className="font-display mt-1 text-2xl font-extrabold text-ink">Your podium</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 rounded-full p-2 text-muted transition-colors hover:bg-paper hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-card border border-line">
          {ROWS.map((r, i) => {
            const team = teams[r.key];
            return (
              <div key={r.key} className={`flex items-center gap-3 px-4 py-3 ${i ? "border-t border-line" : ""}`}>
                <span className="font-display w-16 shrink-0 text-xs font-extrabold uppercase tracking-wide" style={{ color: r.color }}>
                  {r.label}
                </span>
                {team ? (
                  <>
                    <span className={`fi fi-${team.code}`} style={{ width: 22, height: 16 }} />
                    <span className="font-semibold text-ink">{team.name}</span>
                  </>
                ) : (
                  <span className="text-muted">—</span>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-center text-sm leading-relaxed text-ink-soft">
          PlayMatchPool is free and ad-free. If it gave you a laugh, a coffee keeps it going.
        </p>

        <a
          href="https://www.buymeacoffee.com/apoldi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-btn bg-gold py-3 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
            <line x1="6" y1="2" x2="6" y2="4" />
            <line x1="10" y1="2" x2="10" y2="4" />
            <line x1="14" y1="2" x2="14" y2="4" />
          </svg>
          Buy me a coffee
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
