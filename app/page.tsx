import { ButtonLink } from "@/components/ui/Button";
import { GROUPS, FORMAT } from "@/lib/teams";

const features = [
  {
    title: "Build your full bracket",
    body: "48 teams, group stage to the final. Set every round in a couple of minutes.",
  },
  {
    title: "Earn points",
    body: "Score for correct group positions, knockout winners, and the champion.",
  },
  {
    title: "Challenge friends",
    body: "Spin up a private league with an invite link and see who reads the tournament best.",
  },
  {
    title: "Share anywhere",
    body: "One tap to post your bracket and champion pick to X, WhatsApp or Telegram.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(215,160,40,.18), transparent 62%)",
          }}
        />
        <div className="mx-auto max-w-shell px-5 pb-10 pt-16 text-center sm:px-8 sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            World Cup 2026 · {FORMAT.window}
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-ink sm:text-7xl">
            Predict the 2026<br />tournament
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Pick all {FORMAT.teams} teams from the group stage to the final,
            climb the global leaderboard, and beat your friends in a private
            league.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
            <Check>No sign-up</Check>
            <Dot />
            <Check>No email</Check>
            <Dot />
            <Check>Done in 2 minutes</Check>
          </div>

          <div className="mt-9 flex justify-center">
            <ButtonLink href="/predict" variant="primary" size="lg" arrow>
              Create your bracket
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-shell px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-card border border-line bg-card p-6 shadow-soft"
            >
              <h3 className="text-base font-extrabold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* GROUPS PREVIEW */}
      <section className="mx-auto max-w-shell px-5 pt-20 sm:px-8">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-ink">
          All {FORMAT.groups} groups · {FORMAT.teams} teams
        </h2>
        <p className="mt-2 text-center text-sm text-muted">{FORMAT.advance}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GROUPS.map((g) => (
            <div
              key={g.id}
              className="rounded-card border border-line bg-card p-4 shadow-soft"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-ink font-display text-xs font-extrabold text-gold">
                  {g.id}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Group {g.id}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {g.teams.map((t) => (
                  <li key={t.code} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`fi fi-${t.code}`}
                      style={{ width: 20, height: 15 }}
                    />
                    <span className="text-ink-soft">{t.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/predict" variant="gold" size="lg" arrow>
            Start predicting
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-pitch">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

function Dot() {
  return <span aria-hidden className="hidden h-1 w-1 rounded-full bg-muted sm:block" />;
}
