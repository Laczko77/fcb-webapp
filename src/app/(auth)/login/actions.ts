'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { AuthApiError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

export type ActionState = { error?: string } | null

const loginSchema = z.object({
  email: z.email('Érvénytelen e-mail cím.'),
  password: z.string().min(1, 'A jelszó megadása kötelező.'),
})

export async function signIn(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return { error: firstIssue?.message ?? 'Érvénytelen adatok.' }
  }

  const { email, password } = parsed.data

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error instanceof AuthApiError) {
      return { error: 'Hibás email cím vagy jelszó.' }
    }
    return { error: 'Bejelentkezési hiba. Kérjük, próbáld újra.' }
  }

  redirect('/dashboard')
}
