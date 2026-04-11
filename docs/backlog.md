# FC Barcelona Fan Webapp — Project Backlog

## Scope Summary

Egy FC Barcelona rajongói webapp, ahol a felhasználók regisztrálhatnak, híreket olvashatnak, meccseredményeket követhetnek, jegyet vásárolhatnak, böngészhetnek a webshopban, és részt vehetnek a rajongói közösségben (chat, szavazások). Az alkalmazás Next.js 14 (App Router, Server Actions), Tailwind CSS, shadcn/ui, Supabase és API-Football (RapidAPI) alapokon épül, OpenRouter-alapú AI chatbottal kiegészítve.

---

## Backlog Progress

| Metrika              | Érték |
|----------------------|-------|
| Összes feladat       | 42    |
| Elvégzett feladat    | 15    |
| Hátralévő feladat    | 27    |
| Készültség           | ~36%  |

---

## Iterációk

---

## FÁZIS 0 – Projekt alap

### Iter 0.1 – Next.js projekt + konfiguráció

**Státusz:** DONE

**Cél:** Inicializálja a Next.js 14 projektet App Router-rel, Tailwind CSS-sel és shadcn/ui-val, valamint beállítja a szükséges környezeti változókat és függőségeket.

**UI szükséges:** Nem

**Feladatok:**

- [x] 0.1.1 Next.js 14 projekt inicializálása TypeScript-tel, Tailwind CSS-sel, App Router-rel
- [x] 0.1.2 shadcn/ui telepítése és inicializálása (default stílus)
- [x] 0.1.3 Szükséges csomagok telepítése: `@supabase/supabase-js`, `@supabase/ssr`, `zustand`
- [x] 0.1.4 `.env.local` fájl létrehozása placeholder kulcsokkal (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RAPIDAPI_KEY`, `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `NEXT_PUBLIC_USE_MOCK_API`)
- [x] 0.1.5 `.env.local.example` fájl létrehozása ugyanazokkal a kulcsokkal
- [x] 0.1.6 `next.config.ts` kiegészítése Supabase env változó hivatkozásokkal

**Elfogadási kritériumok:**

- `npm run dev` elindítja az alkalmazást hiba nélkül
- Minden szükséges csomag telepítve és importálható
- `.env.local` és `.env.local.example` fájlok léteznek a megfelelő kulcsokkal

**Függőségek:** Nincs

---

### Iter 0.2 – Supabase séma + RLS + Storage

**Státusz:** DONE

**Cél:** Felállítja a teljes adatbázis-struktúrát Supabase-ben: táblák, RLS policy-k, role szinkronizáló trigger, seed fájl és Storage bucket dokumentáció.

**UI szükséges:** Nem

**Feladatok:**

- [x] 0.2.1 `supabase/migrations/001_initial_schema.sql` létrehozása az összes táblával: `profiles`, `news`, `products`, `orders`, `match_tickets`, `purchased_tickets`, `polls`, `poll_votes`, `chat_messages`, `player_descriptions`
- [x] 0.2.2 RLS policy-k definiálása minden táblára (public read, own read/insert, admin all)
- [x] 0.2.3 JWT role szinkronizáló trigger hozzáadása a migrációhoz (`sync_role_to_jwt`)
- [x] 0.2.4 `supabase/seed.sql` létrehozása admin felhasználó template-tel és JWT claim szinkronizálással
- [x] 0.2.5 `README.md` kiegészítése a manuálisan létrehozandó Storage bucket nevekkel: `avatars`, `news-images`, `product-images`

**Elfogadási kritériumok:**

- A migrációs fájl futtatható a Supabase SQL editor-ban hiba nélkül
- Minden tábla létrejön a megadott oszlopokkal és constraint-ekkel
- RLS aktív minden táblán, policy-k érvényesek
- A trigger automatikusan szinkronizálja a role-t a JWT-be

**Függőségek:** Iter 0.1

---

### Iter 0.3 – Supabase kliensek + layout

**Státusz:** DONE

**Cél:** Létrehozza a Supabase kliens utility-kat, a middleware-t (auth + role guard), az alap layout-ot Navbar- és Footer-rel.

**UI szükséges:** Igen

**Feladatok:**

- [x] 0.3.1 `src/lib/supabase/client.ts` létrehozása (böngésző oldali kliens)
- [x] 0.3.2 `src/lib/supabase/server.ts` létrehozása (szerver oldali kliens, cookies-szal)
- [x] 0.3.3 `src/lib/supabase/middleware.ts` létrehozása (session frissítő helper)
- [x] 0.3.4 `src/middleware.ts` létrehozása: védett route-ok kezelése, admin role ellenőrzés JWT `app_metadata`-ból (DB query NÉLKÜL)
- [x] 0.3.5 `src/app/layout.tsx` létrehozása Inter fonttal, `<html lang="hu">` taggel
- [x] 0.3.6 `src/components/layout/Navbar.tsx` létrehozása (guest / user / admin nézetek, kijelentkezés)
- [x] 0.3.7 `src/components/layout/Footer.tsx` létrehozása
- [x] 0.3.8 `src/app/(protected)/layout.tsx` és `src/app/(guest)/layout.tsx` létrehozása

**Elfogadási kritériumok:**

- Nem bejelentkezett user a védett route-okról `/login`-ra kerül átirányításra
- Nem admin user az `/admin/**` route-okról `/dashboard`-ra kerül átirányításra
- Role ellenőrzés kizárólag JWT `app_metadata`-ból történik (nincs DB query a middleware-ben)
- A Navbar helyesen jeleníti meg a guest / user / admin nézeteket

**Függőségek:** Iter 0.2

---

## FÁZIS 1 – Auth

### Iter 1.1 – Regisztrációs oldal

**Státusz:** DONE

**Cél:** Felhasználói regisztrációs oldal létrehozása Supabase Auth-szal és profil insert-tel.

