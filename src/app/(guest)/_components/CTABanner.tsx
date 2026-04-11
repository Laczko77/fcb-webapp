import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="w-full bg-[#A50044] py-24 relative overflow-hidden group">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="mb-12 md:mb-0">
          <div className="w-32 h-[1px] bg-[#F3C00E] mb-6" />
          <h2 className="font-headline text-6xl md:text-8xl text-white leading-none">
            CSATLAKOZZ
            <br />
            MÁR MA.
          </h2>
        </div>

        <Link
          href="/register"
          className="group/link flex items-center gap-4 text-white font-headline text-3xl tracking-widest hover:translate-x-4 transition-transform duration-300"
        >
          Regisztrálj
          <ArrowRight className="size-8" />
        </Link>
      </div>
    </section>
  )
}
