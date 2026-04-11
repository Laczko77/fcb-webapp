// API-Football v3 response types
// Reflects the actual shape returned by https://v3.football.api-sports.io

export interface ApiFixture {
  fixture: {
    id: number
    date: string // ISO 8601
    status: {
      short: 'TBD' | 'NS' | '1H' | 'HT' | '2H' | 'ET' | 'P' | 'FT' | 'AET' | 'PEN' | 'SUSP' | 'INT' | 'PST' | 'CANC' | 'ABD' | 'AWD' | 'WO' | 'LIVE'
      long: string
      elapsed: number | null
    }
    venue: {
      id: number | null
      name: string | null
      city: string | null
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    season: number
    round: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
    away: {
      id: number
      name: string
      logo: string
      winner: boolean | null
    }
  }
  goals: {
    home: number | null
    away: number | null
  }
  score: {
    halftime: { home: number | null; away: number | null }
    fulltime: { home: number | null; away: number | null }
    extratime: { home: number | null; away: number | null }
    penalty: { home: number | null; away: number | null }
  }
}

export interface ApiPlayer {
  player: {
    id: number
    name: string
    firstname: string
    lastname: string
    age: number
    nationality: string
    photo: string
    height: string | null
    weight: string | null
    injured: boolean
    position: string
  }
}

export interface ApiPlayerStats {
  games: {
    appearences: number | null
    lineups: number | null
    minutes: number | null
    rating: string | null
  }
  goals: {
    total: number | null
    assists: number | null
    saves: number | null
    conceded: number | null
  }
  shots: {
    total: number | null
    on: number | null
  }
  passes: {
    total: number | null
    key: number | null
    accuracy: number | null
  }
  tackles: {
    total: number | null
    blocks: number | null
    interceptions: number | null
  }
  dribbles: {
    attempts: number | null
    success: number | null
  }
  cards: {
    yellow: number
    yellowred: number
    red: number
  }
}

export interface ApiPlayerWithStats extends ApiPlayer {
  statistics: Array<
    ApiPlayerStats & {
      team: { id: number; name: string; logo: string }
      league: { id: number; name: string; country: string; logo: string; season: number }
    }
  >
}

export interface ApiStanding {
  rank: number
  team: {
    id: number
    name: string
    logo: string
  }
  points: number
  goalsDiff: number
  group: string
  form: string
  status: string
  description: string | null
  all: {
    played: number
    win: number
    draw: number
    lose: number
    goals: { for: number; against: number }
  }
  home: {
    played: number
    win: number
    draw: number
    lose: number
    goals: { for: number; against: number }
  }
  away: {
    played: number
    win: number
    draw: number
    lose: number
    goals: { for: number; against: number }
  }
  update: string
}

// Generic API-Football response envelope
export interface ApiResponse<T> {
  get: string
  parameters: Record<string, string>
  errors: unknown[]
  results: number
  paging: { current: number; total: number }
  response: T
}
