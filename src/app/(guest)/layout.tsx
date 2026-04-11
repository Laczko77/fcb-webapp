// Guest oldalak layout wrappere (pl. login, register).
// Ezek a route-ok nem igényelnek auth ellenőrzést.

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
