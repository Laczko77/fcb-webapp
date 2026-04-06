@AGENTS.md
# CLAUDE.md – FC Barcelona Fan Webapp Project Guidelines

This file defines **mandatory rules** for all code generation and modifications in this Next.js codebase.
If any rule would be violated, stop and fix the solution to fully comply with these guidelines.

---

## 0) Global Principles (always)

- **TypeScript everywhere.**
  - `strict: true` a `tsconfig.json`-ban.
  - Minden komponens, helper, Server Action, API route és lib fájl TypeScript.
  - Nincs `any` típus – ha elkerülhetetlen, kommenteld meg miért.
- Prefer **many small, short functions** over a few large ones.
  - Egy függvény egy dolgot csináljon.
  - Ha egy komponens 150 sor felett van, bontsd szét.
- **NO automated tests.**
  - Ne generálj unit / integration / e2e teszteket.
  - Ne hagyj test-related scaffolding-ot, konfigot vagy dependenciát.
  - Ha egy template generál ilyet (`__tests__`, `*.spec.ts`, `*.test.ts`, Jest/Vitest config, Playwright, Cypress), **töröld őket**.
- **Használj `.env.local` fájlokat** minden environment változóhoz.
  - Mindig legyen `.env.local.example` (titkos értékek nélkül, csak placeholderekkel).
  - Soha ne kerüljön secret a repo-ba.
- Ha bármilyen implementációs döntés vagy bizonytalanság merül fel, **KÉRDEZZ MIELŐTT KÓDOLSZ.**
  - Például: adatmodell változás, RLS policy, API endpoint contract, UI flow, jogosultság logika, pagination stratégia, realtime igény.

---

## 1) Stack (kötelező)

**Kötelező technológiák:**

| Réteg | Technológia |
|---|---|
| Frontend + Backend | Next.js 14, App Router, Server Actions |
| Stílus | Tailwind CSS |
| UI komponensek | shadcn/ui |
| Adatbázis + Auth + Storage | Supabase (`@supabase/ssr`) |
| Globális kliens state | Zustand (`persist` middleware, localStorage) |
| Validáció | Zod |
| Ikonok | lucide-react |
| Meccs / statisztika adatok | API-Football (RapidAPI) |


**Next.js konvenciók:**

- Mindig **App Router** – nincs Pages Router.
- Szerver komponens az alapértelmezett; csak akkor adj `'use client'` direktívát, ha valóban szükséges (state, event handler, browser API).
- Adatlekérés szerver komponensben történik (`async` komponens + `await`), **nem** `useEffect`-ben.
- Mutációkhoz **Server Action** (`'use server'`) – ne írj felesleges API route-ot ha Server Action elegendő.
- API route (`app/api/**/route.ts`) csak akkor, ha streaming kell (chatbot) vagy külső webhook fogad.
- Cache stratégia: `fetch(..., { next: { revalidate: 3600 } })` az API-Football hívásoknál.

---

## 2) Mappastruktúra (kötelező)

```
src/
├── app/
│   ├── (auth)/           # login, register oldalak
│   ├── (guest)/          # landing page (nem bejelentkezett)
│   ├── (protected)/      # bejelentkezett user oldalak
│   │   ├── dashboard/
│   │   ├── news/
│   │   ├── matches/
│   │   ├── tickets/
│   │   ├── players/
│   │   ├── shop/
│   │   ├── community/
│   │   └── profile/
│   ├── admin/            # admin felület
│   └── api/              # csak streaming / webhook route-ok
├── components/
│   ├── layout/           # Navbar, Footer, CartIcon
│   ├── dashboard/        # dashboard szekció komponensek
│   ├── stadium/          # StadiumMap SVG komponens
│   ├── polls/            # PollCard és szavazás UI
│   ├── chat/             # ChatWindow és chat UI
│   ├── profile/          # profil form komponensek
│   ├── admin/            # admin specifikus komponensek
│   └── chatbot/          # ChatbotWidget
├── lib/
│   ├── supabase/         # client.ts, server.ts, middleware.ts
│   ├── auth/             # getUser.ts, requireAuth.ts, requireAdmin.ts
│   ├── api-football/     # client.ts, types.ts, matches.ts, players.ts
│   └── store/            # Zustand store-ok (cartStore.ts)
└── middleware.ts
```

