---
name: API-Football Client Layer
description: apiFetch function signature, mock switching logic, endpoint keys, and constants for API-Football v3 integration
type: project
---

## Files

- `src/lib/api-football/types.ts` — shared TypeScript types (ApiFixture, ApiPlayer, ApiPlayerWithStats, ApiPlayerStats, ApiStanding, ApiResponse<T>)
- `src/lib/api-football/mock.ts` — static mock data exported as typed ApiResponse objects
- `src/lib/api-football/client.ts` — `apiFetch<T>(endpoint, params)` function
- `src/lib/api-football/matches.ts` — `getUpcomingMatches(count)`, `getRecentMatches(count)`, `getBarcaStanding()` — exports BARCA_TEAM_ID, LA_LIGA_ID, CURRENT_SEASON constants
- `src/lib/api-football/players.ts` — `getSquad()`, `getPlayerStats(playerId)`, `getTopScorers(count)`

## apiFetch signature

```ts
apiFetch<T>(endpoint: string, params: Record<string, string>): Promise<ApiResponse<T>>
```

Returns the full API envelope including `response: T`.

## Mock switching

`NEXT_PUBLIC_USE_MOCK_API=true` in env causes `apiFetch` to return mock data without a network call.
Mock resolver key logic in `client.ts`:
- `fixtures` + `next` param → mockUpcomingFixtures
- `fixtures` + `last` param → mockRecentFixtures
- `standings` → mockStandings
- `players` → mockPlayers (used for both squad and per-player stats in mock mode)
- `players/topscorers` → fallback empty response (no dedicated mock exists yet)

## Constants (defined in consuming code, not the client itself)

```ts
const BARCA_TEAM_ID = 529
const LA_LIGA_ID = 140
const CURRENT_SEASON = 2025
```

## Required env vars

- `RAPIDAPI_KEY` — server-side only, never expose to client
- `NEXT_PUBLIC_USE_MOCK_API` — "true" | "false", controls mock layer

## Caching

Real API calls use `fetch(..., { next: { revalidate: 3600 } })`.

**Why:** API-Football has rate limits; caching for 1h is the project policy.
**How to apply:** Always use apiFetch (never raw fetch) for API-Football calls from server components/actions.
