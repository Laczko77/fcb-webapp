'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { signUp, type ActionState } from '../actions'
import { SubmitButton } from './SubmitButton'

const initialState: ActionState = null

export default function RegisterForm() {
  const [state, formAction] = useActionState(signUp, initialState)

  return (
    <>
      {/* Branding */}
      <div className="mb-8">
        <div className="font-headline text-sm tracking-[6px] text-[#F3C00E] mb-6">
          BARCAPULSE
        </div>
        <h1 className="font-headline text-5xl text-white leading-none mb-3">
          Regisztráció
        </h1>
        <div className="w-10 h-[1px] bg-[#F3C00E]" />
      </div>

      <form action={formAction} noValidate className="flex flex-col gap-6">
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

        {/* 2-column grid for inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="font-label text-[11px] uppercase tracking-widest text-[#9B97B8]"
            >
              Teljes név
            </label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Kovács János"
              autoComplete="name"
              className="bg-[#2E2B4A] border-0 border-b border-[#004D98] text-white px-0 py-4 focus:border-[#F3C00E] focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-white/10"
            />
          </div>

          {/* Nickname */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nickname"
              className="font-label text-[11px] uppercase tracking-widest text-[#9B97B8]"
            >
              Becenév
            </label>
            <input
              id="nickname"
              name="nickname"
              placeholder="CuleForever"
              autoComplete="username"
              className="bg-[#2E2B4A] border-0 border-b border-[#004D98] text-white px-0 py-4 focus:border-[#F3C00E] focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-white/10"
            />
          </div>

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
            <label
              htmlFor="password"
              className="font-label text-[11px] uppercase tracking-widest text-[#9B97B8]"
            >
              Jelszó
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 6 karakter"
              autoComplete="new-password"
              className="bg-[#2E2B4A] border-0 border-b border-[#004D98] text-white px-0 py-4 focus:border-[#F3C00E] focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-white/10"
            />
          </div>
        </div>

        {/* Submit & login link */}
        <div className="flex flex-col gap-5">
          <SubmitButton />
          <p className="font-label text-xs text-[#9B97B8] flex items-center gap-2">
            Már van fiókod?
            <Link
              href="/login"
              className="text-[#F3C00E] hover:underline flex items-center"
            >
              BEJELENTKEZÉS <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}
