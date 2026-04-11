<!DOCTYPE html>

<html class="dark" lang="hu"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>BARCAPULSE | FC Barcelona Fan Platform</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&amp;family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&amp;family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&amp;family=Space+Grotesk:wght@300..700&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface-variant": "#e1bec3",
                    "surface-container-high": "#2a273f",
                    "surface-container-lowest": "#0e0b21",
                    "outline": "#a8898d",
                    "primary-container": "#a50044",
                    "secondary-container": "#004d98",
                    "on-tertiary-fixed": "#241a00",
                    "background": "#131027",
                    "on-secondary-fixed": "#001b3d",
                    "on-secondary-fixed-variant": "#00468b",
                    "secondary": "#a9c7ff",
                    "primary-fixed-dim": "#ffb2bf",
                    "on-secondary-container": "#9cc0ff",
                    "inverse-primary": "#b71850",
                    "on-error-container": "#ffdad6",
                    "surface-container-low": "#1c192f",
                    "on-error": "#690005",
                    "tertiary": "#f3c00e",
                    "on-primary-container": "#ffb0be",
                    "surface-tint": "#ffb2bf",
                    "primary": "#ffb2bf",
                    "on-tertiary": "#3d2e00",
                    "tertiary-fixed": "#ffdf90",
                    "outline-variant": "#594044",
                    "on-surface": "#e5defe",
                    "inverse-on-surface": "#312d46",
                    "surface": "#131027",
                    "on-background": "#e5defe",
                    "on-primary-fixed-variant": "#90003a",
                    "tertiary-fixed-dim": "#f3c00e",
                    "on-tertiary-fixed-variant": "#584400",
                    "surface-bright": "#3a364f",
                    "surface-dim": "#131027",
                    "on-tertiary-container": "#503d00",
                    "secondary-fixed": "#d6e3ff",
                    "surface-variant": "#35324a",
                    "primary-fixed": "#ffd9de",
                    "surface-container-highest": "#35324a",
                    "surface-container": "#201d34",
                    "tertiary-container": "#d2a600",
                    "secondary-fixed-dim": "#a9c7ff",
                    "on-primary": "#660027",
                    "error-container": "#93000a",
                    "inverse-surface": "#e5defe",
                    "on-secondary": "#003063",
                    "error": "#ffb4ab",
                    "on-primary-fixed": "#3f0015"
            },
            "borderRadius": {
                    "DEFAULT": "0px",
                    "lg": "0px",
                    "xl": "0px",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Bebas Neue", "sans-serif"],
                    "body": ["DM Sans", "sans-serif"],
                    "label": ["Space Mono", "monospace"]
            }
          },
        },
      }
    </script>
<style>.noise-overlay {
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuBEOghhn9HGu1eFLkIhADiJPwdLzRwkWRMNYUqv8Ug0TmcQZ5z1dvE20gzgbpJWSD6bhcLP3BwMdGYDGbIPNNrecHUs0QUBbYApjbsEzK7WwZ2PEO6K0Gd6SMXWMFnWKl5MxxJc_XrpOxpPnD2oCqou_j7gSxOvii1DSfVA8vod4Nko1Xz8kzF6Byh9Xik3BKR9xatkjsv4xjNZ9W_Md49yrerOcumM1Ky4uKe93-qQLPF2enlxf0NweDKb2VkUTX_vF9Xd8ksL1S4);
    opacity: 0.04;
    pointer-events: none
    }
.diagonal-slash {
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%)
    }
.diagonal-button {
    clip-path: polygon(0 0, 95% 0, 100% 100%, 0% 100%)
    }
.hero-mesh {
    background: radial-gradient(circle at 0% 0%, #004d98 0%, transparent 50%), radial-gradient(circle at 100% 100%, #a50044 0%, transparent 50%);
    opacity: 0.6
    }
.stats-clip {
    clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%)
    }
@keyframes marquee {
    0% {
        transform: translateX(0);
        } 100% {
        transform: translateX(-50%);
        }
    }
.animate-marquee {
    animation: marquee 30s linear infinite
    }</style>
</head>
<body class="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary">
<!-- Grain Overlay -->
<div class="fixed inset-0 z-[999] noise-overlay"></div>
<!-- TopNavBar -->
<nav class="fixed top-0 left-0 w-full h-[64px] bg-transparent border-b border-white/10 z-50 flex justify-between items-center px-8">
<div class="flex items-center gap-3">
<div class="w-2 h-6 bg-gradient-to-b from-[#A50044] to-[#004D98] -skew-x-12"></div>
<span class="text-[22px] font-black tracking-[4px] text-white font-headline">BARCAPULSE</span>
</div>
<div class="hidden md:flex items-center gap-8">
<div class="flex gap-6">
<a class="text-[#9B97B8] font-label uppercase text-xs tracking-tighter hover:text-white transition-colors duration-300" href="#">Match Center</a>
<a class="text-[#9B97B8] font-label uppercase text-xs tracking-tighter hover:text-white transition-colors duration-300" href="#">Squad</a>
<a class="text-[#9B97B8] font-label uppercase text-xs tracking-tighter hover:text-white transition-colors duration-300" href="#">Academy</a>
<a class="text-[#9B97B8] font-label uppercase text-xs tracking-tighter hover:text-white transition-colors duration-300" href="#">History</a>
</div>
<div class="flex items-center gap-6">
<a class="text-[#9B97B8] font-label text-xs hover:text-white transition-all" href="#">Bejelentkezés</a>
<a class="text-white font-headline tracking-widest text-sm relative group overflow-hidden" href="#">
                    Regisztráció →
                    <span class="absolute bottom-0 left-0 w-full h-[2px] bg-primary-container transform translate-y-1 group-hover:translate-y-0 transition-transform"></span>
