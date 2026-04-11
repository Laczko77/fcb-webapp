---
name: Project Stack and Configuration
description: Installed packages, versions, and configuration state of the FCB webapp project
type: project
---

Installed stack (verified 2026-04-11):
- Next.js 16.2.2 (App Router), React 19.2.4
- TypeScript 5, strict: true (tsconfig.json line 7)
- Tailwind CSS 4, PostCSS
- shadcn/ui (shadcn ^4.1.2, style: "base-nova", rsc: true, aliases configured)
- @supabase/ssr ^0.10.0, @supabase/supabase-js ^2.101.1
- Zustand ^5.0.12
- Zod ^4.3.6 (already in package.json dependencies)
- lucide-react ^1.7.0

**Why:** Verified during Iter 0.1 setup. zod was already installed as a dependency even though not visible before — npm install confirmed v4.3.6 present.

**How to apply:** Do not re-install these packages. When adding new shadcn components, use `npx shadcn@latest add <component>` from project root.

Notable: package name is "temp-next" (should eventually be renamed to fcb-webapp, but not a blocker).

shadcn/ui components installed (as of Iter 1.1):
- button.tsx — was already present before Iter 1.1
- card.tsx, input.tsx, label.tsx — added during Iter 1.1 (`npx shadcn@latest add card input label`)

Zod v4 API notes (verified 2026-04-11):
- Top-level `z.email()` is the v4 syntax, NOT `z.string().email()`
- `safeParse` returns `{ success, data, error }` — error has `.issues[]` array (not `.flatten()`)
- First issue message: `parsed.error.issues[0]?.message`