**UI szükséges:** Igen

**Feladatok:**

- [x] 1.1.1 shadcn/ui komponensek telepítése: `card`, `input`, `label`, `button`
- [x] 1.1.2 `src/app/(auth)/register/page.tsx` létrehozása (teljes név, email, jelszó, becenév mezőkkel)
- [x] 1.1.3 `src/app/(auth)/register/actions.ts` Server Action: `signUp` + `profiles` insert + redirect `/login?registered=true`-ra
- [x] 1.1.4 Sikeres regisztráció üzenet megjelenítése (`registered=true` query param esetén)
- [x] 1.1.5 Validációs hibák megjelenítése a mezők alatt

**Elfogadási kritériumok:**

- Sikeres regisztráció után a felhasználó a login oldalra kerül a visszaigazoló üzenettel
- A `profiles` táblába insert történik a user adataival
- Érvénytelen adatok esetén hibaüzenet jelenik meg
- Min. 6 karakteres jelszó megkövetelt

**Függőségek:** Iter 0.3

---

### Iter 1.2 – Bejelentkezési oldal

**Státusz:** DONE

**Cél:** Bejelentkezési oldal létrehozása email + jelszó alapú authentikációval.

**UI szükséges:** Igen

**Feladatok:**

- [x] 1.2.1 `src/app/(auth)/login/page.tsx` létrehozása (email, jelszó mezőkkel)
- [x] 1.2.2 `src/app/(auth)/login/actions.ts` Server Action: `signInWithPassword` + redirect `/dashboard`-ra
- [x] 1.2.3 Hibás bejelentkezés esetén hibaüzenet megjelenítése
- [x] 1.2.4 Link a regisztrációs oldalra

**Elfogadási kritériumok:**

- Sikeres bejelentkezés után `/dashboard`-ra irányít
- Hibás adatok esetén "Hibás email vagy jelszó" üzenet jelenik meg
- Már bejelentkezett user `/login`-ra navigálva automatikusan `/dashboard`-ra kerül

**Függőségek:** Iter 1.1

---

### Iter 1.3 – Auth helper + user lekérés

**Státusz:** DONE

**Cél:** Szerver oldali auth helper függvények létrehozása a védett oldalak számára.

**UI szükséges:** Nem

**Feladatok:**

- [x] 1.3.1 `src/lib/auth/getUser.ts` létrehozása: `{ user, profile }` visszaadása szerver oldalon
- [x] 1.3.2 `src/lib/auth/requireAuth.ts` létrehozása: user nélkül redirect `/login`-ra
- [x] 1.3.3 `src/lib/auth/requireAdmin.ts` létrehozása: nem admin esetén redirect `/dashboard`-ra

**Elfogadási kritériumok:**

- `getUser()` visszaadja a user-t és a profilt, vagy `null`-t mindkettőre
- `requireAuth()` hiba nélkül redirect-el, ha nincs session
- `requireAdmin()` nem admin esetén redirect-el

**Függőségek:** Iter 1.2

---

## FÁZIS 2 – Landing Page

### Iter 2.1 – Landing page alap struktúra

**Státusz:** DONE

**Cél:** Nyilvános landing page létrehozása Hero-, Klubról- és Fan oldal bemutató szekciókkal.

**UI szükséges:** Igen

**Feladatok:**

- [x] 2.1.1 `src/app/(guest)/page.tsx` létrehozása
- [x] 2.1.2 Hero szekció: teljes képernyős, "Més que un club" cím, alcím, Regisztráció + Bejelentkezés gombok
- [x] 2.1.3 Klubról szekció: 3 statisztikai kártya (1899 óta, 125+ trófea, Més que un club)
- [x] 2.1.4 Fan oldal bemutató szekció: rövid szöveges leírás

**Elfogadási kritériumok:**

- Az oldal bejelentkezés nélkül elérhető
- A CTA gombok a megfelelő route-okra mutatnak
- Reszponzív megjelenés

**Függőségek:** Iter 0.3

---

### Iter 2.2 – Feature kártyák szekció

**Státusz:** DONE

**Cél:** Feature grid és CTA banner hozzáadása a landing page-hez.

**UI szükséges:** Igen

**Feladatok:**

- [x] 2.2.1 Feature grid szekció: 4 kártya (Hírek, Jegyvásárlás, Webshop, Közösség) lucide-react ikonokkal
- [x] 2.2.2 CTA banner szekció: "Csatlakozz a közösséghez" cím + "Regisztrálj most" gomb
- [x] 2.2.3 `lucide-react` csomag telepítése

**Elfogadási kritériumok:**

- Mind a 4 feature kártya megjelenik ikonnal, címmel és leírással
- CTA banner látható és a regisztrációs oldalra mutat

**Függőségek:** Iter 2.1

---

## FÁZIS 3 – API-Football integráció

### Iter 3.1 – API-Football kliens + mock layer + típusok

**Státusz:** DONE

**Cél:** API-Football kliens megvalósítása environment-based mock réteggel a napi API limit kezeléséhez, TypeScript típusok definiálása.

**UI szükséges:** Nem

**Feladatok:**

- [x] 3.1.1 `src/lib/api-football/mock.ts` létrehozása statikus fixture adatokkal (5 következő meccs, 5 eredmény, tabella, 3 játékos)
- [x] 3.1.2 `src/lib/api-football/client.ts` létrehozása: `apiFetch()` függvény mock/valódi váltással (`NEXT_PUBLIC_USE_MOCK_API`), 1 órás Next.js fetch cache
- [x] 3.1.3 `src/lib/api-football/types.ts` létrehozása: `ApiFixture`, `ApiPlayer`, `ApiPlayerStats`, `ApiStanding` típusok

**Elfogadási kritériumok:**

