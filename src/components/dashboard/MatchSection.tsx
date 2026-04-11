import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Trophy, Ticket } from 'lucide-react'
import {
  getUpcomingMatches,
  getRecentMatches,
  BARCA_TEAM_ID,
} from '@/lib/api-football/matches'
import type { ApiFixture } from '@/lib/api-football/types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface MatchSectionProps {
  hasTicket?: boolean
}

type MatchResult = 'win' | 'draw' | 'loss'

// ─── Utilities ────────────────────────────────────────────────────────────────

function getBarcaResult(fixture: ApiFixture): MatchResult {
  const isHome = fixture.teams.home.id === BARCA_TEAM_ID
  const barcaGoals = isHome ? fixture.goals.home : fixture.goals.away
  const opponentGoals = isHome ? fixture.goals.away : fixture.goals.home

  if (barcaGoals === null || opponentGoals === null) return 'draw'
  if (barcaGoals > opponentGoals) return 'win'
  if (barcaGoals < opponentGoals) return 'loss'
  return 'draw'
}

function getOpponent(fixture: ApiFixture): { name: string; logo: string } {
  const isHome = fixture.teams.home.id === BARCA_TEAM_ID
  const opp = isHome ? fixture.teams.away : fixture.teams.home
  return { name: opp.name, logo: opp.logo }
}

function formatMatchDate(iso: string): { day: string; month: string; time: string } {
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString('hu-HU', { day: '2-digit', weekday: 'short' }),
    month: d.toLocaleDateString('hu-HU', { month: 'long', year: 'numeric' }),
    time: d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' }),
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const RESULT_STYLES: Record<MatchResult, { bar: string; label: string; text: string }> = {
  win:  { bar: 'bg-green-600',  label: 'GY', text: 'text-green-400'  },
  draw: { bar: 'bg-yellow-600', label: 'D',  text: 'text-yellow-400' },
  loss: { bar: 'bg-red-600',    label: 'V',  text: 'text-red-400'    },
}

function ResultCard({ fixture }: { fixture: ApiFixture }) {
  const result = getBarcaResult(fixture)
  const isHome = fixture.teams.home.id === BARCA_TEAM_ID
  const styles = RESULT_STYLES[result]

  const matchDate = new Date(fixture.fixture.date)
  const dateStr = matchDate.toLocaleDateString('hu-HU', {
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="relative bg-[#252240] overflow-hidden group hover:bg-[#2E2B4A] transition-colors duration-200">
      {/* Result indicator bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bar}`} />

      <div className="pl-4 pr-4 pt-4 pb-4 flex flex-col gap-2">
        {/* Competition + date */}
        <div className="flex items-center justify-between">
          <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8] line-clamp-1 max-w-[70%]">
            {fixture.league.name}
          </span>
          <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8]">
            {dateStr}
          </span>
        </div>

        {/* Score row */}
        <div className="flex items-center justify-between gap-2">
          {/* Home team */}
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src={fixture.teams.home.logo}
                alt={fixture.teams.home.name}
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <span className="font-label text-[8px] uppercase tracking-wide text-[#9B97B8] line-clamp-1 text-center w-full">
              {fixture.teams.home.name}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 shrink-0">
            <span className={`font-headline text-3xl leading-none ${isHome ? 'text-white' : 'text-[#9B97B8]'}`}>
              {fixture.goals.home ?? '–'}
            </span>
            <span className="font-headline text-xl text-[#9B97B8] leading-none">:</span>
            <span className={`font-headline text-3xl leading-none ${!isHome ? 'text-white' : 'text-[#9B97B8]'}`}>
              {fixture.goals.away ?? '–'}
            </span>
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
            <div className="relative w-7 h-7 shrink-0">
              <Image
                src={fixture.teams.away.logo}
                alt={fixture.teams.away.name}
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <span className="font-label text-[8px] uppercase tracking-wide text-[#9B97B8] line-clamp-1 text-center w-full">
              {fixture.teams.away.name}
            </span>
          </div>
        </div>

        {/* Result label */}
        <div className="flex justify-center">
          <span className={`font-label text-[9px] uppercase tracking-widest ${styles.text}`}>
            {result === 'win' ? 'Győzelem' : result === 'draw' ? 'Döntetlen' : 'Vereség'}
          </span>
        </div>
      </div>
    </div>
  )
}

