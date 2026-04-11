---
name: BarcaPulse Design System Tokens
description: Official color palette, typography stack, and layout conventions for BarcaPulse — updated to Iteration 2 design system
type: project
---

Core design tokens from docs/design.md (the single source of truth as of Iteration 2):

**Colors (CSS vars)**
- `--bg-base`: `#1D1A31` — page backgrounds, navbar, footer
- `--bg-card`: `#252240` — card/modal surfaces
- `--bg-element`: `#2E2B4A` — input fields, inner elements
- `--border`: `rgba(255,255,255,0.07)` → Tailwind: `border-white/[0.07]`
- `--fcb-blue`: `#004D98`
- `--fcb-crimson`: `#A50044`
- `--fcb-gold`: `#EDBB00`
- `--text-primary`: `#F5F0FF`
- `--text-secondary`: `#9B97B8`

**Typography (STRICT — no exceptions)**
- Bebas Neue → `font-['Bebas_Neue',sans-serif]` — h1/h2/display, logo, large numbers
- DM Sans → `font-['DM_Sans',sans-serif]` — body text, UI labels, nav links, buttons
- Space Mono → `font-['Space_Mono',monospace]` — small uppercase labels, stats, metadata, form labels
- FORBIDDEN: Inter, Roboto, Arial, system-ui, Oswald, Space Grotesk

**Visual patterns**
- Top accent bar: `h-0.5 bg-gradient-to-r from-[#A50044] via-[#EDBB00] to-[#004D98]` (gold in center)
- Backdrop sticky: `bg-[#1D1A31]/95 backdrop-blur-md`
- Card surface: `bg-[#252240] border border-white/[0.07] rounded-xl`
- Input fields: `bg-[#2E2B4A] border-white/[0.07]` focus: `border-[#A50044]/60`
- Admin badge: `text-[#EDBB00]` gold color
- Guest nav: Regisztráció → `bg-[#A50044]`; Bejelentkezés → outline with `border-white/[0.07]`
- Login success banner: `bg-[#EDBB00]/10 border-[#EDBB00]/30 text-[#EDBB00]`
- Error banner: `bg-[#A50044]/10 border-[#A50044]/30 text-[#F5F0FF]`

**Layout**
- Navbar: fixed, `h-16` + `h-0.5` accent bar = 65px total. `<main>` offset: `pt-[65px]`
- Auth pages: asymmetric — `items-start pt-20 pl-8 sm:pl-16 lg:pl-32 lg:justify-start` (left-aligned); mobile remains centered
- Max content width: `max-w-7xl mx-auto`
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Design aesthetic: luxury sports editorial — brutalist precision, left-aligned, not centered

**Aesthetic requirements**
- Noise grain texture on every page/section
- Asymmetric, left-aligned editorial layout
- Animations expected

**Why:** docs/design.md was updated in Iteration 2 to establish a premium editorial aesthetic replacing the generic dark theme from Iteration 1.
**How to apply:** All future components must use these exact tokens. Never use #0A0A0F (old bg), Oswald (old font), or emerald/red for banners.
