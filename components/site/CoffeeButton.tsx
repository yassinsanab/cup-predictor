"use client";

import { track } from "@/lib/analytics";

export function CoffeeButton({ source = "footer" }: { source?: string }) {
  return (
    <a
      href="https://www.buymeacoffee.com/apoldi"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("buy_coffee_click", { source })}
      className="mt-5 inline-flex items-center gap-2 rounded-btn bg-gold px-4 py-2.5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
      Buy me a coffee
    </a>
  );
}