- `NEXT_PUBLIC_USE_MOCK_API=true` esetén a mock adatok kerülnek visszaadásra (nincs valódi API hívás)
- Az összes TypeScript típus exportált és használható
- Az `apiFetch()` 1 órás cache-sel működik valódi hívás esetén

**Függőségek:** Iter 0.1

---

### Iter 3.2 – Meccs lekérő függvények

**Státusz:** DONE

**Cél:** Meccsekhez tartozó API lekérő függvények megvalósítása.

**UI szükséges:** Nem

**Feladatok:**

- [x] 3.2.1 `src/lib/api-football/matches.ts` létrehozása: `BARCA_TEAM_ID`, `LA_LIGA_ID`, `CURRENT_SEASON` konstansok
- [x] 3.2.2 `getUpcomingMatches(count)` függvény implementálása
- [x] 3.2.3 `getRecentMatches(count)` függvény implementálása
- [x] 3.2.4 `getBarçaStanding()` függvény implementálása

**Elfogadási kritériumok:**

- Minden függvény visszaad adatokat mock módban
- A visszaadott adatok megfelelnek az `ApiFixture` és `ApiStanding` típusoknak

**Függőségek:** Iter 3.1

---

### Iter 3.3 – Játékos lekérő függvények

**Státusz:** DONE

**Cél:** Játékosokhoz tartozó API lekérő függvények megvalósítása.

**UI szükséges:** Nem

**Feladatok:**

- [x] 3.3.1 `src/lib/api-football/players.ts` létrehozása: `getSquad()` függvény
- [x] 3.3.2 `getPlayerStats(playerId)` függvény implementálása
- [x] 3.3.3 `getTopScorers(count)` függvény implementálása

**Elfogadási kritériumok:**

- Minden függvény visszaad adatokat mock módban
- A visszaadott adatok megfelelnek az `ApiPlayer` és `ApiPlayerStats` típusoknak

**Függőségek:** Iter 3.1

---

## FÁZIS 4 – Dashboard főoldal

### Iter 4.1 – Dashboard layout + hírek szekció

**Státusz:** DONE

**Cél:** Dashboard oldal és hírek szekció létrehozása.

**UI szükséges:** Igen

**Feladatok:**

- [x] 4.1.1 shadcn/ui komponensek telepítése: `card`, `badge`
- [x] 4.1.2 `src/app/(protected)/dashboard/page.tsx` szerver komponens létrehozása `requireAuth` hívással
- [x] 4.1.3 `src/components/dashboard/NewsSection.tsx` létrehozása: 3 legfrissebb publikált hír Supabase-ből
- [x] 4.1.4 `NewsSection` hozzáadása a dashboard page-hez

**Elfogadási kritériumok:**

- A dashboard csak bejelentkezett user számára elérhető
- 3 hír kártya jelenik meg képpel, címmel, kategóriával, dátummal és "Tovább" linkkel
- "Összes hír" link mutat a `/news` oldalra

**Függőségek:** Iter 1.3, Iter 0.2

---

### Iter 4.2 – Dashboard meccs szekció

**Státusz:** DONE

**Cél:** Következő meccs és utolsó eredmények megjelenítése a dashboardon.

**UI szükséges:** Igen

**Feladatok:**

- [x] 4.2.1 `src/components/dashboard/MatchSection.tsx` létrehozása try/catch blokkokkal
- [x] 4.2.2 Következő meccs megjelenítése: dátum, ellenfél, helyszín, "Jegyet venni" link (ha van jegy)
- [x] 4.2.3 Utolsó 3 eredmény kártyák megjelenítése
- [x] 4.2.4 `MatchSection` hozzáadása a dashboard page-hez

**Elfogadási kritériumok:**

- API hiba esetén graceful empty state jelenik meg (nem 500-as hiba)
- Következő meccs és utolsó 3 eredmény látható
- "Összes meccs" link mutat a `/matches` oldalra

**Függőségek:** Iter 4.1, Iter 3.2

---

### Iter 4.3 – Dashboard tabella + játékos szekció

**Státusz:** DONE

**Cél:** La Liga tabella (Barça sor) és top góllövők megjelenítése a dashboardon.

**UI szükséges:** Igen

**Feladatok:**

- [x] 4.3.1 `src/components/dashboard/StandingsSection.tsx` létrehozása try/catch blokkkal
- [x] 4.3.2 `src/components/dashboard/PlayersSection.tsx` létrehozása: 3 top góllövő kártya try/catch blokkkal
- [x] 4.3.3 Mindkét szekció hozzáadása a dashboard page-hez

**Elfogadási kritériumok:**

- Tabella: helyezés, pontok, győzelmek/döntetlenek/vereségek, gólkülönbség megjelenik
- API hiba esetén mindkét szekció graceful üres állapotot jelenít meg
- "Összes játékos" link mutat a `/players` oldalra

**Függőségek:** Iter 4.2, Iter 3.2, Iter 3.3

---

### Iter 4.4 – Dashboard trófeák + szavazás szekció

**Státusz:** DONE

**Cél:** Statikus trófeák szekció és aktív szavazás előnézet hozzáadása a dashboardhoz.

**UI szükséges:** Igen

**Feladatok:**

- [x] 4.4.1 `src/components/dashboard/TrophiesSection.tsx` létrehozása statikus adatokkal (La Liga: 27, Copa del Rey: 31, CL: 5, Supercopa: 15)
- [x] 4.4.2 `src/components/dashboard/PollSection.tsx` létrehozása: aktív szavazás Supabase-ből, "Hamarosan új szavazás" üres állapot
- [x] 4.4.3 Mindkét szekció hozzáadása a dashboard page-hez

**Elfogadási kritériumok:**

- Trófeák szekció statikusan megjelenik az összes adattal
- Aktív szavazás esetén a kérdés + link a `/community/polls`-ra jelenik meg
- Ha nincs aktív szavazás, "Hamarosan új szavazás" üzenet látható

**Függőségek:** Iter 4.3

---

