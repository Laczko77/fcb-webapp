import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/auth/requireAuth'
import { AuthUser } from '@/lib/auth/getUser'

export async function requireAdmin(): Promise<AuthUser> {
  const authUser = await requireAuth()

  if (authUser.profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return authUser
}
