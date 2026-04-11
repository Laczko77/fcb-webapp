import { Suspense } from 'react'
import type { Metadata } from 'next'
import LoginForm from './_components/LoginForm'

export const metadata: Metadata = {
  title: 'Bejelentkezés — BarcaPulse',
  description: 'Jelentkezz be BarcaPulse fiókodba.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16">
      {/* Full-page gradient mesh background */}
      <div className="absolute inset-0 hero-mesh" />

      {/* Form card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1c192f]/90 backdrop-blur-md border border-white/10 p-8 md:p-12">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