## FÁZIS 5 – Hírek

### Iter 5.1 – Hírek listaoldal

**Státusz:** TODO

**Cél:** Publikált hírek listázása kategória szűrővel és paginationnal.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 5.1.1 `src/app/(protected)/news/page.tsx` szerver komponens létrehozása
- [ ] 5.1.2 Kategória szűrő gombok (URL search param alapján)
- [ ] 5.1.3 9 elem/oldal pagination ("Előző" / "Következő" gombok)
- [ ] 5.1.4 Hír kártya grid: kép, cím, kategória badge, dátum, "Olvasd tovább" link

**Elfogadási kritériumok:**

- Csak `published = true` hírek jelennek meg
- Kategória szűrő URL-alapon működik
- Pagination helyesen lapoz

**Függőségek:** Iter 4.1

---

### Iter 5.2 – Hír részletoldal

**Státusz:** TODO

**Cél:** Hír részletoldal létrehozása teljes tartalommal és metadata-val.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 5.2.1 `src/app/(protected)/news/[id]/page.tsx` szerver komponens létrehozása
- [ ] 5.2.2 Hír betöltése id alapján, `notFound()` ismeretlen id esetén
- [ ] 5.2.3 Megjelenítés: nagy kép, kategória badge, cím, dátum, teljes tartalom `<article>` tagben
- [ ] 5.2.4 Vissza gomb + `generateMetadata` (title = hír címe)

**Elfogadási kritériumok:**

- Ismeretlen id esetén 404 oldal jelenik meg
- A böngésző tab title a hír címét mutatja
- Vissza gomb a hírek listára navigál

**Függőségek:** Iter 5.1

---

## FÁZIS 6 – Meccsek + Jegyvásárlás

### Iter 6.1 – Meccsek listaoldal

**Státusz:** TODO

**Cél:** Következő meccsek és eredmények listázása jegyvásárlási linkkel.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 6.1.1 `src/app/(protected)/matches/page.tsx` szerver komponens létrehozása
- [ ] 6.1.2 `getUpcomingMatches(10)` és `getRecentMatches(10)` hívása
- [ ] 6.1.3 `match_tickets` lekérése Supabase-ből (jegy elérhetőség jelzéséhez)
- [ ] 6.1.4 Következő meccsek szekció: dátum, csapatok, helyszín, "Jegyet venni" gomb ha van jegy
- [ ] 6.1.5 Eredmények szekció: lejátszott meccsek végeredménnyel

**Elfogadási kritériumok:**

- Mindkét szekció megjelenik az API adatokkal
- "Jegyet venni" gomb csak azon meccsekhez jelenik meg, ahol van `match_tickets` bejegyzés

**Függőségek:** Iter 3.2, Iter 0.2

---

### Iter 6.2 – Stadion SVG térkép komponens

**Státusz:** TODO

**Cél:** Interaktív Camp Nou SVG térkép komponens létrehozása szektorválasztással.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 6.2.1 `src/components/stadium/StadiumMap.tsx` kliens komponens létrehozása
- [ ] 6.2.2 4 szektoros SVG térkép: `tribuna`, `gol_nord`, `gol_sud`, `lateral`
- [ ] 6.2.3 Kattintható SVG path elemek vizuális kiemelőssel a kiválasztott szektornál
- [ ] 6.2.4 Hover tooltip minden szektornál: szektor neve, ár, szabad helyek

**Elfogadási kritériumok:**

- Mind a 4 szektor kattintható és kiválasztható
- Kiválasztott szektornál vizuális visszajelzés (vastagabb stroke, eltérő fill)
- Tooltip megjeleníti az árat és a szabad helyek számát

**Függőségek:** Iter 3.1

---

### Iter 6.3 – Jegyvásárlás oldal

**Státusz:** TODO

**Cél:** Atomikus jegyvásárlás megvalósítása Supabase RPC-vel, jegyvásárlási oldal létrehozása.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 6.3.1 shadcn/ui dialog telepítése
- [ ] 6.3.2 `supabase/migrations/002_functions.sql` létrehozása az atomikus `purchase_tickets` RPC függvénnyel
- [ ] 6.3.3 `src/app/(protected)/tickets/[matchId]/page.tsx` létrehozása (meccs adatok + StadiumMap + vásárlási panel)
- [ ] 6.3.4 `src/app/(protected)/tickets/actions.ts` Server Action: `purchaseTickets()` – kizárólag RPC-n keresztül (közvetlen INSERT+UPDATE TILOS)
- [ ] 6.3.5 Sikeres vásárlás Dialog modal + redirect `/matches`-re

**Elfogadási kritériumok:**

- Jegyvásárlás atomikusan történik (race condition mentes)
- Kapacitás túllépése esetén hibaüzenet jelenik meg
- Sikeres vásárlás után a Dialog modal megjelenik és visszairányít

**Függőségek:** Iter 6.2, Iter 1.3

---

## FÁZIS 7 – Játékosok

### Iter 7.1 – Játékos lista oldal

**Státusz:** TODO

**Cél:** Keret játékosok listázása pozíció szűrővel.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 7.1.1 `src/app/(protected)/players/page.tsx` szerver komponens létrehozása
- [ ] 7.1.2 `getSquad()` hívása
- [ ] 7.1.3 Pozíció szűrő gombok URL search param alapján: Mind, Kapus, Védő, Középpályás, Támadó
- [ ] 7.1.4 Kártya grid: fotó, név, mez szám badge, pozíció, link `/players/[id]`-re

**Elfogadási kritériumok:**

- A szűrő helyesen szűri a játékosokat pozíció szerint
- Minden kártya az API-Football fotót mutatja
- Link a játékos részletoldalára mutat

**Függőségek:** Iter 3.3

---

### Iter 7.2 – Játékos részletoldal

**Státusz:** TODO

**Cél:** Játékos részletoldal statisztikákkal és AI-generált leírással (ha van).

