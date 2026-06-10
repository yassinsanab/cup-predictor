import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog — World Cup 2026 guides & explainers",
  description:
    "Guides and explainers for the 2026 World Cup: the new 48-team format, the Round of 32, the groups, and how to fill in your bracket.",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">The blog</h1>
      <p className="mt-2 text-ink-soft">Format explainers, the draw, and how to call the 2026 World Cup.</p>

      <div className="mt-8 space-y-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-card border border-line bg-card p-6 transition-colors hover:border-ink/25"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">{fmt(p.date)}</div>
            <h2 className="mt-1.5 font-display text-xl font-extrabold leading-snug text-ink">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-pitch-deep">Read →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