</a>
</div>
</div>
</nav>
<!-- Hero Section -->
<header class="relative min-h-screen w-full flex items-center overflow-hidden pt-16">
<div class="absolute inset-0 hero-mesh z-0"></div>
<div class="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-10 gap-12">
<!-- Left Block -->
<div class="lg:col-span-6 flex flex-col justify-center">
<span class="font-label text-[11px] text-tertiary tracking-[0.2em] mb-4">FC BARCELONA · RAJONGÓI PLATFORM</span>
<h1 class="font-headline text-[80px] md:text-[120px] leading-[0.9] text-white mb-2">
                    BARÇA ÉL<br/>
<span class="ml-[80px] text-primary">BENNED</span>
</h1>
<p class="max-w-md text-[#9B97B8] text-lg mb-10 leading-relaxed">
                    A katalán óriás legfrissebb hírei, exkluzív elemzések és a globális Culé közösség egyetlen digitális szentélyben.
                </p>
<div class="flex flex-wrap gap-4">
<button class="h-[52px] px-10 bg-primary-container text-on-primary font-headline tracking-widest text-lg hover:brightness-110 transition-all active:scale-95">
                        Regisztrálj ingyen
                    </button>
<button class="h-[52px] px-10 border border-[#9B97B8] text-white font-headline tracking-widest text-lg hover:bg-white/5 transition-all active:scale-95">
                        Bejelentkezés
                    </button>
</div>
</div>
<!-- Right Block -->
<div class="lg:col-span-4 relative flex items-center justify-end">
<div class="absolute right-0 font-headline text-[200px] md:text-[300px] text-tertiary opacity-[0.08] pointer-events-none select-none -rotate-12 translate-x-20">
                    1899
                </div>
<div class="relative w-full aspect-[4/5] bg-surface-container overflow-hidden border border-white/5">
<img alt="Camp Nou stadium" class="w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity" data-alt="dramatic wide angle shot of Camp Nou stadium seats in Barcelona under deep blue twilight sky cinematic mood" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJIbITN3XU2gaHLmS-BnNYh8efh1Vet4waBTIUTBq9HvgA_h4JXhYJsBAvefAcmKWvGxHwx1XgsEuYORdlijj01XyTxhqY-g_EgzOGvoVqAw0JQ0qA8URV6Ne-0HFtT4ImPnQ_a4LwiiEIzd9JnTqeXWrjSq_5NoaebjjbhyABqS-B4Rvf8aWvs4uuKOEygsqIAgS_MIaYuqdsbXu6cxJj_3u0M9PnS6_9MJK4RFsPZGcu9SOOnzlg-dR_zhXzvYZkmAQoD5Z64I0"/>
<div class="absolute bottom-0 right-0 w-32 h-32 flex flex-col gap-2 p-4 justify-end items-end">
<div class="w-16 h-[1px] bg-primary rotate-[15deg]"></div>
<div class="w-12 h-[1px] bg-primary rotate-[15deg]"></div>
<div class="w-8 h-[1px] bg-primary rotate-[15deg]"></div>
</div>
</div>
</div>
</div>
</header>
<!-- Club Stats Ticker -->
<section class="relative z-20 w-full overflow-hidden bg-[#252240] stats-clip py-12 -mt-16">
<div class="flex whitespace-nowrap animate-marquee">
<div class="flex gap-8 items-center px-4">
<span class="font-headline text-2xl text-tertiary tracking-wider">1899 — ALAPÍTVA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">125+ TRÓFEA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">MÉS QUE UN CLUB ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">5× BAJNOKOK LIGÁJA ·</span>
<!-- Duplicate for seamless loop -->
<span class="font-headline text-2xl text-tertiary tracking-wider">1899 — ALAPÍTVA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">125+ TRÓFEA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">MÉS QUE UN CLUB ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">5× BAJNOKOK LIGÁJA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">1899 — ALAPÍTVA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">125+ TRÓFEA ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">MÉS QUE UN CLUB ·</span>
<span class="font-headline text-2xl text-tertiary tracking-wider">5× BAJNOKOK LIGÁJA ·</span>
</div>
</div>
</section>
<!-- Platform Intro -->
<section class="py-32 px-8 max-w-7xl mx-auto">
<div class="flex items-start gap-12 mb-20">
<div class="w-[2px] h-32 bg-primary-container"></div>
<h2 class="font-headline text-6xl md:text-8xl text-white ml-12">
                MIÉRT<br/>