**UI szükséges:** Igen

**Feladatok:**

- [ ] 7.2.1 `src/app/(protected)/players/[id]/page.tsx` szerver komponens létrehozása
- [ ] 7.2.2 `getPlayerStats(id)` hívása, `notFound()` ismeretlen id esetén
- [ ] 7.2.3 `player_descriptions` lekérése Supabase-ből az adott `api_player_id`-ra
- [ ] 7.2.4 Megjelenítés: nagy fotó, teljes név, mez szám, kor, állampolgárság, pozíció
- [ ] 7.2.5 Statisztika táblázat: Mérkőzések, Gólok, Gólpasszok, Sárga lapok, Piros lapok
- [ ] 7.2.6 Leírás megjelenítése ha van, Vissza gomb, `generateMetadata`

**Elfogadási kritériumok:**

- Ismeretlen id esetén 404 oldal jelenik meg
- Statisztikák és leírás (ha van) megjelennek
- Tab title a játékos nevét mutatja

**Függőségek:** Iter 7.1, Iter 0.2

---

## FÁZIS 8 – Webshop

### Iter 8.1 – Termék lista oldal + kosár store

**Státusz:** TODO

**Cél:** Zustand kosár store létrehozása SSR-kompatibilis módon, termékek listázása kategória szűrővel.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 8.1.1 `src/lib/store/cartStore.ts` Zustand store létrehozása `persist` + `skipHydration: true` flag-gel
- [ ] 8.1.2 `src/app/(protected)/shop/page.tsx` szerver komponens: termékek Supabase-ből, kategória szűrő
- [ ] 8.1.3 `src/components/layout/CartIcon.tsx` kliens komponens: kosár tétel szám badge, Navbar-ba integrálva

**Elfogadási kritériumok:**

- Kosár state SSR-en nem okoz hydration mismatch-et (`skipHydration: true`)
- Minden kliens komponensben `useEffect(() => { useCartStore.persist.rehydrate(); }, [])` meghívva
- Kategória szűrő URL search param alapján működik

**Függőségek:** Iter 4.1

---

### Iter 8.2 – Termék részletoldal

**Státusz:** TODO

**Cél:** Termék részletoldal méretválasztással és "Kosárba" funkcióval.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 8.2.1 shadcn/ui toast telepítése
- [ ] 8.2.2 `src/app/(protected)/shop/[id]/page.tsx` kliens komponens létrehozása
- [ ] 8.2.3 Nagy kép, termék neve, ára, leírása, méret select (ha van `sizes` tömb), darabszám input
- [ ] 8.2.4 "Kosárba" gomb: `cartStore.addItem` + toast megjelenítése
- [ ] 8.2.5 Vissza gomb + `generateMetadata`

**Elfogadási kritériumok:**

- Ismeretlen id esetén 404 oldal jelenik meg
- Méretválasztó csak akkor jelenik meg, ha a `sizes` tömb nem üres
- Toast értesítés jelenik meg kosárba helyezés után

**Függőségek:** Iter 8.1

---

### Iter 8.3 – Kosár + szimulált checkout

**Státusz:** TODO

**Cél:** Kosár oldal létrehozása rendelés leadás funkcióval.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 8.3.1 `src/app/(protected)/shop/cart/page.tsx` kliens komponens: tételek listázása +/- darabszám, sor ár, törlés, végösszeg
- [ ] 8.3.2 Üres kosár állapot: "A kosár üres" + "Vissza a shopba" link
- [ ] 8.3.3 `src/app/(protected)/shop/cart/actions.ts` Server Action: `placeOrder()` – `orders` insert
- [ ] 8.3.4 Sikeres rendelés Dialog modal rendelés ID-val + redirect `/shop`-ra + `clearCart()` hívás

**Elfogadási kritériumok:**

- Kosár tartalom a Zustand store-ból töltődik be
- Rendelés leadása után az `orders` táblába kerül a rekord
- Kosár kiürül rendelés után, Dialog modal megjelenik az order ID-val

**Függőségek:** Iter 8.2, Iter 1.3

---

## FÁZIS 9 – Közösség

### Iter 9.1 – Szavazás oldal (megjelenítés)

**Státusz:** TODO

**Cél:** Aktív szavazások megjelenítése, a már leadott szavazatok eredményének Progress bar-os vizualizációja.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 9.1.1 shadcn/ui progress telepítése
- [ ] 9.1.2 `src/app/(protected)/community/polls/page.tsx` szerver komponens létrehozása
- [ ] 9.1.3 Aktív szavazások lekérése (`is_active = true`, `expires_at > now()` vagy null)
- [ ] 9.1.4 Már szavazott állapot: Progress bar-os eredmény nézet, helyes opció kiemelve
- [ ] 9.1.5 Még nem szavazott állapot: opció gombok (kliens komponens)

**Elfogadási kritériumok:**

- Az oldal helyesen jeleníti meg a már szavazott / még nem szavazott állapotot
- Progress bar-ok az arányokat vizuálisan mutatják

**Függőségek:** Iter 4.4

---

### Iter 9.2 – Szavazat leadás + pontrendszer

**Státusz:** TODO

**Cél:** Szavazás leadása Server Action-nel, pontszám jóváírás helyes válasz esetén – `correct_option != null` check-kel.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 9.2.1 `src/app/(protected)/community/polls/actions.ts` Server Action: `castVote()` – dupla szavazás ellenőrzés, insert, pontszám jóváírás
- [ ] 9.2.2 **Kötelező:** `correct_option != null` check (NEM `if(correct_option)` – ez 0 index esetén hibás!)
- [ ] 9.2.3 `src/components/polls/PollCard.tsx` kliens komponens: szavazó gombok / eredmény nézet váltás

**Elfogadási kritériumok:**

