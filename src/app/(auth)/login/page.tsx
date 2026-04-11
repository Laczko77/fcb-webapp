import { Suspense } from 'react'
import type { Metadata } from 'next'
import LoginForm from './_components/LoginForm'

export const metadata: Metadata = {
  title: 'Bejelentkezés — BarcaPulse',
  description: 'Jelentkezz be BarcaPulse fiókodba.',
}

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden px-4 py-16">
      {/* Background glows */}
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[500px] w-[500px] rounded-full bg-[#A50044]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#004D98]/10 blur-[120px]" />
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
