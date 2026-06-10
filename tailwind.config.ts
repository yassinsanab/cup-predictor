import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Single source of truth = CSS variables in app/globals.css.
      // Tailwind classes resolve to var(--token) so re-theming touches one place.
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        paper: "var(--paper)",
        card: "var(--card)",
        gold: "var(--gold)",
        "gold-deep": "var(--gold-deep)",
        pitch: "var(--pitch)",
        "pitch-deep": "var(--pitch-deep)",
        "flag-red": "var(--flag-red)",
        "flag-blue": "var(--flag-blue)",
        line: "var(--line)",
        muted: "var(--muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        btn: "9px",
        card: "11px",
      },
      boxShadow: {
        // Two shadows, reused everywhere (token discipline)
        soft: "0 1px 2px rgba(14,14,16,.05), 0 1px 3px rgba(14,14,16,.04)",
        lift: "0 6px 16px rgba(15,122,78,.28), inset 0 1px 0 rgba(255,255,255,.18)",
        gold: "0 6px 16px rgba(215,160,40,.30), inset 0 1px 0 rgba(255,255,255,.35)",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
