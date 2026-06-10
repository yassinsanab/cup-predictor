"use client";

import { forwardRef } from "react";
import { GROUPS, type Team } from "@/lib/teams";
import type { Order } from "@/lib/prediction";
import type { MatchResult } from "@/lib/bracket";

const C = {
  ink: "#0E0E10",
  paper: "#F3F0E8",
  card: "#FBFAF6",
  line: "#E4DFD2",
  conn: "#D9D3C4",
  inkSoft: "#3A3A3E",
  muted: "#6C6960",
  gold: "#D7A028",
  goldDeep: "#A87A10",
  pitch: "#0F7A4E",
  pitchDeep: "#0B5C3A",
};
const FONT = "var(--font-display), system-ui, sans-serif";

const flag = (w: number, h: number): React.CSSProperties => ({
  width: w,
  height: h,
  borderRadius: 2,
  boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)",
  flexShrink: 0,
});

// Geometry
const W = 150, H = 48, LEAF = 64, TOP = 30, Wc = 190;
const CONTENT = 1710;
const H_BR = TOP + 8 * LEAF + 8; // 550
const xL = [0, 190, 380, 570];
const xCenter = 760;
const xR = [990, 1180, 1370, 1560]; // SF, QF, R16, R32

const yR32 = Array.from({ length: 8 }, (_, i) => TOP + i * LEAF + LEAF / 2);
const yR16 = [0, 1, 2, 3].map((k) => (yR32[2 * k] + yR32[2 * k + 1]) / 2);
const yQF = [0, 1].map((k) => (yR16[2 * k] + yR16[2 * k + 1]) / 2);
const ySF = (yQF[0] + yQF[1]) / 2;
const yByRound = [yR32, yR16, yQF, [ySF]];

const L_IDS = [
  [74, 77, 73, 75, 83, 84, 81, 82],
  [89, 90, 93, 94],
  [97, 98],
  [101],
];
const R_IDS = [
  [76, 78, 79, 80, 86, 88, 85, 87],
  [91, 92, 95, 96],
  [99, 100],
  [102],
];

type Props = { order: Order; thirds: string[]; results: Record<number, MatchResult> };
type Seg = { x1: number; y1: number; x2: number; y2: number; hl: boolean };

