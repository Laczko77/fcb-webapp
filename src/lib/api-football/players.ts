import { apiFetch } from './client'
import { BARCA_TEAM_ID, CURRENT_SEASON, LA_LIGA_ID } from './matches'
import type { ApiPlayer, ApiPlayerWithStats } from './types'

export async function getSquad(): Promise<ApiPlayer[]> {
  const data = await apiFetch<ApiPlayerWithStats[]>('players', {
    team: String(BARCA_TEAM_ID),
    season: String(CURRENT_SEASON),
  })

  return data.response.map(({ player }) => ({ player }))
}

export async function getPlayerStats(
  playerId: number,
): Promise<ApiPlayerWithStats | null> {
  const data = await apiFetch<ApiPlayerWithStats[]>('players', {
    id: String(playerId),
    season: String(CURRENT_SEASON),
    league: String(LA_LIGA_ID),
  })

  return data.response[0] ?? null
}

export async function getTopScorers(count: number): Promise<ApiPlayerWithStats[]> {
  const data = await apiFetch<ApiPlayerWithStats[]>('players/topscorers', {
    league: String(LA_LIGA_ID),
    season: String(CURRENT_SEASON),
  })

  return data.response.slice(0, count)
}
