import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

type NewsItem = {
  id: string
  title: string
  slug: string
  category: string
  published_at: string
  image_url: string | null
  excerpt: string | null
}

const CATEGORY_VARIANT: Record<
  string,
  'default' | 'secondary' | 'accent' | 'muted'
> = {
  meccs: 'default',
  átigazolás: 'secondary',
  klub: 'accent',
  interjú: 'muted',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

async function fetchLatestNews(): Promise<NewsItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('id, title, slug, category, published_at, image_url, excerpt')
    .order('published_at', { ascending: false })
    .limit(3)

  if (error || !data) return []
  return data as NewsItem[]
}

function NewsCard({ item }: { item: NewsItem }) {
  const badgeVariant =
    CATEGORY_VARIANT[item.category?.toLowerCase()] ?? 'muted'

  return (
    <Card className="group flex flex-col bg-[#252240] border-0 ring-0 overflow-hidden transition-all duration-300 hover:bg-[#2E2B4A] hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#1c192f] shrink-0">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 hero-mesh opacity-40" />
        )}
        {/* Top-left accent corner */}
        <div className="absolute top-0 left-0 w-6 h-6 bg-[#A50044] z-10" />
      </div>

      <CardContent className="flex flex-col gap-3 px-5 pt-4 pb-5 flex-1">
        {/* Category + Date row */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant={badgeVariant}>{item.category}</Badge>
          <span className="flex items-center gap-1 font-label text-[10px] text-[#9B97B8] uppercase tracking-wider">
            <Calendar className="size-3" />
            {formatDate(item.published_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-2xl leading-tight text-white tracking-wide line-clamp-2 group-hover:text-[#e5defe] transition-colors">
          {item.title}
        </h3>

        {/* Excerpt */}
        {item.excerpt && (
          <p className="text-[#9B97B8] text-sm font-sans leading-relaxed line-clamp-2 flex-1">
            {item.excerpt}
          </p>
        )}

        {/* Tovább link */}
        <Link
          href={`/hirek/${item.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#A50044] hover:text-[#F3C00E] transition-colors group/link"
        >
          Tovább
          <ArrowRight className="size-3 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default async function NewsSection() {
  const news = await fetchLatestNews()

  return (
    <section className="w-full">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-1 h-10 bg-[#A50044]" />
          <h2 className="font-headline text-5xl md:text-6xl text-white tracking-wide leading-none">
            LEGFRISSEBB HÍREK
          </h2>
        </div>
        <Link
          href="/hirek"
          className="hidden sm:inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes hír
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Cards grid */}
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="border border-white/10 bg-[#1c192f] px-8 py-12 text-center">
          <p className="font-label text-xs uppercase tracking-widest text-[#9B97B8]">
            Jelenleg nincsenek elérhető hírek.
          </p>
        </div>
      )}

      {/* Mobile "Összes hír" link */}
      <div className="mt-6 sm:hidden">
        <Link
          href="/hirek"
          className="inline-flex items-center gap-1.5 font-label text-[11px] uppercase tracking-widest text-[#9B97B8] hover:text-white transition-colors group"
        >
          Összes hír
          <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