**Szabályok:**
- `app/` route fájlok legyenek **vékonyak**: adatlekérés + komponens összerakás, logika nélkül.
- Üzleti logika → `lib/` vagy Server Action fájlba.
- Újrahasználható UI → `components/`.
- Egy feature-hoz tartozó komponensek kerüljenek saját alkönyvtárba (`components/<feature>/`).

---

## 3) Supabase szabályok

- **Böngészőben:** `createBrowserClient` (`@supabase/ssr`) – `lib/supabase/client.ts`.
- **Szerveren:** `createServerClient` cookies-szal (`@supabase/ssr`) – `lib/supabase/server.ts`.
- **Middleware-ben:** session frissítő helper – `lib/supabase/middleware.ts`.
- Minden táblán **RLS engedélyezve** – soha ne használj `service_role` kulcsot kliens oldalon.
- `service_role` kulcs csak szerver oldali Server Action-ben vagy API route-ban, ahol szükséges.
- Storage feltöltés mindig szerver oldalon vagy közvetlen Supabase Storage SDK-val – ne proxyzd Next.js-en át feleslegesen.
- **Realtime** (chat): Supabase Realtime channel, csak kliens komponensben (`'use client'`), `useEffect`-ben feliratkozás + leiratkozás cleanup.

---

## 4) Validáció (Zod – kötelező)

Használj **Zod**-ot az alábbi helyeken:

- Minden Server Action bemeneti paramétereinek validálása.
- API route request body validálása.
- Env változók validálása (opcionális, de ajánlott `lib/env.ts`-ben).
- Form adatok validálása szerver oldalon (ne csak kliens oldalon).

```ts
// Példa Server Action validációra
const schema = z.object({
  question: z.string().min(5).max(500),
  options: z.array(z.string().min(1)).min(2).max(6),
})
const parsed = schema.safeParse(formData)
if (!parsed.success) return { error: parsed.error.flatten() }
```

Hibaüzenetek legyenek **egyértelműek és felhasználóbarátok** (magyarul, ha a UI magyar).

---

## 5) Stílus szabályok (Tailwind + shadcn/ui)

- Írj **minél kevesebb egyedi CSS**-t – Tailwind utility-k mindenhol.
- shadcn/ui komponenseket mindig `npx shadcn@latest add [component]` paranccsal add hozzá, ne kézzel.
- Ha egyedi CSS elkerülhetetlen: legyen **lokális** a komponensben (`className` prop vagy CSS modul), ne globális.
- Globális témát a `tailwind.config.ts`-ben definiálj – ne szétszórtan a komponensekben.
- **Reszponzív design kötelező:** mobile-first (`sm:`, `md:`, `lg:` breakpoint-ok).
- Nincs inline `style={{}}` prop – kivéve ha dinamikus értéket (pl. SVG path adat) nem lehet Tailwind-del kezelni.

---

## 6) Kliens oldali state (Zustand)

- Zustand store-ok: `src/lib/store/` mappában.
- **Perzisztencia kizárólag `localStorage`** (`persist` middleware).
- Kliens oldali hozzáférés biztosítása: Zustand `persist` middleware SSR-safe módon (pl. `skipHydration` vagy `onRehydrateStorage`).
- Store design:
  - Minimális state – csak ami valóban globális (pl. kosár).
  - Kis, fókuszált action-ök.
  - Mapping/formatting → `utils/` fájlba, ne a store-ba.
- Ne tárold Zustand-ban azt, ami lekérhető szerver oldalon (user session, DB adatok).

---

## 7) API-Football integráció

