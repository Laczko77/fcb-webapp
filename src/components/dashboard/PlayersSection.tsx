import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, User } from 'lucide-react'
import { getTopScorers } from '@/lib/api-football/players'
import type { ApiPlayerWithStats } from '@/lib/api-football/types'

// ─── Player Card ──────────────────────────────────────────────────────────────

function PlayerCard({ entry }: { entry: ApiPlayerWithStats }) {
  const { player, statistics } = entry
  const stats = statistics[0]
  const goals = stats?.goals.total ?? 0
  const assists = stats?.goals.assists ?? 0
  const team = stats?.team

  const displayName = `${player.firstname} ${player.lastname}`

  return (
    <div className="group relative flex flex-col bg-[#252240] overflow-hidden transition-all duration-300 hover:bg-[#2E2B4A] hover:-translate-y-0.5">
      {/* Top-left corner accent */}
      <div className="absolute top-0 left-0 w-6 h-6 bg-[#A50044] z-10" />

      {/* Player photo */}
      <div className="relative w-full aspect-[4/3] bg-[#1c192f] shrink-0 overflow-hidden">
        {player.photo ? (
          <Image
            src={player.photo}
            alt={displayName}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1c192f]">
            <User className="size-12 text-[#2E2B4A]" />
          </div>
        )}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#252240] via-transparent to-transparent opacity-60" />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 px-5 pt-4 pb-5 flex-1">
        {/* Team label */}
        {team && (
          <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8]">
            {team.name}
          </span>
        )}

        {/* Player name */}
        <h3 className="font-headline text-2xl leading-tight text-white tracking-wide line-clamp-1 group-hover:text-[#e5defe] transition-colors">
          {displayName.toUpperCase()}
        </h3>

        {/* Stats row */}
        <div className="flex items-end gap-4 mt-auto">
          {/* Goals */}
          <div className="flex flex-col items-start">
            <span className="font-headline text-5xl leading-none text-[#A50044]">
              {goals}
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8] mt-0.5">
              Gól
            </span>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-white/10 self-center" />

          {/* Assists */}
          <div className="flex flex-col items-start">
            <span className="font-headline text-5xl leading-none text-[#004D98]">
              {assists}
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8] mt-0.5">
              Gólpassz
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default async function PlayersSection() {
  let players: ApiPlayerWithStats[] = []

  try {
    players = await getTopScorers(3)
  } catch {
    // graceful degradation — players stays empty
  }

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <h2 className="font-headline text-5xl md:text-6xl text-white tracking-wide leading-none">
            GÓLLÖVŐK
          </h2>
        </div>
        <Link
          href="/players"
          className="hidden sm:inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes játékos
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Player cards grid */}
      {players.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {players.map((entry) => (
            <PlayerCard key={entry.player.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 bg-[#1c192f] px-8 py-12 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-[#9B97B8]">
            A góllövőlista jelenleg nem érhető el.
          </p>
        </div>
      )}

      {/* Mobile "Összes játékos" link */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/players"
          className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes játékos
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
