import type { Metadata } from 'next'
import RegisterForm from './_components/RegisterForm'

export const metadata: Metadata = {
  title: 'Regisztráció — BarcaPulse',
  description: 'Csatlakozz a BarcaPulse közösséghez.',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-16">
      {/* Full-page gradient mesh background */}
      <div className="absolute inset-0 hero-mesh" />

      {/* Form card */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-[#1c192f]/90 backdrop-blur-md border border-white/10 p-8 md:p-12">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
