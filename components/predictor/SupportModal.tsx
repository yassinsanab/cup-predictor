"use client";

import { useEffect, useMemo } from "react";
import type { Team } from "@/lib/teams";
import { track } from "@/lib/analytics";

type Props = {
  champion: Team | null;
  runnerUp: Team | null;
  third: Team | null;
  onClose: () => void;
};

const CONFETTI = ["#D7A028", "#0F7A4E", "#D63D34", "#2C66D6", "#A87A10"];

export function SupportModal({ champion, runnerUp, third, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: Math.round((i / 18) * 100 + (Math.random() * 6 - 3)),
        color: CONFETTI[i % CONFETTI.length],
        delay: Math.random() * 0.5,
        dur: 1 + Math.random() * 0.8,
        size: 6 + Math.round(Math.random() * 5),
      })),
    []
  );

  const hasPodium = !!champion;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-card border border-line bg-card shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        {/* confetti */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
          {pieces.map((p, i) => (
            <span
              key={i}
              className="pmp-confetti-piece"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
                borderRadius: i % 3 === 0 ? "50%" : "2px",
              }}
            />
          ))}
        </div>

        {/* gold top band */}
        <div className="relative bg-gradient-to-b from-gold/15 to-transparent px-6 pt-6 pb-2 text-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full p-2 text-muted transition-colors hover:bg-paper hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="kicker text-[11px] text-gold-deep">Image saved ✓</div>
          <h2 className="font-display mt-1 text-3xl font-black uppercase tracking-tight text-ink">
            {hasPodium ? "That's a wrap!" : "Saved!"}
          </h2>
        </div>

        <div className="px-6 pb-6">
          {hasPodium ? (
            <div className="mt-2 flex items-end justify-center gap-2">
              <PodiumCol team={runnerUp} place={2} height={56} color="#9A958A" />
              <PodiumCol team={champion} place={1} height={88} color="#D7A028" crown />
              <PodiumCol team={third} place={3} height={40} color="#B07A3C" />
            </div>
          ) : (
            <div className="mt-3 flex flex-col items-center">
              <Trophy />
              <p className="mt-2 font-display text-lg font-extrabold text-ink">Your picks are saved</p>
            </div>
          )}

          {/* maker note — personal, warm, makes supporting feel good */}
          <div className="mt-6 rounded-card bg-paper/70 p-4 text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              I&apos;m a solo developer and built PlayMatchPool on nights and weekends —
              <span className="font-semibold text-ink"> free, no ads, no sign-up.</span> If
              it gave you even one &ldquo;ooh&rdquo; moment, a coffee genuinely makes my day. ☕
            </p>
          </div>

          <a
            href="https://www.buymeacoffee.com/apoldi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("buy_coffee_click", { source: "save_modal" })}
            className="pmp-coffee-btn mt-4 flex w-full items-center justify-center gap-2.5 rounded-btn py-3.5 text-base font-extrabold text-ink"
          >
            <CoffeeIcon /> Buy me a coffee
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
    </div>
  );
}

function PodiumCol({
  team,
  place,
  height,
  color,
  crown,
}: {
  team: Team | null;
  place: number;
  height: number;
  color: string;
  crown?: boolean;
}) {
  return (
    <div className="flex w-[30%] flex-col items-center">
      {crown ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color} className="mb-1">
          <path d="M3 7l4 4 5-7 5 7 4-4-2 12H5L3 7z" />
        </svg>
      ) : (
        <span className="mb-1 h-[22px]" />
      )}
      {team ? (
        <span className={`fi fi-${team.code}`} style={{ width: 36, height: 27, borderRadius: 3, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)" }} />
      ) : (
        <span style={{ width: 36, height: 27 }} className="rounded bg-line" />
      )}
      <div className="mt-1.5 w-full truncate px-1 text-center text-[13px] font-bold text-ink">
        {team ? team.name : "—"}
      </div>
      <div
        className="font-display mt-2 flex w-full items-start justify-center rounded-t-md pt-1.5 text-2xl font-black text-white"
        style={{ height, background: color }}
      >
        {place}
      </div>
    </div>
  );
}

function Trophy() {
  return (
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#D7A028" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10v3a5 5 0 0 1-10 0V4Z M17 5h2.5a1.5 1.5 0 0 1 0 5H17 M7 5H4.5a1.5 1.5 0 0 0 0 5H7 M12 12v3 M9 19h6 M10 19c0-1.2.6-2 2-2s2 .8 2 2" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}
