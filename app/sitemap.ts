import type { MetadataRoute } from "next";
import { POSTS } from "@/content/posts";

const BASE = "https://www.playmatchpool.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; freq: "daily" | "weekly"; priority: number }[] = [
    { path: "", freq: "daily", priority: 1 },
    { path: "/predict", freq: "weekly", priority: 0.9 },
    { path: "/scores", freq: "daily", priority: 0.8 },
    { path: "/blog", freq: "weekly", priority: 0.7 },
    { path: "/about", freq: "weekly", priority: 0.4 },
    { path: "/privacy", freq: "weekly", priority: 0.3 },
  ];
  return [
    ...pages.map((p) => ({
      url: `${BASE}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...POSTS.map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
