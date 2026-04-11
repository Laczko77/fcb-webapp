---
name: Dashboard & News Section — Iteration 4.1
description: Dashboard page and NewsSection component patterns established in Iter 4.1; Supabase fetch, auth gate, badge component, card layout.
type: project
---

Dashboard page is at `src/app/(protected)/dashboard/page.tsx` — Server Component, auth-gated via `requireAuth()` which redirects to `/login` if unauthenticated.

NewsSection is at `src/components/dashboard/NewsSection.tsx` — async Server Component fetching from `news` table (columns: id, title, slug, category, published_at, image_url, excerpt), ordering by `published_at` DESC, limit 3.

Badge component was not pre-installed — created manually at `src/components/ui/badge.tsx` using CVA with variants: default (crimson), secondary (blue), accent (gold), muted (element), outline.

News cards use `aspect-[16/9]` image area with `next/image` fill, top-left accent corner square in crimson, `hero-mesh` fallback when no image. Category-to-badge-variant mapping is hardcoded in NewsSection.

Dashboard hero strip uses `hero-mesh` gradient overlay with user greeting in Bebas Neue font. Two placeholder cards added for future Meccsek and Közösség sections.

"Összes hír" link points to `/hirek`. Individual news articles link to `/hirek/[slug]`.

**Why:** Iter 4.1 scope — dashboard layout and news section as the first protected page.

**How to apply:** When adding new dashboard sections, follow the same pattern: section heading with left crimson bar + Bebas Neue font-headline text, suspense boundary with skeleton, consistent px-6 md:px-12 lg:px-20 padding.
