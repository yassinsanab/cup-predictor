import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-[#9c9a94]">
      <div className="mx-auto max-w-shell px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-lg font-extrabold text-white">
              PlayMatch<span className="text-gold">Pool</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Build and share your full 2026 bracket — group order, the eight
              third-placed qualifiers, and every knockout tie. No sign-up, done
              in two minutes.
            </p>
            <a
              href="https://www.buymeacoffee.com/apoldi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-btn bg-gold px-4 py-2.5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
            >
              <CoffeeIcon /> Buy me a coffee
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link href="/predict" className="hover:text-white">Predict</Link>
            <Link href="/scores" className="hover:text-white">Scores</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </nav>
        </div>

        {/* Trademark guardrail — the line that keeps a takedown from killing momentum */}
        <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-[#76746e]">
          Independent fan project. Not affiliated with, endorsed by, or licensed
          by FIFA. &ldquo;FIFA&rdquo; and &ldquo;World Cup&rdquo; are trademarks
          of their respective owners; used here only to describe the tournament
          this tool covers. Team names and flags are used for identification.
        </p>
      </div>
    </footer>
  );
}

function CoffeeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}