function NextMatchCard({
  fixture,
  hasTicket,
}: {
  fixture: ApiFixture
  hasTicket: boolean
}) {
  const opponent = getOpponent(fixture)
  const isHome = fixture.teams.home.id === BARCA_TEAM_ID
  const { day, month, time } = formatMatchDate(fixture.fixture.date)
  const venue =
    fixture.fixture.venue.name ??
    fixture.fixture.venue.city ??
    'Ismeretlen helyszín'

  return (
    <div className="relative bg-[#1c192f] overflow-hidden">
      {/* Crimson left accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A50044]" />
      {/* Blue corner square */}
      <div className="absolute top-0 left-1 w-5 h-5 bg-[#004D98]" />
      {/* Mesh background */}
      <div className="absolute inset-0 hero-mesh opacity-20 pointer-events-none" />

      <div className="relative z-10 pl-8 pr-6 pt-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">

          {/* Date block */}
          <div className="flex flex-row lg:flex-col items-end lg:items-start gap-4 lg:gap-0 lg:min-w-[120px] shrink-0">
            <span className="font-label text-[9px] uppercase tracking-widest text-[#A50044]">
              Következő meccs
            </span>
            <div className="flex flex-col">
              <span className="font-headline text-6xl lg:text-7xl text-white leading-none tracking-wide">
                {day.split(' ')[1] ?? day}
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[#9B97B8] mt-0.5">
                {month}
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-[#F3C00E] mt-0.5">
                {time}
              </span>
            </div>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden lg:block w-px h-20 bg-white/10 shrink-0" />

          {/* Opponent info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative w-14 h-14 shrink-0 bg-[#252240] p-2">
              <Image
                src={opponent.logo}
                alt={opponent.name}
                fill
                className="object-contain p-1"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8]">
                {fixture.league.name} · {fixture.league.round}
              </span>
              <h3 className="font-headline text-3xl sm:text-4xl text-white tracking-wide leading-tight line-clamp-1">
                {isHome
                  ? `BARCELONA – ${opponent.name.toUpperCase()}`
                  : `${opponent.name.toUpperCase()} – BARCELONA`}
              </h3>
              <div className="flex items-center gap-1.5 text-[#9B97B8]">
                <MapPin className="size-3 shrink-0" />
                <span className="font-sans text-xs line-clamp-1">
                  {venue}
                </span>
                <span
                  className={`font-label text-[9px] uppercase tracking-widest ${
                    isHome ? 'text-[#004D98]' : 'text-[#9B97B8]'
                  }`}
                >
                  {isHome ? 'Hazai' : 'Vendég'}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket CTA — only when hasTicket */}
          {hasTicket && (
            <div className="shrink-0">
              <Link
                href="/jegyek"
                className="inline-flex items-center gap-2 bg-[#A50044] text-white font-headline tracking-[4px] text-sm px-6 py-3 uppercase hover:brightness-110 active:scale-[0.98] transition-all duration-150"
                style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
              >
                <Ticket className="size-4" />
                JEGYET VENNI
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default async function MatchSection({ hasTicket = false }: MatchSectionProps) {
  let upcoming: ApiFixture[] = []
  let recent: ApiFixture[] = []

  try {
    upcoming = await getUpcomingMatches(1)
  } catch {
    // graceful degradation — upcoming stays empty
  }

  try {
    recent = await getRecentMatches(3)
  } catch {
    // graceful degradation — recent stays empty
  }

  const nextMatch = upcoming[0] ?? null

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <h2 className="font-headline text-5xl md:text-6xl text-white tracking-wide leading-none">
            MECCSEK
          </h2>
        </div>
        <Link
          href="/matches"
          className="hidden sm:inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes meccs
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Next match hero */}
      <div className="mb-6">
        {nextMatch ? (
          <NextMatchCard fixture={nextMatch} hasTicket={hasTicket} />
        ) : (
          <div className="border border-white/10 bg-[#1c192f] px-8 py-10 text-center">
            <Trophy className="size-5 text-[#9B97B8] mx-auto mb-3" />
            <p className="font-label text-xs uppercase tracking-widest text-[#9B97B8]">
              Jelenleg nincs beütemezett meccs.
            </p>
          </div>
        )}
      </div>

      {/* Recent results sub-heading */}
      <div className="mb-4 flex items-center gap-3">
        <span className="font-label text-[10px] uppercase tracking-widest text-[#9B97B8]">
          Utolsó eredmények
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Result cards */}
      {recent.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {recent.map((fixture) => (
            <ResultCard key={fixture.fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 bg-[#1c192f] px-8 py-10 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-[#9B97B8]">
            Jelenleg nincsenek elérhető eredmények.
          </p>
        </div>
      )}

      {/* Mobile "Összes meccs" link */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/matches"
          className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes meccs
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
