import { Suspense } from 'react'
import { requireAuth } from '@/lib/auth/requireAuth'
import NewsSection from '@/components/dashboard/NewsSection'
import MatchSection from '@/components/dashboard/MatchSection'
import StandingsSection from '@/components/dashboard/StandingsSection'
import PlayersSection from '@/components/dashboard/PlayersSection'
import TrophiesSection from '@/components/dashboard/TrophiesSection'
import PollSection from '@/components/dashboard/PollSection'
import { User } from 'lucide-react'

function MatchSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <div className="h-10 w-40 bg-[#252240] animate-pulse" />
        </div>
      </div>
      <div className="bg-[#1c192f] h-32 w-full animate-pulse mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#252240] h-28 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-[#252240] border-0 overflow-hidden animate-pulse"
        >
          <div className="w-full aspect-[16/9] bg-[#2E2B4A]" />
          <div className="px-5 pt-4 pb-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 bg-[#2E2B4A]" />
              <div className="h-3 w-20 bg-[#2E2B4A]" />
            </div>
            <div className="h-6 w-full bg-[#2E2B4A]" />
            <div className="h-4 w-3/4 bg-[#2E2B4A]" />
            <div className="h-3 w-12 bg-[#2E2B4A] mt-2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function DashboardPage() {
  const { user, profile } = await requireAuth()

  const displayName =
    profile?.nickname ?? profile?.full_name ?? user.email ?? 'Szurkoló'

  return (
    <div className="min-h-screen bg-[#131027]">
      {/* Dashboard hero strip */}
      <div className="relative border-b border-white/10 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 hero-mesh pointer-events-none" />

        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            {/* Greeting */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-label text-[11px] uppercase tracking-widest text-[#9B97B8]">
                <User className="size-3" />
                <span>Üdvözöllek</span>
              </div>
              <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl text-white tracking-wide leading-none">
                {displayName.toUpperCase()}
              </h1>
              <p className="font-sans text-sm text-[#9B97B8] mt-1">
                Ez a te személyes BarcaPulse irányítópultod.
              </p>
            </div>

            {/* Blaugrana accent decoration */}
            <div className="hidden md:flex items-center gap-1 self-start mt-2">
              <div className="w-3 h-16 bg-[#004D98]" />
              <div className="w-3 h-16 bg-[#A50044]" />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16 flex flex-col gap-16">
        {/* News section */}
        <div>
          <Suspense
            fallback={
              <div className="w-full">
                <div className="flex items-end justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-10 bg-[#A50044]" />
                    <div className="h-10 w-64 bg-[#252240] animate-pulse" />
                  </div>
                </div>
                <NewsSkeleton />
              </div>
            }
          >
            <NewsSection />
          </Suspense>
        </div>

        {/* Match section */}
        <Suspense fallback={<MatchSkeleton />}>
          <MatchSection />
        </Suspense>

        {/* Standings section */}
        <Suspense
          fallback={
            <div className="w-full">
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-10 bg-[#A50044]" />
                  <div className="h-10 w-52 bg-[#252240] animate-pulse" />
                </div>
              </div>
              <div className="bg-[#252240] h-36 w-full animate-pulse" />
            </div>
          }
        >
          <StandingsSection />
        </Suspense>

        {/* Players section */}
        <Suspense
          fallback={
            <div className="w-full">
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-10 bg-[#A50044]" />
                  <div className="h-10 w-44 bg-[#252240] animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-[#252240] overflow-hidden animate-pulse">
                    <div className="w-full aspect-[4/3] bg-[#2E2B4A]" />
                    <div className="px-5 pt-4 pb-5 flex flex-col gap-3">
                      <div className="h-3 w-20 bg-[#2E2B4A]" />
                      <div className="h-6 w-3/4 bg-[#2E2B4A]" />
                      <div className="h-10 w-1/2 bg-[#2E2B4A] mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <PlayersSection />
        </Suspense>

        {/* Trophies section — static, no Suspense needed */}
        <TrophiesSection />

        {/* Poll section */}
        <Suspense
          fallback={
            <div className="w-full">
              <div className="flex items-end justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-10 bg-[#A50044]" />
                  <div className="h-10 w-64 bg-[#252240] animate-pulse" />
                </div>
              </div>
              <div className="bg-[#252240] h-28 w-full animate-pulse" />
            </div>
          }
        >
          <PollSection />
        </Suspense>
      </div>
    </div>
  )
}