- Minden API-Football hívás a `lib/api-football/` mappában történik.
- **Soha ne hívd az API-t kliens oldalról** – csak szerver komponensből vagy Server Action-ből.
- Cache kötelező: `next: { revalidate: 3600 }` (1 óra) minden híváshoz, hogy ne haladja meg a napi 100 request limitet.
- Konstansok: `BARCA_TEAM_ID = 529`, `LA_LIGA_ID = 140`, `CURRENT_SEASON = 2025`.
- Minden API válasz legyen TypeScriptben típusozva (`lib/api-football/types.ts`).

---

## 8) Chatbot (Anthropic API)

- API route: `app/api/chatbot/route.ts` – **streaming** response.
- Model: `claude-haiku-4-5`, `max_tokens: 500`.
- Hitelesítés: minden chatbot hívás előtt ellenőrizd a Supabase session-t (401 ha nincs bejelentkezve).
- System prompt: mindig a `route.ts`-ben definiált, nem módosítható felhasználói inputból.
- Kliens oldalon `ReadableStream` olvasás a streaming feldolgozáshoz.

---

## 9) Auth és jogosultság

- Auth: Supabase Auth (email + jelszó).
- Route védelem: `src/middleware.ts` – minden kéréshez session frissítés + redirect logika.
- Szerver komponensekben: `lib/auth/requireAuth.ts` és `lib/auth/requireAdmin.ts` helper-ek.
- Admin azonosítás: `profiles.role = 'admin'` – a role-t mindig szerver oldalon ellenőrizd, sosem kliens oldalon.
- **Soha ne bízz kliens oldali role ellenőrzésben** jogosultsághoz.

---

## 10) Environment változók

| Változó | Hozzáférés |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Publikus (kliens + szerver) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publikus (kliens + szerver) |
| `SUPABASE_SERVICE_ROLE_KEY` | Csak szerver |
| `RAPIDAPI_KEY` | Csak szerver |
| `ANTHROPIC_API_KEY` | Csak szerver |

- `NEXT_PUBLIC_` prefix = kliens oldalon is elérhető – csak valóban publikus értékekre.
- Szerver-only változók **soha nem kerülnek `NEXT_PUBLIC_` prefixszel** a kódba.
- Mindig legyen naprakész `.env.local.example`.

---

## 11) README (kötelező)

- Tartalmazza a **feature lista**t rövid bullet point-okban.
- Dokumentálja a szükséges env változókat (csak neveket, titkos értékeket nem).
- Tartalmazza a Supabase Storage bucket-ek neveit, amelyeket manuálisan kell létrehozni: `avatars`, `news-images`, `product-images`.
- Frissítsd, ha új feature, route vagy endpoint kerül a projektbe.

---

## 12) Munkafolyamat szabályok (kötelező implementáció előtt)

Minden feladathoz:

1. Sorolj fel **3–7 bullet point**ban, hogy mi fog létrejönni vagy változni:
   - fájlok, route-ok, komponensek, lib fájlok, Server Action-ök, API route-ok.
2. Ha bármilyen döntési pont van, **állj meg és kérdezz implementáció előtt**.
3. Implementáció után:
   - Töröld az összes test-related artefaktot.
   - Ellenőrizd a mappastruktúrát (komponens / lib szétválasztás).
   - Frissítsd a README feature listát.
   - Ellenőrizd a `.env.local.example` teljességét.

---

## 13) Tilos / Kerülendő

- Tesztelési framework, config vagy fájl (Jest, Vitest, Cypress, Playwright).
- `useEffect` adatlekérésre – helyette szerver komponens + async/await.
- Kliens oldali fetch API-Football-hoz – mindig szerver oldali.
- `any` TypeScript típus indoklás nélkül.
- `style={{}}` prop Tailwind-del megoldható esetekben.
- `NEXT_PUBLIC_` prefix szerver-only kulcsokon.
- RLS nélküli Supabase tábla.
- Secret értékek repo fájlban.
- Nagy, monolitikus komponensek (150+ sor) – bontsd szét.
- Pages Router – kizárólag App Router.