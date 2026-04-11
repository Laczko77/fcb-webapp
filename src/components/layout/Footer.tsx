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
    <footer className="border-t border-white/[0.07] bg-[#1D1A31]">
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-[#A50044] via-[#EDBB00] to-[#004D98]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer row */}
        <div className="flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between sm:gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A31] rounded-sm"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#A50044] to-[#004D98] shadow-md shadow-[#A50044]/20">
              <Shield className="size-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-['Bebas_Neue',sans-serif] text-xl tracking-widest text-[#F5F0FF]/80 transition-colors group-hover:text-[#F5F0FF]">
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
                className="font-['DM_Sans',sans-serif] text-sm text-[#9B97B8] transition-colors hover:text-[#F5F0FF] focus-visible:outline-none focus-visible:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-1 border-t border-white/[0.07] py-4 sm:flex-row sm:justify-between">
          <p className="font-['DM_Sans',sans-serif] text-xs text-[#9B97B8]/50">
            &copy; {currentYear} BarcaPulse. Minden jog fenntartva.
          </p>
          <p className="font-['DM_Sans',sans-serif] text-xs text-[#9B97B8]/40">
            Nem hivatalos rajongói oldal &mdash; nem kapcsolódik az FC Barcelonához.
          </p>
        </div>
      </div>
    </footer>
  )
}
