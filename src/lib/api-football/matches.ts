import { apiFetch } from './client'
import type { ApiFixture, ApiStanding } from './types'

export const BARCA_TEAM_ID = 529
export const LA_LIGA_ID = 140
export const CURRENT_SEASON = 2024

export async function getUpcomingMatches(count: number): Promise<ApiFixture[]> {
  const data = await apiFetch<ApiFixture[]>('fixtures', {
    team: String(BARCA_TEAM_ID),
    next: String(count),
    status: 'NS',
  })
  return data.response
}

export async function getRecentMatches(count: number): Promise<ApiFixture[]> {
  const data = await apiFetch<ApiFixture[]>('fixtures', {
    team: String(BARCA_TEAM_ID),
    last: String(count),
    status: 'FT',
  })
  return data.response
}

export async function getBarcaStanding(): Promise<ApiStanding | null> {
  const data = await apiFetch<ApiStanding[][]>('standings', {
    league: String(LA_LIGA_ID),
    season: String(CURRENT_SEASON),
  })

  const table = data.response[0]
  if (!table) return null

  return table.find((entry) => entry.team.id === BARCA_TEAM_ID) ?? null
}
