import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export type Profile = {
  id: string
  full_name: string | null
  nickname: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
}

export type AuthUser = {
  user: User
  profile: Profile | null
}

export async function getUser(): Promise<AuthUser | null> {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.getUser()

  if (authError || !authData.user) {
    return null
  }

  const user = authData.user

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, nickname, avatar_url, role, created_at')
    .eq('id', user.id)
    .single()

  return {
    user,
    profile: profile ?? null,
  }
}
