import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "PlayMatchPool is a free, no-sign-up tool to predict the 2026 World Cup — rank the groups, fill the bracket, and share it.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">About</h1>

      <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-ink-soft">
        <p>
          PlayMatchPool is a free tool for calling the 2026 World Cup before it
          happens. Rank all 12 groups, choose the eight best third-placed teams, then play
          out every knockout tie to the final — and export a clean image of your whole
          bracket to share.
        </p>
        <p>
          It follows the real tournament format: 48 teams, 12 groups of four, the top two
          plus the eight best third-placed teams advancing to a new Round of 32, and the
          official FIFA allocation table that decides which third-placed team meets which
          group winner. If you&apos;re new to the format, the{" "}
          <Link href="/blog" className="font-semibold text-pitch-deep hover:underline">blog</Link>{" "}
          explains it.
        </p>
        <p>
          There&apos;s no sign-up and no account. Your predictions are saved in your own
          browser, so you can come back and adjust them until kickoff. Follow results on
          the{" "}
          <Link href="/scores" className="font-semibold text-pitch-deep hover:underline">scores</Link>{" "}
          page as the tournament unfolds.
        </p>
        <p className="text-sm text-muted">
          Independent fan project. Not affiliated with, endorsed by, or licensed by FIFA.
          &ldquo;FIFA&rdquo; and &ldquo;World Cup&rdquo; are trademarks of their respective
          owners; used here only to describe the tournament this tool covers.
        </p>
      </div>

      <Link
        href="/predict"
        className="mt-9 inline-block rounded-btn bg-pitch px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        Build your bracket
      </Link>
    </div>
  );
}
