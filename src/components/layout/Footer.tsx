import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Adatvédelem', href: '/adatvedelem' },
  { label: 'Felhasználási feltételek', href: '/felhasznalasi-feltetelek' },
  { label: 'Partnerek', href: '/partnerek' },
] as const

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1c192f] border-t border-white/5 py-12 px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <span className="font-label text-xs uppercase tracking-widest text-[#F3C00E]">
            BARCAPULSE
          </span>
          <div className="hidden md:flex gap-6">
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[#9B97B8] text-[11px] font-label hover:text-white transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-label text-[#9B97B8] uppercase tracking-wider mb-1">
            &copy; {currentYear} BARCAPULSE. TOTS UNITS FEM FORÇA.
          </p>
          <p className="text-[9px] font-label text-[#9B97B8]/40">
            NEM HIVATALOS SZURKOLÓI OLDAL. AZ FC BARCELONA LOGÓJA ÉS VÉDJEGYE A KLUB TULAJDONA.
          </p>
        </div>
      </div>
    </footer>
  )
}
