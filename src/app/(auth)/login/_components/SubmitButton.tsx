'use client'

import { useFormStatus } from 'react-dom'
import { LogIn, Loader2 } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        group relative mt-2 w-full overflow-hidden rounded-lg
        bg-[#A50044] px-6 py-3.5 text-sm font-bold
        uppercase tracking-widest text-white shadow-lg shadow-[#A50044]/25
        transition-all duration-200
        hover:bg-[#c20050] hover:shadow-[#A50044]/40
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A50044] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252240]
        disabled:cursor-not-allowed disabled:opacity-60
      "
    >
      <span className="relative flex items-center justify-center gap-2">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Bejelentkezés...
          </>
        ) : (
          <>
            <LogIn className="size-4 transition-transform group-hover:translate-x-0.5" />
            Bejelentkezés
          </>
        )}
      </span>
    </button>
  )
}