export const ShareCard = forwardRef<HTMLDivElement, Props>(function ShareCard(
  { order, thirds, results },
  ref
) {
  const champion = results[104]?.winner ?? null;
  const runnerUp = results[104]?.loser ?? null;
  const third = results[103]?.winner ?? null;
  const thirdTeams = thirds.map((g) => order[g]?.[2]).filter((t): t is Team => Boolean(t));

  const advanced = (childId: number, parentId: number) => {
    const cw = results[childId]?.winner;
    if (!cw) return false;
    const p = results[parentId];
    return cw.code === p?.home?.code || cw.code === p?.away?.code;
  };

  // Build connector segments for one side.
  const segs: Seg[] = [];
  const addSide = (ids: number[][], xs: number[], left: boolean) => {
    for (let L = 0; L < 3; L++) {
      const childX = xs[L];
      const parentX = xs[L + 1];
      const childEdge = left ? childX + W : childX;
      const parentEdge = left ? parentX : parentX + W;
      const mid = (childEdge + parentEdge) / 2;
      const childYs = yByRound[L];
      const parentYs = yByRound[L + 1];
      for (let k = 0; k < parentYs.length; k++) {
        const c1 = childYs[2 * k], c2 = childYs[2 * k + 1], p = parentYs[k];
        const a1 = advanced(ids[L][2 * k], ids[L + 1][k]);
        const a2 = advanced(ids[L][2 * k + 1], ids[L + 1][k]);
        segs.push({ x1: childEdge, y1: c1, x2: mid, y2: c1, hl: a1 });
        segs.push({ x1: childEdge, y1: c2, x2: mid, y2: c2, hl: a2 });
        segs.push({ x1: mid, y1: c1, x2: mid, y2: p, hl: a1 });
        segs.push({ x1: mid, y1: p, x2: mid, y2: c2, hl: a2 });
        segs.push({ x1: mid, y1: p, x2: parentEdge, y2: p, hl: a1 || a2 });
      }
    }
  };
  addSide(L_IDS, xL, true);
  addSide(R_IDS, xR, false);
  // SF -> centre
  segs.push({ x1: xL[3] + W, y1: ySF, x2: xCenter, y2: ySF, hl: advanced(101, 104) });
  segs.push({ x1: xR[0], y1: ySF, x2: xCenter + Wc, y2: ySF, hl: advanced(102, 104) });

  const labels: { x: number; t: string }[] = [
    { x: xL[0] + W / 2, t: "R32" },
    { x: xL[1] + W / 2, t: "R16" },
    { x: xL[2] + W / 2, t: "QF" },
    { x: xL[3] + W / 2, t: "SF" },
    { x: xCenter + Wc / 2, t: "Final" },
    { x: xR[0] + W / 2, t: "SF" },
    { x: xR[1] + W / 2, t: "QF" },
    { x: xR[2] + W / 2, t: "R16" },
    { x: xR[3] + W / 2, t: "R32" },
  ];

  const boxes: { x: number; y: number; id: number }[] = [];
  L_IDS.forEach((round, L) => round.forEach((id, k) => boxes.push({ x: xL[L], y: yByRound[L][k], id })));
  R_IDS.forEach((round, L) => round.forEach((id, k) => boxes.push({ x: xR[L], y: yByRound[L][k], id })));

  return (
    <div style={{ width: CONTENT + 64, background: C.paper, padding: 32, boxSizing: "border-box", fontFamily: FONT }}>
      {/* Slim brand bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Trophy size={26} />
          <span style={{ fontSize: 24, fontWeight: 900, color: C.ink, letterSpacing: -0.5 }}>Cup Predictor &rsquo;26</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.goldDeep }}>
          World Cup 2026 <span style={{ color: C.muted, fontWeight: 600 }}>· USA · Canada · Mexico</span>
        </div>
      </div>

      {/* Bracket */}
      <div style={{ position: "relative", width: CONTENT, height: H_BR, margin: "0 auto" }}>
        {/* labels */}
        {labels.map((l, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: l.x,
              top: 2,
              transform: "translateX(-50%)",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: l.t === "Final" ? C.goldDeep : C.muted,
            }}
          >
            {l.t}
          </div>
        ))}

        {/* connectors */}
        <svg width={CONTENT} height={H_BR} style={{ position: "absolute", inset: 0 }}>
          {segs.filter((s) => !s.hl).map((s, i) => (
            <line key={`n${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={C.conn} strokeWidth={1.6} />
          ))}
          {segs.filter((s) => s.hl).map((s, i) => (
            <line key={`h${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke={C.pitch} strokeWidth={2.4} />
          ))}
        </svg>

        {/* centre champion piece */}
        <div
          style={{
            position: "absolute",
            left: xCenter,
            top: TOP,
            width: Wc,
            height: 8 * LEAF,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 6,
          }}
        >
          <Trophy size={52} />
          <div style={{ color: C.goldDeep, fontSize: 10, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase", marginTop: 4 }}>
            Predicted Champion
          </div>
          {champion && <span className={`fi fi-${champion.code}`} style={flag(40, 29)} />}
          <div style={{ fontSize: 24, fontWeight: 900, color: C.ink, lineHeight: 1.05 }}>{champion ? champion.name : "—"}</div>
          <div style={{ width: 60, height: 2, background: C.gold, borderRadius: 2, margin: "8px 0" }} />
          <div style={{ fontSize: 12, color: C.muted }}>
            <span style={{ fontWeight: 700, color: C.inkSoft }}>2nd</span> {runnerUp ? runnerUp.name : "—"}
          </div>
          <div style={{ fontSize: 12, color: C.muted }}>
            <span style={{ fontWeight: 700, color: C.inkSoft }}>3rd</span> {third ? third.name : "—"}
          </div>
        </div>

        {/* match boxes */}
        {boxes.map((b) => (
          <Box key={b.id} x={b.x} y={b.y} r={results[b.id]} />
        ))}
      </div>

      {/* Best thirds (compact inline) */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: C.muted, marginRight: 4 }}>
          Best thirds
        </span>
        {thirdTeams.length === 0 && <span style={{ color: C.muted, fontSize: 13 }}>—</span>}
        {thirdTeams.map((t) => (
          <span
            key={t.code}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.card, border: `1px solid ${C.line}`, borderRadius: 999, padding: "5px 12px" }}
          >
            <span className={`fi fi-${t.code}`} style={flag(18, 13)} />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{t.name}</span>
          </span>
        ))}
      </div>

      {/* Group stage (compact) */}
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: C.ink, margin: "26px 0 12px" }}>
        Group stage
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
        {GROUPS.map((g) => (
          <div key={g.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: "10px 12px" }}>
            <div style={{ textAlign: "center", color: C.pitch, fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 7 }}>
              Group {g.id}
            </div>
            {(order[g.id] ?? g.teams).map((t, i) => (
              <GroupRow key={t.code} pos={i} team={t} />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 24, borderTop: `1px solid ${C.line}`, paddingTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: C.muted }}>Independent fan project · not affiliated with FIFA.</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.ink, color: C.paper, borderRadius: 999, padding: "8px 18px", fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: C.gold }}>Cup Predictor &rsquo;26</span>
          <span style={{ opacity: 0.55 }}>cup-predictor.vercel.app</span>
        </span>
      </div>
    </div>
  );
});

