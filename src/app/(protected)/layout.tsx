import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getUser } from '@/lib/auth/getUser'

// A route-védelmet a src/middleware.ts biztosítja.

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authUser = await getUser()

  const navUser = authUser
    ? {
        id: authUser.user.id,
        email: authUser.user.email ?? '',
        full_name: authUser.profile?.full_name ?? authUser.profile?.nickname ?? null,
      }
    : null

  const isAdmin = authUser?.profile?.role === 'admin'

  return (
    <>
      <Navbar user={navUser} isAdmin={isAdmin} />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
