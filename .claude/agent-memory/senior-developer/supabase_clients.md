---
name: Supabase Client Setup
description: Established patterns for all three Supabase client files and middleware session handling
type: project
---

Three Supabase client files are in `src/lib/supabase/`:

- `client.ts` — `createBrowserClient` from `@supabase/ssr`, exports `createClient()` (sync). Use in `'use client'` components.
- `server.ts` — `createServerClient` from `@supabase/ssr` + `cookies()` from `next/headers`, exports `createClient()` (async). Use in Server Components and Server Actions.
- `middleware.ts` — exports `updateSession(request: NextRequest)`. Builds a `createServerClient` with request/response cookie bridging and calls `supabase.auth.getUser()` to refresh the session. Returns the updated `NextResponse`.

Middleware pattern (`src/middleware.ts`):
- Calls `updateSession` first (session refresh + cookie propagation)
- Then checks protected/admin routes using a second `createServerClient` on the original request cookies (read-only, setAll is a no-op)
- Role check: `session?.user?.app_metadata?.role === 'admin'` — NO DB query allowed in middleware
- Guest redirect target: `/login`
- Non-admin admin route redirect target: `/dashboard`
- Matcher excludes: `_next/static`, `_next/image`, `favicon.ico`, `sitemap.xml`, `robots.txt`, static asset extensions (svg, png, jpg, jpeg, gif, webp, ico, css, js)

Protected routes: `/dashboard`, `/profile`, `/tickets/purchase`, `/shop/checkout`, `/community`
Admin routes: `/admin`

Route group layouts (`src/app/(protected)/layout.tsx`, `src/app/(guest)/layout.tsx`) are thin wrappers with no auth logic — middleware handles all protection.

**Why:** Supabase SSR requires explicit cookie bridging between request and response in middleware. `getUser()` must be called (not `getSession()`) to ensure the JWT is server-verified.

**How to apply:** When adding new protected routes, add to the `PROTECTED_ROUTES` array in `src/middleware.ts`. When adding new admin routes, add to `ADMIN_ROUTES`. Never do DB queries in middleware.
