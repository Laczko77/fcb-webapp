import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const bebasNeue = Bebas_Neue({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BarcaPulse — FC Barcelona Rajongói Platform',
  description:
    'Az FC Barcelona rajongóinak közössége. Hírek, meccskövetés, jegyek és webshop egy helyen.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO: replace with real Supabase server session fetch once auth is wired up
  // Pass the resolved user and isAdmin flag down to Navbar
  const user = null
  const isAdmin = false

  return (
    <html
      lang="hu"
      className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
        <Navbar user={user} isAdmin={isAdmin} />
        {/* pt-[65px] offsets the fixed navbar (64px height + 1px top accent bar) */}
        <main className="flex-1 pt-[65px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
