import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/tickets/purchase',
  '/shop/checkout',
  '/community',
]

const ADMIN_ROUTES = ['/admin']

function isProtected(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
}

function isAdmin(pathname: string): boolean {
  return ADMIN_ROUTES.some((route) => pathname.startsWith(route))
}

export async function middleware(request: NextRequest) {
  // Session frissítés — ez kezeli a cookie beállítást is
  const response = await updateSession(request)

  const { pathname } = request.nextUrl

  if (!isProtected(pathname) && !isAdmin(pathname)) {
    return response
  }

  // Session kiolvasása a már frissített cookie-kból.
  // TILOS DB query itt — kizárólag JWT app_metadata-t használunk.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // Middleware kontextusban a cookie-kat az updateSession már kezelte
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Nem bejelentkezett felhasználó védett vagy admin route-on → /login
  if (!session) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // Admin route — role ellenőrzés kizárólag JWT app_metadata-ból
  if (isAdmin(pathname)) {
    const role = session.user?.app_metadata?.role
    if (role !== 'admin') {
      const dashboardUrl = request.nextUrl.clone()
      dashboardUrl.pathname = '/dashboard'
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Minden kérés illeszkedik KIVÉVE:
     * - _next/static (statikus fájlok)
     * - _next/image (Next.js képoptimalizálás)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Publikus képek és statikus asseték (pl. /images/*)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