function Box({ x, y, r }: { x: number; y: number; r: MatchResult | undefined }) {
  const home = r?.home ?? null;
  const away = r?.away ?? null;
  const winner = r?.winner ?? null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - H / 2,
        width: W,
        height: H,
        border: `1px solid ${C.line}`,
        borderRadius: 8,
        background: C.card,
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(0,0,0,.04)",
      }}
    >
      <BoxRow team={home} win={!!winner && winner.code === home?.code} />
      <div style={{ height: 1, background: C.line }} />
      <BoxRow team={away} win={!!winner && winner.code === away?.code} />
    </div>
  );
}

function BoxRow({ team, win }: { team: Team | null; win: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: (H - 1) / 2,
        padding: "0 8px",
        background: win ? "rgba(15,122,78,.12)" : "transparent",
      }}
    >
      {team ? (
        <span className={`fi fi-${team.code}`} style={flag(15, 11)} />
      ) : (
        <span style={{ width: 15, height: 11, background: C.line, borderRadius: 2, flexShrink: 0 }} />
      )}
      <span
        style={{
          flex: 1,
          fontSize: 11,
          fontWeight: win ? 800 : 600,
          color: win ? C.pitchDeep : C.inkSoft,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {team ? team.name : "—"}
      </span>
      {win && <span style={{ width: 6, height: 6, borderRadius: 999, background: C.pitch, flexShrink: 0 }} />}
    </div>
  );
}

function GroupRow({ pos, team }: { pos: number; team: Team }) {
  const labels = ["1", "2", "3", "4"];
  const colors = [C.goldDeep, C.pitch, "#B07A3C", C.muted];
  const adv = pos < 2;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "3px 0" }}>
      <span style={{ width: 12, fontSize: 11, fontWeight: 800, color: colors[pos] }}>{labels[pos]}</span>
      <span className={`fi fi-${team.code}`} style={flag(16, 12)} />
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: adv ? 700 : 500,
          color: adv ? C.ink : C.muted,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {team.name}
      </span>
    </div>
  );
}

function Trophy({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 4h10v3a5 5 0 0 1-10 0V4Z M17 5h2.5a1.5 1.5 0 0 1 0 5H17 M7 5H4.5a1.5 1.5 0 0 0 0 5H7 M12 12v3 M9 19h6 M10 19c0-1.2.6-2 2-2s2 .8 2 2"
        stroke="#D7A028"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
