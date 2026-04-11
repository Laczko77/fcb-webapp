const TICKER_ITEMS = [
  '1899 — ALAPÍTVA',
  '125+ TRÓFEA',
  'MÉS QUE UN CLUB',
  '5× BAJNOKOK LIGÁJA',
]

export default function StatsSection() {
  return (
    <section className="relative z-20 w-full overflow-hidden bg-[#252240] stats-clip py-12 -mt-16">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate for seamless loop — translateX(-50%) cycles one full group */}
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 gap-8 items-center px-4">
            {TICKER_ITEMS.map((item) => (
              <span
                key={`${group}-${item}`}
                className="font-headline text-2xl text-[#F3C00E] tracking-wider"
              >
                {item} ·
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
