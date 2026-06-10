import Link from "next/link";

const nav = [
  { label: "Predict", href: "/predict" },
  { label: "Scores", href: "/scores" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* IP-safe wordmark: an original trophy glyph, not the official emblem */}
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-[9px] bg-ink text-gold transition-transform group-hover:-rotate-6"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 4h10v3a5 5 0 0 1-10 0V4Z M7 5H4a3 3 0 0 0 3 3 M17 5h3a3 3 0 0 1-3 3 M10 12h4l-.5 4h-3L10 12Z M8 20h8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            Cup&nbsp;Predictor<span className="text-gold">&apos;26</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="kicker text-[11px] text-ink-soft transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/predict"
          className="rounded-btn bg-pitch px-4 py-2 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Start
        </Link>
      </div>
    </header>
  );
}
