'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn, type ActionState } from '../actions'
import { SubmitButton } from './SubmitButton'

const initialState: ActionState = null

interface InputFieldProps {
  id: string
  name: string
  type?: string
  label: string
  placeholder: string
  icon: React.ReactNode
  autoComplete?: string
}

function InputField({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  icon,
  autoComplete,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-widest text-white/50"
      >
        {label}
      </Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/30">
          {icon}
        </span>
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 h-11 focus-visible:border-[#A50044]/60 focus-visible:ring-[#A50044]/15"
        />
      </div>
    </div>
  )
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState)
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === 'true'

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-white/[0.08] bg-[#0D0D14]/90 backdrop-blur-xl shadow-2xl shadow-black/60">
        {/* Brand accent bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#A50044] via-[#004D98] to-[#A50044] rounded-t-xl" />

        <div className="px-8 pb-10 pt-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#A50044] to-[#004D98] p-3 shadow-lg shadow-[#A50044]/30">
              <Mail className="size-7 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="font-['Oswald',sans-serif] text-3xl font-bold uppercase tracking-wider text-white">
              ÜDVÖZLÜNK
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Jelentkezz be BarcaPulse fiókodba
            </p>
          </div>

          <form action={formAction} noValidate className="space-y-5">
            {/* Success banner — registered=true */}
            {registered && (
              <div
                role="status"
                className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <p className="text-sm text-emerald-300">
                  Sikeres regisztráció! Jelentkezz be.
                </p>
              </div>
            )}

            {/* Error banner */}
            {state?.error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-300">{state.error}</p>
              </div>
            )}

            <InputField
              id="email"
              name="email"
              type="email"
              label="Email cím"
              placeholder="pelda@email.com"
              icon={<Mail className="size-4" />}
              autoComplete="email"
            />

            <InputField
              id="password"
              name="password"
              type="password"
              label="Jelszó"
              placeholder="••••••••"
              icon={<Lock className="size-4" />}
              autoComplete="current-password"
            />

            <SubmitButton />

            {/* Register link */}
            <p className="text-center text-sm text-white/40">
              Még nincs fiókod?{' '}
              <Link
                href="/register"
                className="font-semibold text-[#A50044] underline-offset-4 transition-colors hover:text-[#c20050] hover:underline"
              >
                Regisztráció
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
