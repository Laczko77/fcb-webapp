'use client'

import { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { signIn, type ActionState } from '../actions'
import { SubmitButton } from './SubmitButton'

const initialState: ActionState = null

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState)
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered') === 'true'

  return (
    <>
      {/* Branding */}
      <div className="mb-8">
        <div className="font-headline text-sm tracking-[6px] text-[#F3C00E] mb-6">
          BARCAPULSE
        </div>
        <h1 className="font-headline text-5xl text-white leading-none mb-3">
          Bejelentkezés
        </h1>
        <div className="w-10 h-[1px] bg-[#F3C00E]" />
      </div>

      <form action={formAction} noValidate className="flex flex-col gap-8">
        {/* Success banner — registered=true */}
        {registered && (
          <div
            role="status"
            className="flex items-start gap-3 border border-[#F3C00E]/30 bg-[#F3C00E]/10 px-4 py-3"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#F3C00E]" />
            <p className="text-sm text-[#F3C00E]">
              Sikeres regisztráció! Jelentkezz be.
            </p>
          </div>
        )}

        {/* Error banner */}
        {state?.error && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-[#A50044]/30 bg-[#A50044]/10 px-4 py-3"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-white" />
            <p className="text-sm text-white">{state.error}</p>
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-label text-[11px] uppercase tracking-widest text-[#9B97B8]"
          >
            Email cím
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="user@example.com"
            autoComplete="email"
            className="bg-[#2E2B4A] border-0 border-b border-[#004D98] text-white px-0 py-4 focus:border-[#F3C00E] focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-white/10"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <label
              htmlFor="password"
              className="font-label text-[11px] uppercase tracking-widest text-[#9B97B8]"
            >
              Jelszó
            </label>
            <a
              href="#"
              className="font-label text-[10px] text-[#F3C00E] hover:text-white transition-colors uppercase tracking-tighter"
            >
              Elfelejtetted?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className="bg-[#2E2B4A] border-0 border-b border-[#004D98] text-white px-0 py-4 focus:border-[#F3C00E] focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-white/10"
          />
        </div>

        {/* Submit & register link */}
        <div className="flex flex-col gap-5">
          <SubmitButton />
          <p className="font-label text-xs text-[#9B97B8] flex items-center gap-2">
            Még nincs fiókod?
            <Link
              href="/register"
              className="text-[#F3C00E] hover:underline flex items-center"
            >
              REGISZTRÁLJ <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}
