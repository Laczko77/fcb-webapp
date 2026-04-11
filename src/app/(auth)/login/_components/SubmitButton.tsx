'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-[#A50044] text-white font-headline text-xl tracking-[4px] py-5 px-12 w-full text-left btn-slash hover:brightness-110 transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <span className="flex items-center gap-3">
          <Loader2 className="size-5 animate-spin" />
          BEJELENTKEZÉS...
        </span>
      ) : (
        'BEJELENTKEZÉS'
      )}
    </button>
  )
}
