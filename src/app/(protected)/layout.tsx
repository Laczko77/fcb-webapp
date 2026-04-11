import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// A route-védelmet a src/middleware.ts biztosítja.

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = null
  const isAdmin = false

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
