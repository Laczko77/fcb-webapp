import Link from 'next/link'

export default function Hero() {
  return (
    <header className="relative min-h-screen w-full flex items-center overflow-hidden pt-16">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 hero-mesh z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-10 gap-12">
        {/* Left block — editorial text */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <span className="font-label text-[11px] text-[#F3C00E] tracking-[0.2em] mb-4">
            FC BARCELONA · RAJONGÓI PLATFORM
          </span>

          <h1 className="font-headline text-[80px] md:text-[120px] leading-[0.9] text-white mb-2">
            BARÇA ÉL
            <br />
            <span className="ml-[80px] text-[#ffb2bf]">BENNED</span>
          </h1>

          <p className="max-w-md text-[#9B97B8] text-lg mb-10 leading-relaxed">
            A katalán óriás legfrissebb hírei, exkluzív elemzések és a globális
            Culé közösség egyetlen digitális szentélyben.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/register"
              className="h-[52px] px-10 bg-[#A50044] text-white font-headline tracking-widest text-lg flex items-center hover:brightness-110 transition-all active:scale-95 btn-slash"
            >
              Regisztrálj ingyen
            </Link>
            <Link
              href="/login"
              className="h-[52px] px-10 border border-[#9B97B8] text-white font-headline tracking-widest text-lg flex items-center hover:bg-white/5 transition-all active:scale-95"
            >
              Bejelentkezés
            </Link>
          </div>
        </div>

        {/* Right block — decorative */}
        <div className="lg:col-span-4 relative flex items-center justify-end">
          {/* Ghost year */}
          <div className="absolute right-0 font-headline text-[200px] md:text-[300px] text-[#F3C00E] opacity-[0.08] pointer-events-none select-none -rotate-12 translate-x-20">
            1899
          </div>
        </div>
      </div>
    </header>
  )
}