- Dupla szavazás nem lehetséges (unique constraint)
- Helyes válasz esetén 10 pont kerül jóváírásra a profil pontszámához
- A helyes opció (index 0 esetén is) helyesen ismert fel mint helyes

**Függőségek:** Iter 9.1

---

### Iter 9.3 – Chat oldal

**Státusz:** TODO

**Cél:** Valós idejű chat oldal Supabase Realtime-mal és kapcsolat megszakadás jelzővel.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 9.3.1 `src/app/(protected)/community/chat/page.tsx` szerver komponens: utolsó 50 üzenet betöltése
- [ ] 9.3.2 `src/components/chat/ChatWindow.tsx` kliens komponens Supabase Realtime feliratkozással
- [ ] 9.3.3 **Kapcsolat státusz tracking:** `"⚠️ Kapcsolat megszakadt – újracsatlakozás..."` sárga üzenet ha `!connected`
- [ ] 9.3.4 Auto-scroll az utolsó üzenetre, avatar (initials fallback), Enter billentyűre küld
- [ ] 9.3.5 `src/app/(protected)/community/chat/actions.ts` Server Action: `sendMessage()`

**Elfogadási kritériumok:**

- Új üzenetek valós időben jelennek meg
- Kapcsolat megszakadásakor sárga figyelmeztető üzenet látható
- Üres üzenet nem küldhető
- Auto-scroll az utolsó üzenetre

**Függőségek:** Iter 1.3

---

## FÁZIS 10 – Profil

### Iter 10.1 – Profil oldal (adatok + kép)

**Státusz:** TODO

**Cél:** Profil oldal létrehozása avatar feltöltéssel, becenév szerkesztéssel és jelszó változtatással.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 10.1.1 shadcn/ui komponensek telepítése: `avatar`, `separator`
- [ ] 10.1.2 `src/app/(protected)/profile/page.tsx` szerver komponens létrehozása
- [ ] 10.1.3 `src/components/profile/AvatarUpload.tsx`: Supabase Storage `avatars` bucket, 2MB limit, preview
- [ ] 10.1.4 `src/components/profile/UpdateProfileForm.tsx`: becenév szerkesztés Server Action-nel
- [ ] 10.1.5 `src/components/profile/ChangePasswordForm.tsx`: jelszó változtatás `supabase.auth.updateUser`-rel

**Elfogadási kritériumok:**

- Avatar feltöltés után a kép megjelenik a profilon
- Becenév szerkesztés mentése megjelenik a Navbar-ban
- Jelszó változtatás hiba esetén hibaüzenetet jelenít meg

**Függőségek:** Iter 1.3

---

### Iter 10.2 – Profil: saját jegyek + rendelések

**Státusz:** TODO

**Cél:** Felhasználó saját jegyeinek és rendeléseinek megjelenítése a profil oldalon.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 10.2.1 `src/components/profile/MyTickets.tsx` szerver komponens: vásárolt jegyek listája JOIN-nal
- [ ] 10.2.2 `src/components/profile/MyOrders.tsx` szerver komponens: rendelések listája
- [ ] 10.2.3 Mindkét komponens hozzáadása a `profile/page.tsx` alsó részéhez

**Elfogadási kritériumok:**

- Jegyek: meccs api_match_id, szektor, darabszám, dátum megjelenik
- Rendelések: order ID (első 8 char), dátum, összeg, státusz badge megjelenik
- Üres állapot üzenetek: "Még nem vásároltál jegyet." / "Még nincs rendelésed."

**Függőségek:** Iter 10.1, Iter 6.3, Iter 8.3

---

## FÁZIS 11 – Chatbot

### Iter 11.1 – Chatbot API route (OpenRouter)

**Státusz:** TODO

**Cél:** OpenRouter-alapú AI chatbot API route létrehozása streaming válasszal és az utolsó 10 üzenet limit-tel.

**UI szükséges:** Nem

**Feladatok:**

- [ ] 11.1.1 `openai` npm csomag telepítése
- [ ] 11.1.2 `src/app/api/chatbot/route.ts` POST route létrehozása OpenRouter klienssel
- [ ] 11.1.3 Supabase session ellenőrzés (401 ha nincs bejelentkezett user)
- [ ] 11.1.4 System prompt: FC Barcelona asszisztens, magyar nyelv, rajongói témák
- [ ] 11.1.5 Max 10 előző üzenet küldése: `messages.slice(-10)`
- [ ] 11.1.6 Streaming response megvalósítása

**Elfogadási kritériumok:**

- Bejelentkezés nélkül 401 választ ad
- A válasz streamelve érkezik
- A system prompt helyesen korlátozza a chatbot témáit
- `OPENROUTER_MODEL` env változóból olvassa a modellt (default: `anthropic/claude-haiku`)

**Függőségek:** Iter 1.3, Iter 0.1

---

### Iter 11.2 – Chatbot UI widget + rate limiting

**Státusz:** TODO

**Cél:** Jobb alsó sarokban rögzített chatbot widget létrehozása kliens oldali rate limittel.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 11.2.1 shadcn/ui sheet telepítése
- [ ] 11.2.2 `src/components/chatbot/ChatbotWidget.tsx` kliens komponens: fixed bottom-right gomb, Sheet panel
- [ ] 11.2.3 **Kliens oldali rate limit:** 20 üzenet/session limit, disabled küldés gomb + figyelmeztető üzenet
- [ ] 11.2.4 Streaming response olvasása `ReadableStream`-mel, karakterenkénti append
- [ ] 11.2.5 `ChatbotWidget` hozzáadása a `(protected)/layout.tsx`-hez

**Elfogadási kritériumok:**

- 20 üzenet után a küldés gomb disabled és figyelmeztető szöveg jelenik meg
- Streaming válasz karakterenként jelenik meg
- User üzenetek jobbra, asszisztens üzenetek balra igazítva
- Betöltés közben "..." animáció látható

**Függőségek:** Iter 11.1

---

