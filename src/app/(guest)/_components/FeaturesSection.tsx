import { Radio, Ticket, ShoppingBag, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: Radio,
    title: 'ÉLŐ ELEMZÉS',
    description:
      'Minden meccs részletes taktikai áttekintése valós időben, profi szakértőktől.',
    rotation: '-rotate-[0.5deg]',
  },
  {
    icon: Ticket,
    title: 'JEGYVÁSÁRLÁS',
    description:
      'Camp Nou jegyek egyszerűen — szabad helyek, szektorválasztás és biztonságos fizetés.',
    rotation: 'rotate-[0.5deg]',
  },
  {
    icon: ShoppingBag,
    title: 'WEBSHOP',
    description:
      'Hivatalos mezt, kiegészítőket és limitált kiadású rajongói termékeket böngészhetsz.',
    rotation: '-rotate-[0.5deg]',
  },
  {
    icon: Users,
    title: 'KÖZÖSSÉG',
    description:
      'Csatlakozz a világ legnagyobb Culé közösségéhez és vitasd meg a legfrissebb eseményeket.',
    rotation: 'rotate-[0.5deg]',
  },
] as const

export default function FeaturesSection() {
  return (
    <section className="py-32 px-8 max-w-7xl mx-auto">
      {/* Section heading */}
      <div className="flex items-start gap-12 mb-20">
        <div className="w-[2px] h-32 bg-[#A50044]" />
        <h2 className="font-headline text-6xl md:text-8xl text-white ml-12">
          MIÉRT
          <br />
          <span className="text-[#F3C00E]">BARCAPULSE?</span>
        </h2>
      </div>

      {/* Feature card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className={`group bg-[#252240] p-8 min-h-[320px] relative border border-white/5 ${feature.rotation} hover:bg-[#35324a] transition-all duration-300`}
            >
              {/* Corner accent square */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-[#A50044]" />

              <div className="mb-8">
                <Icon className="text-[#F3C00E] size-9" strokeWidth={1.5} />
              </div>

              <h3 className="font-headline text-2xl text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-[#9B97B8] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
