import type { Metadata } from "next";
import { POSTS } from "@/content/posts";
import { BlogList } from "@/components/blog/BlogList";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog — World Cup 2026 guides, stats & explainers",
  description:
    "Guides, data and explainers for the 2026 World Cup: the 48-team format, the groups, historical stats, records, and how to fill in your bracket.",
};

export default function BlogIndex() {
  const posts = POSTS.map(({ slug, title, description, date }) => ({ slug, title, description, date }));
  return (
    <div className="mx-auto max-w-shell px-5 pt-12 sm:px-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight text-ink sm:text-5xl">The blog</h1>
        <p className="mt-2 text-ink-soft">
          {posts.length} guides, explainers and stat dives on the 2026 World Cup.
        </p>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
