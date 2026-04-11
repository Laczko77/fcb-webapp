---
name: BarcaPulse Design System Tokens
description: Established color palette, typography, and layout conventions for the BarcaPulse webapp
type: project
---

Core design tokens established in Iteration 1 (Navbar + Footer):

**Colors**
- Background: `#0A0A0F` (near-black, used on body, navbar, footer)
- Primary brand: `#A50044` (FC Barcelona crimson/blaugrana)
- Secondary brand: `#004D98` (FC Barcelona blue)
- Text primary: `white`
- Text muted: `white/70`, `white/60`, `white/40`
- Hover crimson: `#c20050`

**Typography**
- Display/logo font: `Oswald` (Google Fonts) — bold, condensed, athletic — used as `font-['Oswald',sans-serif]` in Tailwind; CSS variable `--font-display`
- Body font: `Inter` (Google Fonts) — CSS variable `--font-sans`

**Layout**
- Navbar: fixed top, height 64px, + 1px accent bar = 65px total. `<main>` offset: `pt-[65px]`
- Max content width: `max-w-7xl mx-auto`
- Horizontal padding: `px-4 sm:px-6 lg:px-8`

**Visual patterns**
- Top accent bar: `h-0.5 bg-gradient-to-r from-[#A50044] via-[#004D98] to-[#A50044]`
- Brand logo: small `Shield` icon in `bg-gradient-to-br from-[#A50044] to-[#004D98]` square
- Interactive focus ring: `focus-visible:ring-2 focus-visible:ring-[#A50044]`
- Nav link hover: `after:` pseudo-element underline slide-in from left (`scale-x-0` → `scale-x-100`)
- Backdrop: `bg-[#0A0A0F]/95 backdrop-blur-md` on sticky elements

**Why:** These tokens were locked in at project start to ensure all future pages feel cohesive.
**How to apply:** Any new page or component should pull from this palette. Avoid introducing new background grays or accent colors without aligning to these tokens.
