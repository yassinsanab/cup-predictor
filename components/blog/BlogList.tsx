"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type PostMeta = { slug: string; title: string; description: string; date: string };

function tagFor(slug: string): "Stats" | "Explainer" | "2026" {
  if (
    /winners-list|most-titles|appearances|golden-boot|biggest-wins|host-nation|host-record|top-scorers|confederations-world-cup|teams-never-won|hosts-history|biggest-upsets|format-history|confederation-breakdown|by-the-numbers|group-strength/.test(
      slug
    )
  )
    return "Stats";
  if (/format-explained|third-placed|how-to-fill|tiebreakers|what-is-new|round-of-32-explained|how-many-matches/.test(slug))
    return "Explainer";
  return "2026";
}

const TAG_STYLE: Record<string, string> = {
  Stats: "bg-flag-blue/10 text-flag-blue",
  Explainer: "bg-pitch/12 text-pitch-deep",
  "2026": "bg-gold/15 text-gold-deep",
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function Chip({ tag }: { tag: string }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TAG_STYLE[tag]}`}>
      {tag}
    </span>
  );
}

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const sorted = useMemo(() => [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date)), [posts]);
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const tags = useMemo(() => ["All", ...Array.from(new Set(rest.map((p) => tagFor(p.slug))))], [rest]);
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? rest : rest.filter((p) => tagFor(p.slug) === filter);

  return (
    <div>
      {/* Featured */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group block overflow-hidden rounded-card border border-line bg-ink p-7 text-paper transition-transform hover:-translate-y-0.5 sm:p-9"
      >
        <div className="flex items-center gap-3">
          <span className="kicker text-[11px] text-gold">Latest</span>
          <Chip tag={tagFor(featured.slug)} />
        </div>
        <h2 className="font-display mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
          {featured.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">{featured.description}</p>
        <span className="mt-5 inline-block font-display text-sm font-extrabold uppercase tracking-wide text-gold">
          Read →
        </span>
      </Link>

      {/* Filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === t ? "border-ink bg-ink text-white" : "border-line bg-card text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {shown.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-card border border-line bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-ink/25"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
              <Chip tag={tagFor(p.slug)} />
              <span>{fmt(p.date)}</span>
            </div>
            <h3 className="font-display mt-3 text-xl font-extrabold leading-snug text-ink group-hover:text-pitch-deep">
              {p.title}
            </h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">{p.description}</p>
            <span className="mt-3 text-sm font-semibold text-pitch-deep">Read →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
