---
name: Dashboard Standings & Players — Iteration 4.3
description: StandingsSection and PlayersSection components added to dashboard in Iter 4.3; API sources, design patterns, and wiring approach.
type: project
---

StandingsSection and PlayersSection are both async Server Components added to the dashboard in Iteration 4.3.

**StandingsSection** (`src/components/dashboard/StandingsSection.tsx`):
- Calls `getBarcaStanding()` from `src/lib/api-football/matches.ts`
- Returns `ApiStanding | null` — single Barcelona La Liga row
- Layout: large rank number (text-8xl/9xl), team logo, form pips (W/D/L colored squares from `standing.form` string), StatBox grid (points, win, draw, lose, goalsDiff, played)
- Crimson left accent bar + blue corner square (matches MatchSection NextMatchCard pattern)
- No "view all" link (there is no /standings route yet)

**PlayersSection** (`src/components/dashboard/PlayersSection.tsx`):
- Calls `getTopScorers(3)` from `src/lib/api-football/players.ts`
- Returns La Liga top scorers league-wide (not Barcelona-specific)
- Card: aspect-[4/3] photo with object-top crop and bottom gradient overlay, goals in crimson (text-[#A50044] font-headline text-5xl), assists in blue (text-[#004D98])
- "Összes játékos" link → `/players` (right-aligned in header + mobile footer link)
- Fallback: `<User>` icon centered in bg-[#1c192f] if no photo

**Dashboard page wiring** (`src/app/(protected)/dashboard/page.tsx`):
- Both sections added after MatchSection, before Community placeholder
- Each wrapped in `<Suspense>` with matching animate-pulse skeleton
- Skeleton for StandingsSection: full-width h-36 block
- Skeleton for PlayersSection: 3-col grid with aspect-[4/3] blocks

**Why:** Iter 4.3 backlog — tabella + játékos szekció on dashboard.
**How to apply:** When building /standings or /players routes, reuse the StatBox component pattern and FormPips sub-component from StandingsSection. PlayerCard pattern applies to any player listing page.
