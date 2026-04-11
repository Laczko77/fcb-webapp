import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
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
  return (
    <html
      lang="hu"
      className={`dark ${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
        {children}
      </body>
    </html>
  )
}
