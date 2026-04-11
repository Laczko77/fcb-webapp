---
name: Dashboard Match Section — Iteration 4.2
description: MatchSection async Server Component patterns, win/draw/loss logic, API fixture data shape usage, and dashboard page wiring decisions from Iter 4.2.
type: project
---

MatchSection lives at `src/components/dashboard/MatchSection.tsx` — async Server Component, no 'use client'.

Two independent try/catch blocks: one for `getUpcomingMatches(1)`, one for `getRecentMatches(3)`. Both degrade gracefully to empty arrays without throwing.

Win/draw/loss is computed via `getBarcaResult(fixture)` — checks `fixture.teams.home.id === BARCA_TEAM_ID (529)` to determine which `fixture.goals` side is Barca, then compares integers. Null goals default to 'draw'.

`hasTicket` prop on MatchSection (default false) gates the "JEGYET VENNI" CTA button. When false the button is entirely absent from the DOM — no placeholder.

NextMatchCard uses `hero-mesh opacity-20` overlay on `#1c192f` bg, crimson 1px left strip, blue corner square (same accent corners as NewsSection image overlays).

ResultCard: left-edge colored bar (green/yellow/red), Bebas Neue score in large text, Barca's score side is `text-white`, opponent side is `text-[#9B97B8]`. Three-column grid on sm+.

Dashboard page wiring: MatchSection replaces the "KÖVETKEZŐ MECCSEK" placeholder. Community placeholder kept as full-width standalone div (NOT in a grid — the two-col grid was removed). MatchSkeleton added alongside NewsSkeleton for Suspense fallback.

**Why:** Iter 4.2 spec required graceful degradation, hero next-match card, compact result cards, and "Összes meccs" link to /matches.

**How to apply:** When adding future dashboard sections, follow the same pattern: full-width section in the `flex flex-col gap-16` content column, wrapped in Suspense with a dedicated skeleton function, independent try/catch data fetching inside the async Server Component.
