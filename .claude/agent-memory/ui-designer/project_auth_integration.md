---
name: Navbar Auth Integration Placeholder
description: Navbar receives user session as props from layout.tsx — real Supabase fetch is not yet wired
type: project
---

The Navbar accepts `user: NavUser | null` and `isAdmin: boolean` as props. Currently `layout.tsx` passes hardcoded `user = null` and `isAdmin = false`.

**Why:** Auth (Supabase) is not yet wired up as of Iteration 1. The prop interface is designed so that when auth is ready, only `layout.tsx` needs updating — no Navbar changes required.

**How to apply:** When implementing auth, add a `createServerClient` call in `layout.tsx`, resolve the user session, and pass it down. The `NavUser` type interface is defined in `Navbar.tsx` — move it to `@/types` when a shared types file is created.
