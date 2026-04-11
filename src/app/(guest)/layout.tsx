import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = null
  const isAdmin = false

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
