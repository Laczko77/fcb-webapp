<!DOCTYPE html>

<html class="dark" lang="hu"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&amp;family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&amp;family=Space+Mono:wght@400;700&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "error-container": "#93000a",
                    "on-secondary-container": "#9cc0ff",
                    "on-primary-fixed-variant": "#90003a",
                    "on-secondary-fixed": "#001b3d",
                    "on-tertiary-fixed-variant": "#584400",
                    "on-secondary-fixed-variant": "#00468b",
                    "secondary-fixed": "#d6e3ff",
                    "secondary-container": "#004d98",
                    "primary-container": "#a50044",
                    "on-primary-container": "#ffb0be",
                    "on-primary": "#660027",
                    "on-surface-variant": "#e1bec3",
                    "surface-container-lowest": "#0e0b21",
                    "secondary-fixed-dim": "#a9c7ff",
                    "background": "#131027",
                    "primary-fixed": "#ffd9de",
                    "primary": "#ffb2bf",
                    "on-background": "#e5defe",
                    "on-error-container": "#ffdad6",
                    "surface-container-low": "#1c192f",
                    "surface-bright": "#3a364f",
                    "on-error": "#690005",
                    "primary-fixed-dim": "#ffb2bf",
                    "surface-container": "#201d34",
                    "tertiary": "#f3c00e",
                    "surface-container-highest": "#35324a",
                    "outline-variant": "#594044",
                    "tertiary-container": "#d2a600",
                    "secondary": "#a9c7ff",
                    "on-secondary": "#003063",
                    "on-tertiary-container": "#503d00",
                    "tertiary-fixed": "#ffdf90",
                    "on-tertiary": "#3d2e00",
                    "on-primary-fixed": "#3f0015",
                    "inverse-surface": "#e5defe",
                    "surface-container-high": "#2a273f",
                    "outline": "#a8898d",
                    "tertiary-fixed-dim": "#f3c00e",
                    "on-surface": "#e5defe",
                    "on-tertiary-fixed": "#241a00",
                    "inverse-on-surface": "#312d46",
                    "surface": "#131027",
                    "error": "#ffb4ab",
                    "surface-tint": "#ffb2bf",
                    "surface-dim": "#131027",
                    "inverse-primary": "#b71850",
                    "surface-variant": "#35324a"
            },
            "borderRadius": {
                    "DEFAULT": "0px",
                    "lg": "0px",
                    "xl": "0px",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Bebas Neue"],
                    "body": ["DM Sans"],
                    "label": ["Space Mono"]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'DM Sans', sans-serif; }
        .bebas { font-family: 'Bebas Neue', cursive; }
        .mono { font-family: 'Space Mono', monospace; }
        
        .noise-grain {
            position: relative;
        }
        .noise-grain::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: url("https://www.transparenttextures.com/patterns/stardust.png");
            opacity: 0.04;
            pointer-events: none;
            z-index: 50;
        }

        .diagonal-text {
            transform: rotate(-15deg) scale(1.2);
            white-space: nowrap;
        }

        .crimson-slash {
            clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
        }

        .btn-slash {
            clip-path: polygon(0 0, 100% 0, 92% 100%, 0% 100%);
        }

        input:focus {
            outline: none;
            box-shadow: none;
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex overflow-hidden noise-grain">
<!-- LEFT PANEL: DECORATIVE (45%) -->
<aside class="hidden lg:flex w-[45%] h-screen bg-[#252240] relative overflow-hidden flex-col justify-center items-center">
<!-- Giant Background Text -->
<div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none">
<span class="bebas text-[160px] text-tertiary diagonal-text tracking-tighter leading-none">
                BARCA BARCA BARCA BARCA
            </span>
</div>
<!-- Crimson Decorative Element -->
<div class="relative z-10 flex flex-col items-start gap-4">
<div class="flex gap-1.5 h-16">
<div class="w-1.5 h-full bg-primary-container"></div>
<div class="w-1.5 h-3/4 bg-primary-container/60"></div>
<div class="w-1.5 h-1/2 bg-primary-container/30"></div>
</div>
<div class="bebas text-5xl tracking-[8px] text-primary select-none">BARCAPULSE</div>
<div class="mono text-[10px] uppercase tracking-[4px] text-secondary opacity-50">MÉS QUE UN CLUB • EST. 1899</div>
</div>
<!-- Subliminal Image Overlay -->
<div class="absolute bottom-0 right-0 w-full h-1/3 opacity-20 mix-blend-overlay grayscale">
<img alt="stadium crowd" class="w-full h-full object-cover" data-alt="atmospheric wide shot of stadium lights piercing through evening haze with crowd silhouettes in blue and red tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdwAFDBt7M-OY25sQiOxAvdwtsaJsetgVuw3fHNv3eZgGsOC84j4ObChc4frbWEsP90wbhA3IM9GNk4yCwNeiICceoLkMrIVFj6raz5Ft0kZIpgKcx_9RshjWmpUQzd4EVwJ7AWylZxwDcCEOBKn2L9laqyhS1BdDJ9icGH6qawSQjE-vOD56SW25XCwaKbxdsFH31pQ1TRPbTZ3A9n6D19KCM-WKs2Re8gqZNenaI9ePL0XyKsjFlTpcoDTAfYCKj_ZJoH8JNbeM"/>
</div>
</aside>
<!-- RIGHT PANEL: LOGIN FORM (55%) -->
<main class="w-full lg:w-[55%] h-screen bg-[#1D1A31] flex flex-col px-8 md:px-24 py-12 relative overflow-y-auto">
<!-- Header Branding (Mobile/Small Desktop) -->
<header class="mb-24">
<div class="bebas text-sm tracking-[6px] text-tertiary">BARCAPULSE</div>
</header>
<!-- Form Container -->
<section class="max-w-[480px] w-full flex flex-col gap-8">
<div class="flex flex-col gap-4">
<h1 class="bebas text-5xl md:text-7xl text-[#F5F0FF] leading-none">Bejelentkezés</h1>
<div class="w-10 h-[1px] bg-tertiary"></div>
</div>
<form action="#" class="mt-8 flex flex-col gap-10">
<!-- Email Field -->
<div class="group flex flex-col gap-2">
<label class="mono text-[11px] uppercase tracking-widest text-outline" for="email">Email cím</label>
<input class="bg-[#2E2B4A] border-0 border-b border-secondary-container text-white px-0 py-4 focus:border-tertiary transition-colors duration-300 placeholder-white/10" id="email" name="email" placeholder="user@example.com" type="email"/>
</div>
<!-- Password Field -->
<div class="group flex flex-col gap-2">
<div class="flex justify-between items-end">
<label class="mono text-[11px] uppercase tracking-widest text-outline" for="password">Jelszó</label>
<a class="mono text-[10px] text-tertiary hover:text-white transition-colors uppercase tracking-tighter" href="#">Elfelejtetted?</a>
</div>
<input class="bg-[#2E2B4A] border-0 border-b border-secondary-container text-white px-0 py-4 focus:border-tertiary transition-colors duration-300 placeholder-white/10" id="password" name="password" placeholder="••••••••" type="password"/>
</div>
<!-- Submit Action -->
<div class="mt-4 flex flex-col gap-6">
<button class="bg-primary-container text-on-primary bebas text-xl tracking-[4px] py-5 px-12 w-full text-left btn-slash hover:bg-primary transition-all duration-300 active:scale-[0.98]" type="submit">
                        BEJELENTKEZÉS
                    </button>
<p class="mono text-xs text-on-surface-variant flex items-center gap-2">
                        Még nincs fiókod? 
                        <a class="text-tertiary hover:underline flex items-center" href="#">
                            REGISZTRÁLJ <span class="material-symbols-outlined text-sm ml-1">arrow_forward</span>
</a>
</p>
</div>
</form>
</section>
<!-- Dynamic Data Footer -->
<footer class="mt-auto pt-12 flex flex-col md:flex-row justify-between items-center opacity-40">
<div class="flex gap-8 mb-4 md:mb-0">
<div class="flex flex-col">
<span class="mono text-[9px] uppercase tracking-widest">Szezon</span>
<span class="bebas text-lg">2023/24</span>
</div>
<div class="flex flex-col">
<span class="mono text-[9px] uppercase tracking-widest">Közösség</span>
<span class="bebas text-lg">400M+</span>
</div>
</div>
<div class="mono text-[9px] tracking-widest uppercase">
                © 2024 Barcapulse • Visca el Barça
            </div>
</footer>
<!-- Diagonal Texture Detail -->
<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-tertiary/10 to-transparent pointer-events-none"></div>
</main>
<!-- Noise Texture Overlay (Global) -->
<div class="fixed inset-0 pointer-events-none z-[100] bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-[0.03]"></div>
</body></html>