import type { ApiResponse } from './types'
import {
  mockUpcomingFixtures,
  mockRecentFixtures,
  mockStandings,
  mockPlayers,
} from './mock'

const API_BASE = 'https://v3.football.api-sports.io'

// ---------------------------------------------------------------------------
// Mock resolver — returns mock data based on endpoint + params
// ---------------------------------------------------------------------------
function resolveMock(endpoint: string, params: Record<string, string>): ApiResponse<unknown> {
  if (endpoint === 'fixtures') {
    if ('next' in params) return mockUpcomingFixtures
    if ('last' in params) return mockRecentFixtures
    return mockUpcomingFixtures
  }

  if (endpoint === 'standings') {
    return mockStandings
  }

  if (endpoint === 'players') {
    return mockPlayers
  }

  // Fallback — empty response
  return {
    get: endpoint,
    parameters: params,
    errors: [],
    results: 0,
    paging: { current: 1, total: 1 },
    response: [],
  }
}

// ---------------------------------------------------------------------------
// Main fetch function
// ---------------------------------------------------------------------------
export async function apiFetch<T>(
  endpoint: string,
  params: Record<string, string>,
): Promise<ApiResponse<T>> {
  if (process.env.NEXT_PUBLIC_USE_MOCK_API === 'true') {
    return resolveMock(endpoint, params) as ApiResponse<T>
  }

  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    throw new Error('RAPIDAPI_KEY environment variable is not set')
  }

  const searchParams = new URLSearchParams(params)
  const url = `${API_BASE}/${endpoint}?${searchParams.toString()}`

  const response = await fetch(url, {
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    throw new Error(`API-Football request failed: ${response.status} ${response.statusText}`)
  }

  const data: unknown = await response.json()
  return data as ApiResponse<T>
}
