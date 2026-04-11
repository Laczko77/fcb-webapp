'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Shield, LogOut, User as UserIcon, ChevronRight } from 'lucide-react'

// TODO: replace with shared User type from @/types once defined
export interface NavUser {
  id: string
  email: string
  full_name?: string | null
}

interface NavbarProps {
  user: NavUser | null
  isAdmin?: boolean
}

const NAV_LINKS = [
  { label: 'Hírek', href: '/hirek' },
  { label: 'Meccsek', href: '/meccsek' },
  { label: 'Jegyek', href: '/jegyek' },
  { label: 'Webshop', href: '/webshop' },
  { label: 'Közösség', href: '/kozosseg' },
] as const

export default function Navbar({ user, isAdmin = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[#1D1A31]/95 backdrop-blur-md">
      {/* Brand accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#A50044] via-[#EDBB00] to-[#004D98]" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A31] rounded-sm"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-[#A50044] to-[#004D98] shadow-lg shadow-[#A50044]/30">
            <Shield className="size-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-['Bebas_Neue',sans-serif] text-2xl tracking-widest text-[#F5F0FF] transition-colors group-hover:text-[#A50044]">
            Barca<span className="text-[#A50044]">Pulse</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Fő navigáció">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative px-3 py-2 font-['DM_Sans',sans-serif] text-sm font-medium text-[#9B97B8] transition-colors hover:text-[#F5F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044] rounded-sm after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-[#A50044] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded px-3 py-1.5 font-['Space_Mono',monospace] text-xs uppercase tracking-wider text-[#EDBB00] ring-1 ring-[#EDBB00]/40 transition-all hover:bg-[#EDBB00]/10 hover:ring-[#EDBB00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EDBB00]"
                >
                  <Shield className="size-3" />
                  Admin
                </Link>
              )}
              <Link
                href="/profil"
                className="flex items-center gap-2 rounded px-3 py-1.5 font-['DM_Sans',sans-serif] text-sm text-[#9B97B8] transition-colors hover:text-[#F5F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#004D98]/30 ring-1 ring-[#004D98]/50">
                  <UserIcon className="size-3.5 text-[#004D98]" />
                </div>
                <span className="max-w-[120px] truncate text-sm">
                  {user.full_name ?? user.email}
                </span>
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded px-3 py-1.5 font-['DM_Sans',sans-serif] text-sm text-[#9B97B8] transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <LogOut className="size-4" />
                  Kijelentkezés
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/bejelentkezes"
                className="rounded border border-white/[0.07] px-4 py-1.5 font-['DM_Sans',sans-serif] text-sm font-medium text-[#9B97B8] transition-colors hover:border-white/20 hover:text-[#F5F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044]"
              >
                Bejelentkezés
              </Link>
              <Link
                href="/regisztracio"
                className="rounded bg-[#A50044] px-4 py-1.5 font-['DM_Sans',sans-serif] text-sm font-semibold text-white shadow-md shadow-[#A50044]/30 transition-all hover:bg-[#c20050] hover:shadow-[#A50044]/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A31]"
              >
                Regisztráció
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={menuOpen}
          className="flex md:hidden items-center justify-center rounded p-2 text-[#9B97B8] transition-colors hover:text-[#F5F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044]"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-white/[0.07] bg-[#1D1A31] px-4 pb-6 pt-3">
          <nav className="flex flex-col gap-1" aria-label="Mobil navigáció">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 font-['DM_Sans',sans-serif] text-sm font-medium text-[#9B97B8] transition-colors hover:bg-white/5 hover:text-[#F5F0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044]"
              >
                {label}
                <ChevronRight className="size-4 text-white/30" />
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.07] pt-4">
            {user ? (
              <>
                <Link
                  href="/profil"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-['DM_Sans',sans-serif] text-sm text-[#9B97B8] hover:bg-white/5 hover:text-[#F5F0FF] transition-colors"
                >
                  <UserIcon className="size-4 text-[#004D98]" />
                  {user.full_name ?? user.email}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-['Space_Mono',monospace] text-sm font-semibold text-[#EDBB00] hover:bg-[#EDBB00]/10 transition-colors"
                  >
                    <Shield className="size-4" />
                    Admin panel
                  </Link>
                )}
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 font-['DM_Sans',sans-serif] text-sm text-[#9B97B8] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Kijelentkezés
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/bejelentkezes"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-white/[0.07] px-4 py-2.5 text-center font-['DM_Sans',sans-serif] text-sm font-medium text-[#9B97B8] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-[#F5F0FF]"
                >
                  Bejelentkezés
                </Link>
                <Link
                  href="/regisztracio"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-[#A50044] px-4 py-2.5 text-center font-['DM_Sans',sans-serif] text-sm font-semibold text-white transition-all hover:bg-[#c20050] active:scale-95"
                >
                  Regisztráció
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
