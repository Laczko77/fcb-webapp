'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

export type ActionState = { error?: string } | null

const registerSchema = z.object({
  fullName: z.string().min(2, 'A teljes névnek legalább 2 karakter hosszúnak kell lennie.'),
  nickname: z.string().min(2, 'A becenevnek legalább 2 karakter hosszúnak kell lennie.'),
  email: z.email('Érvénytelen e-mail cím.'),
  password: z.string().min(6, 'A jelszónak legalább 6 karakter hosszúnak kell lennie.'),
})

export async function signUp(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    fullName: formData.get('fullName'),
    nickname: formData.get('nickname'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return { error: firstIssue?.message ?? 'Érvénytelen adatok.' }
  }

  const { fullName, nickname, email, password } = parsed.data

  const supabase = await createClient()

  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        nickname,
      },
    },
  })

  if (authError) {
    return { error: authError.message }
  }

  const user = data.user
  if (!user) {
    return { error: 'A regisztráció sikertelen volt. Kérjük, próbáld újra.' }
  }

  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    full_name: fullName,
    nickname,
  })

  if (profileError) {
    return { error: 'A profil létrehozása sikertelen volt. Kérjük, próbáld újra.' }
  }

  redirect('/login?registered=true')
}
