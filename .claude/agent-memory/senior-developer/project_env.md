---
name: Environment Variables Setup
description: Which env vars are required, their locations, and gitignore behavior
type: project
---

Required env variables (all defined in .env.local and .env.local.example):
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- RAPIDAPI_KEY
- OPENROUTER_API_KEY
- OPENROUTER_MODEL
- NEXT_PUBLIC_USE_MOCK_API

Files:
- `.env` — legacy file, all empty strings, kept as-is
- `.env.example` — legacy file, same as .env
- `.env.local` — created in Iter 0.1, all empty strings (placeholder)
- `.env.local.example` — created in Iter 0.1, placeholder values with comments

.gitignore uses `.env*` pattern but has explicit `!.env.local.example` and `!.env.example` exceptions so example files can be committed.

next.config.ts env block contains:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_USE_MOCK_API

OPENROUTER keys and RAPIDAPI_KEY are server-side only — never exposed to client, no need in next.config.ts env block.

**Why:** Next.js auto-exposes NEXT_PUBLIC_ vars from .env.local without the env block in next.config.ts, but the block was already there for the Supabase vars.

**How to apply:** When adding new server-side secrets, add to .env.local and .env.local.example only. When adding new client-side vars (NEXT_PUBLIC_), also add to next.config.ts env block.
