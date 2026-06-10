import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/content/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.description };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-5 pt-10 sm:px-8">
      <Link href="/blog" className="text-sm font-semibold text-muted hover:text-ink">
        ← All posts
      </Link>
      <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">{fmt(post.date)}</div>
      <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-7 space-y-5">
        {post.body.map((b, i) => {
          if (b.t === "h2")
            return (
              <h2 key={i} className="font-display text-xl font-extrabold text-ink">
                {b.text}
              </h2>
            );
          if (b.t === "ul")
            return (
              <ul key={i} className="space-y-1.5 pl-5">
                {b.items.map((it, j) => (
                  <li key={j} className="list-disc text-[15px] leading-relaxed text-ink-soft">
                    {it}
                  </li>
                ))}
              </ul>
            );
          return (
            <p key={i} className="text-[15px] leading-relaxed text-ink-soft">
              {b.text}
            </p>
          );
        })}
      </div>

      <div className="mt-10 rounded-card border border-line bg-card p-6 text-center">
        <div className="font-display text-lg font-extrabold text-ink">Think you can call it?</div>
        <p className="mt-1 text-sm text-ink-soft">Fill in your full 2026 bracket and share it.</p>
        <Link
          href="/predict"
          className="mt-4 inline-block rounded-btn bg-pitch px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Build your bracket
        </Link>
      </div>
    </article>
  );
}
