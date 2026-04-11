import Image from 'next/image'
import { Trophy } from 'lucide-react'
import { getBarcaStanding } from '@/lib/api-football/matches'
import type { ApiStanding } from '@/lib/api-football/types'

// ─── Utilities ────────────────────────────────────────────────────────────────

type FormChar = 'W' | 'D' | 'L'

const FORM_STYLES: Record<FormChar, string> = {
  W: 'bg-green-500',
  D: 'bg-yellow-500',
  L: 'bg-red-600',
}

function FormPips({ form }: { form: string }) {
  const chars = form.slice(-5).split('') as FormChar[]
  return (
    <div className="flex items-center gap-1">
      {chars.map((c, i) => (
        <div
          key={i}
          title={c === 'W' ? 'Győzelem' : c === 'D' ? 'Döntetlen' : 'Vereség'}
          className={`w-2 h-2 ${FORM_STYLES[c] ?? 'bg-white/20'}`}
        />
      ))}
    </div>
  )
}

// ─── Stat Box ─────────────────────────────────────────────────────────────────

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string
  value: number | string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-3 bg-[#1c192f] min-w-[60px]">
      <span
        className={`font-headline text-3xl leading-none ${
          highlight ? 'text-[#A50044]' : 'text-white'
        }`}
      >
        {value}
      </span>
      <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8]">
        {label}
      </span>
    </div>
  )
}

// ─── Standing Panel ────────────────────────────────────────────────────────────

function StandingPanel({ standing }: { standing: ApiStanding }) {
  const { rank, team, points, goalsDiff, form, all } = standing

  return (
    <div className="relative bg-[#252240] overflow-hidden">
      {/* Left crimson accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A50044]" />
      {/* Top-left corner square */}
      <div className="absolute top-0 left-1 w-5 h-5 bg-[#004D98]" />

      <div className="pl-8 pr-6 pt-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">

          {/* Rank block */}
          <div className="flex flex-row lg:flex-col items-end lg:items-start gap-4 lg:gap-0 shrink-0 lg:min-w-[80px]">
            <span className="font-label text-[9px] uppercase tracking-widest text-[#A50044]">
              La Liga
            </span>
            <span className="font-headline text-8xl lg:text-9xl text-white leading-none tracking-wide">
              {rank}
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8] mt-0.5">
              Helyezés
            </span>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden lg:block w-px h-24 bg-white/10 shrink-0" />

          {/* Team identity */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative w-12 h-12 bg-[#1c192f] p-2 shrink-0">
              <Image
                src={team.logo}
                alt={team.name}
                fill
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-headline text-2xl text-white tracking-wide leading-none">
                {team.name.toUpperCase()}
              </span>
              {form && <FormPips form={form} />}
            </div>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden lg:block w-px h-24 bg-white/10 shrink-0" />

          {/* Stats grid */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <StatBox label="Pont" value={points} highlight />
            <StatBox label="Győzelem" value={all.win} />
            <StatBox label="Döntetlen" value={all.draw} />
            <StatBox label="Vereség" value={all.lose} />
            <StatBox
              label="Gólkülönbség"
              value={goalsDiff >= 0 ? `+${goalsDiff}` : String(goalsDiff)}
            />
            <StatBox label="Lejátszott" value={all.played} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default async function StandingsSection() {
  let standing: ApiStanding | null = null

  try {
    standing = await getBarcaStanding()
  } catch {
    // graceful degradation — standing stays null
  }

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <h2 className="font-headline text-5xl md:text-6xl text-white tracking-wide leading-none">
            LA LIGA ÁLLÁS
          </h2>
        </div>
      </div>

      {standing ? (
        <StandingPanel standing={standing} />
      ) : (
        <div className="border border-white/10 bg-[#1c192f] px-8 py-12 text-center">
          <Trophy className="size-5 text-[#9B97B8] mx-auto mb-3" />
          <p className="font-label text-xs uppercase tracking-widest text-[#9B97B8]">
            A tabella jelenleg nem érhető el.
          </p>
        </div>
      )}
    </section>
  )
}
