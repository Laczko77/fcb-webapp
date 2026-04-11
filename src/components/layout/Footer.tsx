import Link from 'next/link'
import { Shield } from 'lucide-react'

const FOOTER_LINKS = [
  { label: 'Rólunk', href: '/rolunk' },
  { label: 'GYIK', href: '/gyik' },
  { label: 'Adatvédelem', href: '/adatvedelem' },
  { label: 'Felhasználási feltételek', href: '/felhasznalasi-feltetelek' },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0F]">
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A50044]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer row */}
        <div className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between sm:gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F] rounded-sm"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#A50044] to-[#004D98] shadow-md shadow-[#A50044]/20">
              <Shield className="size-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-['Oswald',sans-serif] text-lg font-bold tracking-wide text-white/80 transition-colors group-hover:text-white">
              Barca<span className="text-[#A50044]">Pulse</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label="Footer navigáció"
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/40 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-1 border-t border-white/[0.06] py-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/25">
            &copy; {currentYear} BarcaPulse. Minden jog fenntartva.
          </p>
          <p className="text-xs text-white/20">
            Nem hivatalos rajongói oldal &mdash; nem kapcsolódik az FC Barcelonához.
          </p>
        </div>
      </div>
    </footer>
  )
}
