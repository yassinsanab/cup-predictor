import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { GROUPS, FORMAT } from "@/lib/teams";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: "PlayMatchPool", url: "https://www.playmatchpool.com" },
    {
      "@type": "Organization",
      name: "PlayMatchPool",
      url: "https://www.playmatchpool.com",
      logo: "https://www.playmatchpool.com/icon.svg",
    },
  ],
};

const STATS = [
  { n: "48", l: "Teams" },
  { n: "12", l: "Groups" },
  { n: "104", l: "Matches" },
  { n: "1", l: "Champion" },
];

const STEPS = [
  { n: "01", t: "Rank the groups", d: "Order all 12 groups the way you think they'll finish. Top two go through automatically." },
  { n: "02", t: "Fill the bracket", d: "Pick the eight best third-placed teams, then play out every knockout tie to the final." },
  { n: "03", t: "Share the image", d: "Export your whole bracket as one clean image and see if your friends call it the same." },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }} />
      {/* HERO — editorial, asymmetric, type-led */}
      <section className="mx-auto max-w-shell px-5 pt-14 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="kicker flex items-center gap-3 text-xs text-gold-deep">
              <span className="h-px w-8 bg-gold" />
              World Cup 2026 · {FORMAT.window}
            </div>

            <h1 className="font-display mt-5 text-[clamp(3.2rem,9vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.02em] text-ink">
              Call the
              <br />
              whole
              <br />
              <span className="text-pitch">tournament.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Rank all {FORMAT.teams} teams from the group stage to the final, then
              share your bracket. No sign-up, no email — done in two minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/predict" variant="primary" size="lg" arrow>
                Build your bracket
              </ButtonLink>
              <ButtonLink href="/scores" variant="ghost" size="lg">
                View fixtures
              </ButtonLink>
            </div>
          </div>

          {/* Minimal bracket motif — hairlines converging to a gold champion node */}
          <div className="hidden lg:col-span-5 lg:block">
            <BracketMotif />
          </div>
        </div>
      </section>

      {/* SCOREBOARD STRIP — dark block, condensed tabular numerals */}
      <section className="mx-auto mt-16 max-w-shell px-5 sm:mt-20 sm:px-8">
        <div className="grid grid-cols-2 overflow-hidden rounded-card bg-ink sm:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className={`px-6 py-7 ${i % 2 ? "border-l border-white/10" : ""} ${
                i >= 2 ? "border-t border-white/10 sm:border-t-0" : ""
              } ${i === 1 ? "sm:border-l" : ""} ${i > 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              <div className="font-display text-5xl font-black tabular-nums text-paper sm:text-6xl">
                {s.n}
              </div>
              <div className="kicker mt-1 text-[11px] text-gold">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — editorial numbered steps, hairline dividers */}
      <section className="mx-auto max-w-shell px-5 pt-20 sm:px-8 sm:pt-28">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          Three steps
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-paper p-7">
              <div className="font-display text-5xl font-black text-gold">{s.n}</div>
              <h3 className="font-display mt-3 text-xl font-extrabold uppercase tracking-wide text-ink">
                {s.t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GROUPS — tight editorial grid */}
      <section className="mx-auto max-w-shell px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            The draw
          </h2>
          <p className="hidden max-w-xs text-right text-sm text-muted sm:block">{FORMAT.advance}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.id} className="bg-card p-5">
              <div className="mb-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-black leading-none text-ink">{g.id}</span>
                <span className="kicker text-[10px] text-muted">Group</span>
              </div>
              <ul className="flex flex-col gap-2">
                {g.teams.map((t) => (
                  <li key={t.code} className="flex items-center gap-2.5 text-sm">
                    <span className={`fi fi-${t.code}`} style={{ width: 20, height: 15 }} />
                    <span className="text-ink-soft">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA — ink band */}
      <section className="mx-auto max-w-shell px-5 pb-4 pt-20 sm:px-8 sm:pt-28">
        <div className="relative overflow-hidden rounded-card bg-ink px-8 py-14 text-center sm:py-20">
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2.2rem,6vw,4rem)] font-black uppercase leading-[0.9] tracking-tight text-paper">
            Your bracket won&apos;t<br className="hidden sm:block" /> fill itself.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper/60">
            Group order, the eight third-placed qualifiers, every knockout tie — call it now.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/predict" variant="gold" size="lg" arrow>
              Start predicting
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function BracketMotif() {
  const C = { line: "#cdc7b8", ink: "#0E0E10", gold: "#D7A028", pitch: "#0F7A4E" };
  // 4 leaves -> 2 -> 1 -> champion, drawn as hairlines.
  const ys = [34, 104, 196, 266];
  const Stub = ({ x1, y1, x2, y2, hot }: { x1: number; y1: number; x2: number; y2: number; hot?: boolean }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={hot ? C.pitch : C.line} strokeWidth={hot ? 2.4 : 1.6} />
  );
  return (
    <svg viewBox="0 0 360 300" className="w-full" role="img" aria-label="Tournament bracket converging to a champion">
      {/* leaf boxes */}
      {ys.map((y, i) => (
        <rect key={i} x="6" y={y - 16} width="92" height="32" rx="6" fill="none" stroke={C.line} strokeWidth="1.6" />
      ))}
      {/* round 1 stubs + verticals */}
      <Stub x1={98} y1={ys[0]} x2={150} y2={ys[0]} hot />
      <Stub x1={98} y1={ys[1]} x2={150} y2={ys[1]} />
      <Stub x1={150} y1={ys[0]} x2={150} y2={(ys[0] + ys[1]) / 2} hot />
      <Stub x1={150} y1={ys[1]} x2={150} y2={(ys[0] + ys[1]) / 2} />
      <Stub x1={150} y1={(ys[0] + ys[1]) / 2} x2={196} y2={(ys[0] + ys[1]) / 2} hot />
      <Stub x1={98} y1={ys[2]} x2={150} y2={ys[2]} />
      <Stub x1={98} y1={ys[3]} x2={150} y2={ys[3]} />
      <Stub x1={150} y1={ys[2]} x2={150} y2={(ys[2] + ys[3]) / 2} />
      <Stub x1={150} y1={ys[3]} x2={150} y2={(ys[2] + ys[3]) / 2} />
      <Stub x1={150} y1={(ys[2] + ys[3]) / 2} x2={196} y2={(ys[2] + ys[3]) / 2} />
      {/* round 2 -> champion */}
      <Stub x1={196} y1={(ys[0] + ys[1]) / 2} x2={196} y2={150} hot />
      <Stub x1={196} y1={(ys[2] + ys[3]) / 2} x2={196} y2={150} />
      <Stub x1={196} y1={150} x2={250} y2={150} hot />
      {/* champion node */}
      <circle cx="270" cy="150" r="20" fill={C.ink} />
      <g transform="translate(258,138)" stroke={C.gold} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M4 2h16v4a8 8 0 0 1-16 0V2Z M20 3h3a3 3 0 0 1-3 4 M4 3H1a3 3 0 0 0 3 4 M12 14v4 M8 22h8 M9 22c0-2 1.2-3 3-3s3 1 3 3" />
      </g>
    </svg>
  );
}
