import { redirect } from 'next/navigation'
import { getUser, AuthUser } from '@/lib/auth/getUser'

export async function requireAuth(): Promise<AuthUser> {
  const authUser = await getUser()

  if (!authUser) {
    redirect('/login')
  }

  return authUser
}
