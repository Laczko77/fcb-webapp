// A route-védelmet a src/middleware.ts biztosítja.
// Ez a layout csak a route group szervezési egysége.

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
