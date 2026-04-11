import { Trophy } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type TrophyEntry = {
  competition: string
  label: string
  count: number
  accent: 'gold' | 'crimson' | 'blue'
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const TROPHIES: TrophyEntry[] = [
  { competition: 'La Liga', label: 'Bajnoki cím', count: 27, accent: 'gold' },
  { competition: 'Copa del Rey', label: 'Királykupa', count: 31, accent: 'crimson' },
  { competition: 'Bajnokok Ligája', label: 'BL győzelem', count: 5, accent: 'blue' },
  { competition: 'Supercopa', label: 'Szuperkupa', count: 15, accent: 'gold' },
]

const ACCENT_CLASSES: Record<TrophyEntry['accent'], string> = {
  gold: 'text-[#F3C00E]',
  crimson: 'text-[#A50044]',
  blue: 'text-[#004D98]',
}

const DIVIDER_ACCENT: Record<TrophyEntry['accent'], string> = {
  gold: 'bg-[#F3C00E]',
  crimson: 'bg-[#A50044]',
  blue: 'bg-[#004D98]',
}

// ─── Trophy Block ─────────────────────────────────────────────────────────────

function TrophyBlock({ entry, isLast }: { entry: TrophyEntry; isLast: boolean }) {
  return (
    <div className="flex items-stretch flex-1 min-w-0">
      {/* Block content */}
      <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 flex-1 group relative overflow-hidden transition-colors duration-300 hover:bg-[#2E2B4A]">
        {/* Subtle top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 ${DIVIDER_ACCENT[entry.accent]} opacity-60`} />

        {/* Trophy icon */}
        <Trophy className={`size-4 ${ACCENT_CLASSES[entry.accent]} opacity-70 mb-1`} />

        {/* Count */}
        <span className={`font-headline text-6xl md:text-7xl leading-none tracking-wide ${ACCENT_CLASSES[entry.accent]}`}>
          {entry.count}
        </span>

        {/* Competition name */}
        <span className="font-label text-[10px] uppercase tracking-widest text-white text-center leading-tight mt-1">
          {entry.competition}
        </span>

        {/* Label */}
        <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8] text-center">
          {entry.label}
        </span>
      </div>

      {/* Vertical divider — hidden after last item */}
      {!isLast && (
        <div className="w-px bg-white/10 self-stretch shrink-0" />
      )}
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TrophiesSection() {
  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <h2 className="font-headline text-5xl md:text-6xl text-white tracking-wide leading-none">
            TRÓFEÁK
          </h2>
        </div>
      </div>

      {/* Trophy blocks */}
      <div className="relative bg-[#252240] overflow-hidden">
        {/* Left crimson accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A50044]" />
        {/* Top-left corner square */}
        <div className="absolute top-0 left-1 w-5 h-5 bg-[#F3C00E]" />

        <div className="pl-1 grid grid-cols-2 sm:grid-cols-4">
          {TROPHIES.map((entry, i) => (
            <TrophyBlock
              key={entry.competition}
              entry={entry}
              isLast={i === TROPHIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
