'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Shield, LogOut, User as UserIcon, ChevronRight } from 'lucide-react'
import { signOut } from '@/app/actions/auth'

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
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Main bar */}
      <div className="h-16 bg-transparent border-b border-white/10 flex justify-between items-center px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-[#A50044] to-[#004D98] -skew-x-12" />
          <span className="text-[22px] font-headline tracking-[4px] text-white">
            BARCAPULSE
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[#9B97B8] font-label uppercase text-xs tracking-tighter hover:text-white transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 font-label text-xs uppercase tracking-wider text-[#F3C00E] hover:text-white transition-colors"
                  >
                    <Shield className="size-3" />
                    Admin
                  </Link>
                )}
                <Link
                  href="/profil"
                  className="flex items-center gap-2 text-[#9B97B8] font-label text-xs hover:text-white transition-colors"
                >
                  <UserIcon className="size-3.5" />
                  <span className="max-w-[120px] truncate">
                    {user.full_name ?? user.email}
                  </span>
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 text-[#9B97B8] font-label text-xs hover:text-red-400 transition-colors"
                  >
                    <LogOut className="size-3.5" />
                    Kilépés
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#9B97B8] font-label text-xs hover:text-white transition-all"
                >
                  Bejelentkezés
                </Link>
                <Link
                  href="/register"
                  className="text-white font-headline tracking-widest text-sm relative group overflow-hidden"
                >
                  Regisztráció →
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A50044] transform translate-y-1 group-hover:translate-y-0 transition-transform" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={menuOpen}
          className="flex md:hidden items-center justify-center p-2 text-[#9B97B8] hover:text-white transition-colors"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#131027]/95 backdrop-blur-md ${
          menuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-1 border-b border-white/10">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 text-[#9B97B8] font-label uppercase text-xs tracking-tighter hover:text-white transition-colors"
            >
              {label}
              <ChevronRight className="size-4 text-white/20" />
            </Link>
          ))}

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  href="/profil"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-2 text-[#9B97B8] font-label text-xs hover:text-white transition-colors"
                >
                  <UserIcon className="size-3.5" />
                  {user.full_name ?? user.email}
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 font-label text-xs text-[#F3C00E] hover:text-white transition-colors"
                  >
                    <Shield className="size-3.5" />
                    Admin panel
                  </Link>
                )}
                <form action={signOut}>
                  <button
                    type="submit"
                    className="flex items-center gap-2 py-2 text-[#9B97B8] font-label text-xs hover:text-red-400 transition-colors"
                  >
                    <LogOut className="size-3.5" />
                    Kijelentkezés
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-[#9B97B8] font-label text-xs hover:text-white transition-colors"
                >
                  Bejelentkezés
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="py-2 text-white font-headline tracking-widest text-sm"
                >
                  Regisztráció →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
