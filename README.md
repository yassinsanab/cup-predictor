# Cup Predictor '26 — frontend core

A World Cup 2026 bracket predictor. Next.js 14 (App Router) · TypeScript · Tailwind.
Design system is tokenized and IP-safe (see notes). Built mobile-first.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fetches + self-hosts the display font once)
```

> The display font (Archivo) is loaded via `next/font`, which **self-hosts it at
> build time** — there is no runtime CDN call (matches the no-external-CDN-fonts
> preference). The font is fetched from Google Fonts *during the build only*, so
> the build machine needs internet access for that one step.

## How it's structured

```
app/
  globals.css        # ← all design tokens live here (single source of truth)
  layout.tsx         # font + metadata/OG + header/footer
  page.tsx           # landing: hero, features, all-12-groups preview
  predict/page.tsx   # the predictor (group stage live; knockout = next)
components/
  ui/Button.tsx           # the locked button spec (primary/gold/ghost/dark)
  site/Header.tsx,Footer.tsx
  predictor/GroupStage.tsx# client: ranking state, progress, shuffle, persistence
  predictor/GroupCard.tsx # one group, reorder + advancement coding
lib/teams.ts         # confirmed 48-team draw + format facts
tailwind.config.ts   # maps tokens -> utility classes
```

### Design-token discipline (why it won't read as vibe-coded)
- Every colour is a CSS variable in `globals.css`. **No hard-coded hex anywhere
  else.** Change a token, the whole site re-themes. (Taxonomy: surface → text →
  border → accent → semantic.)
- One characterful display face (Archivo) for headings/numerals; system stack for
  body (fast, no extra payload).
- Tabular numerals on globally — scoreboards/leaderboards never jitter.
- Two reused shadows, one radius scale. `prefers-reduced-motion` respected.
- Flags via `flag-icons` SVGs (consistent everywhere), not emoji.

### IP posture (do not skip)
- Wordmark is **"Cup Predictor '26"** with an original trophy glyph — **not** the
  official emblem, **not** the word "FIFA".
- "World Cup 2026" appears only **descriptively** (nominative use) in copy/meta.
- Footer carries the **not-affiliated-with-FIFA** disclaimer. Keep it.

---

## ✅ Built in this core
- Landing page (hero, feature cards, 12-group preview, CTAs)
- Interactive **group-stage predictor**: rank all 4 teams in 12 groups, advancement
  colour-coding (1st/2nd/3rd-maybe/4th-out), progress, shuffle, reset
- **On-device persistence** (localStorage) so picks survive refresh
- Button system, header, footer, tokenized theme
- Accurate 48-team data (final confirmed draw)

## 🔜 NOT built yet — the remember-me list (in priority order)
1. **Knockout bracket builder** — the other half of `/predict`: R32 → final,
   including the *8-best-third-place* seeding logic. (Toggle is stubbed.)
2. **Share-image generator** *(growth engine — do this first after knockouts)* —
   per-bracket OG/PNG via `next/og`, wired to X / WhatsApp / Telegram buttons.
3. **Backend (Supabase)** — accounts-light identity (name + cookie), private
   **leagues** with invite codes, global **leaderboard**.
4. **Scoring engine + results sync** — score predictions against real results;
   daily Vercel cron pulling openfootball/worldcup.json (or BALLDONTLIE for live).
5. **Stub pages** currently in nav: `/leaderboard`, `/leagues`, `/stats`,
   `/about`, `/privacy` — routes don't exist yet.
6. **i18n** — DE + AR locales (the niche-audience play).
7. **Custom favicon + dynamic OG image**, GA4 analytics.

Stack target for the above: Supabase (Postgres + light auth), Vercel cron,
`next/og`. Lock predictions server-side by kickoff time when the backend lands.
