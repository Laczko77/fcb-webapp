import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const oswald = Oswald({
  variable: '--font-display',
  subsets: ['latin'],
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
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0A0A0F] text-white">
        <Navbar user={user} isAdmin={isAdmin} />
        {/* pt-[65px] offsets the fixed navbar (64px height + 1px top accent bar) */}
        <main className="flex-1 pt-[65px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
