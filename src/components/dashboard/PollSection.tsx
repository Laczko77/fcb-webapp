import Link from 'next/link'
import { ArrowRight, Vote } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

// ─── Types ────────────────────────────────────────────────────────────────────

type ActivePoll = {
  id: string
  question: string
}

// ─── Data Fetching ────────────────────────────────────────────────────────────

async function fetchActivePoll(): Promise<ActivePoll | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('polls')
      .select('id, question')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    return data ?? null
  } catch {
    return null
  }
}

// ─── Poll Card ────────────────────────────────────────────────────────────────

function ActivePollCard({ poll }: { poll: ActivePoll }) {
  return (
    <div className="relative bg-[#252240] overflow-hidden group">
      {/* Left crimson accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#A50044]" />
      {/* Top-left corner square */}
      <div className="absolute top-0 left-1 w-5 h-5 bg-[#004D98]" />
      {/* Subtle diagonal background texture */}
      <div className="absolute inset-0 hero-mesh opacity-10 pointer-events-none" />

      <div className="relative pl-8 pr-6 pt-8 pb-7 flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Icon + label */}
        <div className="flex items-center gap-3 shrink-0 sm:flex-col sm:items-start sm:gap-2">
          <Vote className="size-5 text-[#A50044]" />
          <span className="font-label text-[9px] uppercase tracking-widest text-[#9B97B8]">
            Aktív szavazás
          </span>
        </div>

        {/* Vertical divider (desktop) */}
        <div className="hidden sm:block w-px h-16 bg-white/10 shrink-0" />

        {/* Question */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          <p className="font-headline text-2xl md:text-3xl text-white tracking-wide leading-tight">
            {poll.question.toUpperCase()}
          </p>

          <Link
            href="/community/polls"
            className="inline-flex items-center gap-2 self-start bg-[#A50044] px-5 py-2.5 font-headline text-sm tracking-[3px] text-white transition-all duration-200 hover:bg-[#c40052] active:scale-[0.98] group/btn"
            style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
          >
            SZAVAZOK
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyPollState() {
  return (
    <div className="border border-white/10 bg-[#1c192f] px-8 py-12 text-center">
      <Vote className="size-5 text-[#9B97B8] mx-auto mb-3" />
      <p className="font-label text-xs uppercase tracking-widest text-[#9B97B8]">
        Hamarosan új szavazás
      </p>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default async function PollSection() {
  const poll = await fetchActivePoll()

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <h2 className="font-headline text-5xl md:text-6xl text-white tracking-wide leading-none">
            SZURKOLÓI SZAVAZÁS
          </h2>
        </div>
        <Link
          href="/community/polls"
          className="hidden sm:inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes szavazás
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {poll ? <ActivePollCard poll={poll} /> : <EmptyPollState />}
    </section>
  )
}