## FÁZIS 12 – Admin felület

### Iter 12.1 – Admin layout + dashboard

**Státusz:** TODO

**Cél:** Admin layout sidebar navigációval és statisztikai dashboard-dal.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 12.1.1 `src/app/admin/layout.tsx` létrehozása `requireAdmin()` hívással és bal oldali sidebar navigációval
- [ ] 12.1.2 `src/app/admin/page.tsx` szerver komponens: 4 statisztikai kártya Supabase count query-kkel
- [ ] 12.1.3 Sidebar linkek: Áttekintés, Hírek, Termékek, Meccsek/Jegyek, Játékosok, Szavazások

**Elfogadási kritériumok:**

- Nem admin user az admin route-okról átirányításra kerül
- 4 statisztikai kártya megjelenik aktuális adatokkal
- Sidebar navigáció minden admin oldalra mutat

**Függőségek:** Iter 1.3

---

### Iter 12.2 – Admin: Hírek CRUD

**Státusz:** TODO

**Cél:** Teljes CRUD felület hírek kezeléséhez az admin felületen.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 12.2.1 `src/app/admin/news/page.tsx` szerver komponens: hírek táblázat Szerkesztés + Törlés gombokkal
- [ ] 12.2.2 `src/app/admin/news/new/page.tsx`: hír létrehozó form (cím, slug, kategória, tartalom, kép, publikált)
- [ ] 12.2.3 `createNews` Server Action: Supabase insert, kép feltöltés `news-images` bucket-be
- [ ] 12.2.4 `src/app/admin/news/[id]/edit/page.tsx`: szerkesztő form előre kitöltve
- [ ] 12.2.5 `updateNews` és `deleteNews` Server Action-ök (kép törlés Storage-ból is)

**Elfogadási kritériumok:**

- Hírek listája táblázatban jelenik meg szerkesztés/törlés gombokkal
- Slug auto-generálódik a címből kebab-case-re, de szerkeszthető marad
- Kép törléskor a Storage-ból is eltávolításra kerül

**Függőségek:** Iter 12.1

---

### Iter 12.3 – Admin: Termékek CRUD

**Státusz:** TODO

**Cél:** Teljes CRUD felület termékek kezeléséhez az admin felületen.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 12.3.1 `src/app/admin/products/page.tsx` szerver komponens: termékek listázása Szerkesztés + Törlés gombokkal
- [ ] 12.3.2 `src/app/admin/products/new/page.tsx`: termék létrehozó form (dinamikus méretek listával, kép feltöltés `product-images` bucket)
- [ ] 12.3.3 `createProduct` Server Action
- [ ] 12.3.4 `src/app/admin/products/[id]/edit/page.tsx`: szerkesztő form előre kitöltve
- [ ] 12.3.5 `updateProduct` és `deleteProduct` Server Action-ök (kép törlés Storage-ból is)

**Elfogadási kritériumok:**

- Dinamikus méretek lista: "Méret hozzáadása" gombbal bővíthető
- Kép feltöltés a `product-images` bucket-be történik
- Kép törléskor a Storage-ból is eltávolításra kerül

**Függőségek:** Iter 12.1

---

### Iter 12.4 – Admin: Meccs jegyek kezelése

**Státusz:** TODO

**Cél:** Admin felület meccs jegyek hozzáadásához szektoros kiosztással.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 12.4.1 `src/app/admin/matches/page.tsx` szerver komponens: köv. meccsek + `match_tickets` állapotuk
- [ ] 12.4.2 `src/components/admin/AddTicketForm.tsx` kliens komponens: Dialog form 4 szektorra (checkbox + ár + kapacitás)
- [ ] 12.4.3 `addMatchTickets` Server Action: csak a bepipált szektorokhoz insert
- [ ] 12.4.4 Törlés gomb meglévő jegyekhez

**Elfogadási kritériumok:**

- Csak a bejelölt szektorok kerülnek mentésre
- Meglévő jegyek táblázatban láthatók (szektor, ár, kapacitás, eladott, szabad)
- "Jegy hozzáadása" gomb azon meccsekhez jelenik meg ahol nincs jegy

**Függőségek:** Iter 12.1, Iter 3.2

---

### Iter 12.5 – Admin: Játékos leírások + AI auto-generate

**Státusz:** TODO

**Cél:** Játékos leírások kezelése admin felületen, OpenRouter AI auto-generálással.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 12.5.1 `src/app/admin/players/page.tsx` szerver komponens: játékosok listája leírás állapottal
- [ ] 12.5.2 `src/app/admin/players/[id]/edit/page.tsx`: leírás szerkesztő Textarea
- [ ] 12.5.3 "✨ AI generál" gomb: POST `/api/chatbot`-ra küld játékos adatokkal (név, pozíció, kor, állampolgárság)
- [ ] 12.5.4 Generált szöveg a Textarea-ba kerül (szerkeszthető marad mentés előtt)
- [ ] 12.5.5 `upsertPlayerDescription` Server Action: `INSERT ... ON CONFLICT DO UPDATE`

**Elfogadási kritériumok:**

- AI gomb betöltés közben disabled
- Generált szöveg szerkeszthető marad a mentés előtt
- Upsert helyesen frissíti a meglévő leírást

**Függőségek:** Iter 12.1, Iter 11.1, Iter 3.3

---

### Iter 12.6 – Admin: Szavazások CRUD + Top szavazók

**Státusz:** TODO

**Cél:** Szavazások teljes CRUD kezelése és havi top szavazók megjelenítése.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 12.6.1 `src/app/admin/polls/page.tsx`: szavazások listája (Szerkesztés, Aktiválás/Deaktiválás, Törlés)
- [ ] 12.6.2 `src/app/admin/polls/new/page.tsx`: dinamikus opció lista (min 2, max 6), helyes opció radio group, lejárat mező
- [ ] 12.6.3 `createPoll` Server Action
- [ ] 12.6.4 `src/app/admin/polls/[id]/edit/page.tsx`: readonly kérdés/opciók ha van már szavazat
- [ ] 12.6.5 `updatePoll` és `deletePoll` Server Action-ök
- [ ] 12.6.6 `src/app/admin/polls/top/page.tsx`: havi Top 10 szavazó táblázat (helyezés, becenév, szavazatok, pontszám)