<span class="text-tertiary">BARCAPULSE?</span>
</h2>
</div>
<!-- Feature Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<!-- Card 1 -->
<div class="group bg-[#252240] p-8 min-h-[320px] relative border border-white/5 -rotate-[0.5deg] hover:bg-surface-bright transition-all duration-300">
<div class="absolute top-0 right-0 w-6 h-6 bg-primary-container"></div>
<div class="mb-8">
<span class="material-symbols-outlined text-tertiary text-4xl" data-icon="sports_soccer" style="font-variation-settings: 'FILL' 1;">sports_soccer</span>
</div>
<h3 class="font-headline text-2xl text-white mb-4">ÉLŐ ELEMZÉS</h3>
<p class="text-[#9B97B8] text-sm leading-relaxed">Minden meccs részletes taktikai áttekintése valós időben, profi szakértőktől.</p>
</div>
<!-- Card 2 -->
<div class="group bg-[#252240] p-8 min-h-[320px] relative border border-white/5 rotate-[0.5deg] hover:bg-surface-bright transition-all duration-300">
<div class="absolute top-0 right-0 w-6 h-6 bg-primary-container"></div>
<div class="mb-8">
<span class="material-symbols-outlined text-tertiary text-4xl" data-icon="groups" style="font-variation-settings: 'FILL' 1;">groups</span>
</div>
<h3 class="font-headline text-2xl text-white mb-4">SQUAD HUB</h3>
<p class="text-[#9B97B8] text-sm leading-relaxed">Interaktív játékos adatbázis és fejlődési statisztikák a La Masiától a felnőtt csapatig.</p>
</div>
<!-- Card 3 -->
<div class="group bg-[#252240] p-8 min-h-[320px] relative border border-white/5 -rotate-[0.5deg] hover:bg-surface-bright transition-all duration-300">
<div class="absolute top-0 right-0 w-6 h-6 bg-primary-container"></div>
<div class="mb-8">
<span class="material-symbols-outlined text-tertiary text-4xl" data-icon="history_edu" style="font-variation-settings: 'FILL' 1;">history_edu</span>
</div>
<h3 class="font-headline text-2xl text-white mb-4">ARCHÍVUM</h3>
<p class="text-[#9B97B8] text-sm leading-relaxed">Merülj el a klub 125 éves történelmében exkluzív videókkal és történetekkel.</p>
</div>
<!-- Card 4 -->
<div class="group bg-[#252240] p-8 min-h-[320px] relative border border-white/5 rotate-[0.5deg] hover:bg-surface-bright transition-all duration-300">
<div class="absolute top-0 right-0 w-6 h-6 bg-primary-container"></div>
<div class="mb-8">
<span class="material-symbols-outlined text-tertiary text-4xl" data-icon="stadium" style="font-variation-settings: 'FILL' 1;">stadium</span>
</div>
<h3 class="font-headline text-2xl text-white mb-4">KÖZÖSSÉG</h3>
<p class="text-[#9B97B8] text-sm leading-relaxed">Csatlakozz a világ legnagyobb Culé közösségéhez és vitasd meg a legfrissebb eseményeket.</p>
</div>
</div>
</section>
<!-- CTA Banner -->
<section class="w-full bg-primary-container py-24 relative overflow-hidden group">
<div class="absolute inset-0 noise-overlay"></div>
<div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center relative z-10">
<div class="mb-12 md:mb-0">
<div class="w-32 h-[1px] bg-tertiary mb-6"></div>
<h2 class="font-headline text-6xl md:text-8xl text-white leading-none">
                    CSATLAKOZZ<br/>MÁR MA.
                </h2>
</div>
<a class="group flex items-center gap-4 text-white font-headline text-3xl tracking-widest hover:translate-x-4 transition-transform duration-300" href="#">
                Regisztrálj 
                <span class="material-symbols-outlined text-4xl">arrow_forward</span>
</a>
</div>
</section>
<!-- Footer -->
<footer class="bg-[#1D1A31] border-t border-white/5 py-12 px-12">
<div class="flex flex-col md:flex-row justify-between items-center gap-8">
<div class="flex items-center gap-6">
<span class="font-label text-xs uppercase tracking-widest text-[#F3C00E]">BARCAPULSE</span>
<div class="hidden md:flex gap-6">
<a class="text-[#9B97B8] text-[11px] font-label hover:text-white transition-all" href="#">Privacy Policy</a>
<a class="text-[#9B97B8] text-[11px] font-label hover:text-white transition-all" href="#">Terms of Service</a>
<a class="text-[#9B97B8] text-[11px] font-label hover:text-white transition-all" href="#">Club Partners</a>
</div>
</div>
<div class="text-right">
<p class="text-[11px] font-label text-[#9B97B8] uppercase tracking-wider mb-1">© 2024 BARCAPULSE. TOTS UNITS FEM FORÇA.</p>
<p class="text-[9px] font-label text-[#9B97B8]/40">NEM HIVATALOS SZURKOLÓI OLDAL. AZ FC BARCELONA LOGÓJA ÉS VÉDJEGYE A KLUB TULAJDONA.</p>
</div>
</div>
</footer>
</body></html>