---
name: Dashboard Trophies & Poll — Iteration 4.4
description: TrophiesSection (static 4-block layout) and PollSection (Supabase polls table, active poll CTA or empty state), wired into dashboard page replacing Community placeholder
type: project
---

TrophiesSection is a pure static Server Component — no Suspense needed. Renders a `#252240` panel with left crimson accent + gold corner square, 2-col mobile / 4-col desktop grid of trophy blocks. Count numbers use per-entry accent color: gold for La Liga/Supercopa, crimson for Copa del Rey, blue for BL. Data: La Liga 27, Copa del Rey 31, BL 5, Supercopa 15.

PollSection is an async Server Component wrapped in Suspense in the dashboard page. Fetches `polls` table with `is_active=true`, `order created_at desc`, `limit 1`, `.single()`. Returns null on error (full try/catch). Active state: `#252240` card with left crimson bar + blue corner square, Vote icon, headline question uppercased, btn-slash CTA button linking to `/community/polls`. Empty state: `border-white/10 bg-[#1c192f]` container with Vote icon + "Hamarosan új szavazás" label.

Both sections appended after PlayersSection in dashboard page, replacing the old Community placeholder block.

**Why:** Iter 4.4 backlog — add trophy showcase and community poll preview to dashboard.

**How to apply:** If poll schema changes (e.g. adding options), PollSection only needs to extend the select query — the display layer is already decoupled.