**Elfogadási kritériumok:**

- Szavazat esetén kérdés és opciók readonly-k a szerkesztő formban
- Dinamikus opció lista min 2 / max 6 opcióval
- Top szavazók aktuális hónapra szűrve jelennek meg

**Függőségek:** Iter 12.1, Iter 9.2

---

## FÁZIS 13 – Csiszolás

### Iter 13.1 – Loading skeleton-ök

**Státusz:** TODO

**Cél:** Loading skeleton komponensek hozzáadása a főbb oldalakhoz.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 13.1.1 shadcn/ui skeleton telepítése
- [ ] 13.1.2 `src/app/(protected)/dashboard/loading.tsx` – 3 hír + meccs skeleton
- [ ] 13.1.3 `src/app/(protected)/news/loading.tsx` – 9 kártya skeleton grid
- [ ] 13.1.4 `src/app/(protected)/players/loading.tsx` – 12 kártya skeleton grid
- [ ] 13.1.5 `src/app/(protected)/shop/loading.tsx` – 9 kártya skeleton grid
- [ ] 13.1.6 `src/app/(protected)/matches/loading.tsx` – 5 meccs skeleton

**Elfogadási kritériumok:**

- Minden `loading.tsx` a megfelelő oldal layout-ját tükrözi skeleton formában
- shadcn `Skeleton` komponens használata

**Függőségek:** Iter 4.4, Iter 5.1, Iter 7.1, Iter 8.1, Iter 6.1

---

### Iter 13.2 – Error boundary-k + empty state-ek

**Státusz:** TODO

**Cél:** Error boundary-k és üres állapot UI elemek hozzáadása.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 13.2.1 `src/app/(protected)/dashboard/error.tsx` kliens komponens létrehozása
- [ ] 13.2.2 `src/app/(protected)/news/error.tsx` kliens komponens létrehozása
- [ ] 13.2.3 `src/app/(protected)/matches/error.tsx` kliens komponens létrehozása
- [ ] 13.2.4 Üres állapot UI: `NewsSection.tsx` – "Még nincsenek hírek."
- [ ] 13.2.5 Üres állapot UI: `players/page.tsx` – "Nincs játékos a szűrési feltételek alapján."
- [ ] 13.2.6 Üres állapot UI: `shop/page.tsx` – "Nincs termék ebben a kategóriában."

**Elfogadási kritériumok:**

- Minden error.tsx tartalmazza: "Hiba történt" cím, `error.message`, "Próbáld újra" gomb
- "Próbáld újra" gomb a `reset()` callback-et hívja
- Üres állapot UI ikon + szöveg kombinációval jelenik meg

**Függőségek:** Iter 13.1

---

### Iter 13.3 – Reszponzív Navbar

**Státusz:** TODO

**Cél:** Mobil hamburger menü hozzáadása a Navbar-hoz.

**UI szükséges:** Igen

**Feladatok:**

- [ ] 13.3.1 `Navbar.tsx` kiegészítése mobil hamburger menüvel (`useState`-tel nyitható/csukható)
- [ ] 13.3.2 `md` breakpoint felett: vízszintes nav linkek; alatta: hamburger gomb (Menu / X ikon)
- [ ] 13.3.3 Navigációs linkre kattintva a dropdown záródjon be

**Elfogadási kritériumok:**

- Mobilon hamburger gomb jelenik meg
- A dropdown záródik navigálás után
- Asztali nézetben a vízszintes menü megmarad

**Függőségek:** Iter 0.3

---

### Iter 13.4 – SEO metadata

**Státusz:** TODO

**Cél:** Alap és dinamikus oldal metadata hozzáadása SEO-hoz.

**UI szükséges:** Nem

**Feladatok:**

- [ ] 13.4.1 `src/app/layout.tsx` alap metadata: `title` template + description
- [ ] 13.4.2 `generateMetadata` `news/[id]/page.tsx`-ben: title = hír `title` mezője
- [ ] 13.4.3 `generateMetadata` `players/[id]/page.tsx`-ben: title = játékos neve
- [ ] 13.4.4 `generateMetadata` `shop/[id]/page.tsx`-ben: title = termék neve
- [ ] 13.4.5 `generateMetadata` `tickets/[matchId]/page.tsx`-ben: title = "Jegyvásárlás – [hazai] vs [vendég]"

**Elfogadási kritériumok:**

- Alap title template: `BarcaPulse | [oldal cím]` formátum
- Dinamikus oldalak tab title-je a megfelelő tartalmat mutatja
- Alap description: 'Az FC Barcelona rajongóinak közössége'

**Függőségek:** Iter 13.2

---

## Összefoglaló

| Fázis | Iterációk | Becsült komplexitás |
|---|---|---|
| 0 – Projekt alap | 3 | Alacsony |
| 1 – Auth | 3 | Alacsony |
| 2 – Landing | 2 | Alacsony |
| 3 – API-Football | 3 | Közepes |
| 4 – Dashboard | 4 | Közepes |
| 5 – Hírek | 2 | Alacsony |
| 6 – Meccsek + Jegyek | 3 | Magas |
| 7 – Játékosok | 2 | Közepes |
| 8 – Webshop | 3 | Közepes |
| 9 – Közösség | 3 | Közepes |
| 10 – Profil | 2 | Közepes |
| 11 – Chatbot | 2 | Közepes |
| 12 – Admin | 6 | Magas |
| 13 – Csiszolás | 4 | Alacsony |
| **Összesen** | **42** | |