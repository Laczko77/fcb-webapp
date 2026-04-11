---
name: BarcaPulse Design System
description: CSS tokens, typography setup, and global styling conventions for the BarcaPulse design system
type: project
---

## CSS Custom Properties (globals.css :root)

```
--bg-base: #1D1A31        — page background
--bg-card: #252240        — card/panel background
--bg-element: #2E2B4A     — interactive element background
--border: rgba(255,255,255,0.07)
--fcb-blue: #004D98
--fcb-crimson: #A50044
--fcb-gold: #EDBB00
--text-primary: #F5F0FF
--text-secondary: #9B97B8
```

All shadcn/ui tokens (`--background`, `--card`, `--primary`, etc.) are remapped to the BarcaPulse palette. `.dark` mirrors `:root` exactly — the app is always dark.

## Typography

Loaded via `next/font/google` in `src/app/layout.tsx`:

| Font | CSS Variable | Usage |
|---|---|---|
| Bebas Neue (weight: 400) | `--font-display` | h1, h2, display, large numbers |
| DM Sans (400/500/600) | `--font-body` | body text, UI labels, descriptions |
| Space Mono (400/700) | `--font-mono` | small uppercase labels, stats, metadata |

FORBIDDEN fonts: Inter, Roboto, Arial, system-ui, Oswald, Space Grotesk

## Noise Grain Overlay

Applied globally as `body::before` in `globals.css`:
- `position: fixed; inset: 0; z-index: 9999; pointer-events: none; opacity: 0.04`
- SVG feTurbulence fractalNoise data URL, 200x200px tile, repeated

**Why:** Design system requires noise grain texture on every page/section for the "luxury sports editorial" aesthetic.

**How to apply:** Already global — no per-component action needed. Components should not fight z-index 9999 unless they are modals/overlays (which should use z-index above 9999 if they need to appear above the grain).
