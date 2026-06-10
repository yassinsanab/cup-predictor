import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-[#9c9a94]">
      <div className="mx-auto max-w-shell px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-lg font-extrabold text-white">
              Cup Predictor<span className="text-gold">&apos;26</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Build your bracket for the 2026 tournament, compete on the
              leaderboard, and challenge friends in private leagues. No sign-up,
              done in two minutes.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <Link href="/predict" className="hover:text-white">Predict</Link>
            <Link href="/leaderboard" className="hover:text-white">Leaderboard</Link>
            <Link href="/leagues" className="hover:text-white">Leagues</Link>
            <Link href="/stats" className="hover:text-white">Stats</Link>
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
