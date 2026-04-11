```
BRAND: BarcaPulse
AESTHETIC: Luxury sports editorial — brutalist precision meets premium football magazine
TECH STACK: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
CSS VARIABLES (globals.css-be):
  --bg-base: #1D1A31
  --bg-card: #252240
  --bg-element: #2E2B4A
  --border: rgba(255,255,255,0.07)
  --fcb-blue: #004D98
  --fcb-crimson: #A50044
  --fcb-gold: #EDBB00
  --text-primary: #F5F0FF
  --text-secondary: #9B97B8
TYPOGRAPHY (Google Fonts + next/font):
  - Bebas Neue → minden h1/h2/display/nagy szám
  - DM Sans → body text, UI labels, leírások
  - Space Mono → kis uppercase labelek, statisztikák, metaadatok
FORBIDDEN: Inter, Roboto, Arial, system-ui, Space Grotesk
DESIGN RULES:
  - border-radius: 0px MINDENHOL (gombok, kártyák, inputok)
  - Noise grain texture overlay: minden section/page-en (svg feTurbulence vagy CSS)
  - Aszimmetrikus layoutok: ne centeren, hanem left-aligned editorial
  - Animáció: staggered reveal belépéskor + hover glow hatások
  
```