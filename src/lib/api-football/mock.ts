import type { ApiFixture, ApiPlayerWithStats, ApiResponse, ApiStanding } from './types'

const BARCA_ID = 529
const LA_LIGA_ID = 140
const SEASON = 2025

// ---------------------------------------------------------------------------
// Upcoming fixtures (NS = not started)
// ---------------------------------------------------------------------------
export const mockUpcomingFixtures: ApiResponse<ApiFixture[]> = {
  get: 'fixtures',
  parameters: { team: String(BARCA_ID), next: '5' },
  errors: [],
  results: 5,
  paging: { current: 1, total: 1 },
  response: [
    {
      fixture: {
        id: 1100001,
        date: '2026-04-19T19:00:00+00:00',
        status: { short: 'NS', long: 'Not Started', elapsed: null },
        venue: { id: 1456, name: 'Estadio Santiago Bernabéu', city: 'Madrid' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 32' },
      teams: {
        home: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png', winner: null },
        away: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: null },
      },
      goals: { home: null, away: null },
      score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1100002,
        date: '2026-04-23T20:00:00+00:00',
        status: { short: 'NS', long: 'Not Started', elapsed: null },
        venue: { id: 1409, name: 'Estadio Olímpico Lluís Companys', city: 'Barcelona' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 33' },
      teams: {
        home: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: null },
        away: { id: 543, name: 'Real Betis', logo: 'https://media.api-sports.io/football/teams/543.png', winner: null },
      },
      goals: { home: null, away: null },
      score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1100003,
        date: '2026-04-27T19:00:00+00:00',
        status: { short: 'NS', long: 'Not Started', elapsed: null },
        venue: { id: 1409, name: 'Estadio Olímpico Lluís Companys', city: 'Barcelona' },
      },
      league: { id: 2, name: 'UEFA Champions League', country: 'World', logo: 'https://media.api-sports.io/football/leagues/2.png', season: SEASON, round: 'Semi-finals' },
      teams: {
        home: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: null },
        away: { id: 157, name: 'Bayern München', logo: 'https://media.api-sports.io/football/teams/157.png', winner: null },
      },
      goals: { home: null, away: null },
      score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1100004,
        date: '2026-05-03T18:15:00+00:00',
        status: { short: 'NS', long: 'Not Started', elapsed: null },
        venue: { id: 1537, name: 'Estadio de Vallecas', city: 'Madrid' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 34' },
      teams: {
        home: { id: 728, name: 'Rayo Vallecano', logo: 'https://media.api-sports.io/football/teams/728.png', winner: null },
        away: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: null },
      },
      goals: { home: null, away: null },
      score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1100005,
        date: '2026-05-10T20:00:00+00:00',
        status: { short: 'NS', long: 'Not Started', elapsed: null },
        venue: { id: 1409, name: 'Estadio Olímpico Lluís Companys', city: 'Barcelona' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 35' },
      teams: {
        home: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: null },
        away: { id: 546, name: 'Getafe CF', logo: 'https://media.api-sports.io/football/teams/546.png', winner: null },
      },
      goals: { home: null, away: null },
      score: { halftime: { home: null, away: null }, fulltime: { home: null, away: null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
  ],
}

// ---------------------------------------------------------------------------
// Recent results (FT = full time)
// ---------------------------------------------------------------------------
export const mockRecentFixtures: ApiResponse<ApiFixture[]> = {
  get: 'fixtures',
  parameters: { team: String(BARCA_ID), last: '5' },
  errors: [],
  results: 5,
  paging: { current: 1, total: 1 },
  response: [
    {
      fixture: {
        id: 1090001,
        date: '2026-04-06T18:15:00+00:00',
        status: { short: 'FT', long: 'Match Finished', elapsed: 90 },
        venue: { id: 1409, name: 'Estadio Olímpico Lluís Companys', city: 'Barcelona' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 31' },
      teams: {
        home: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: true },
        away: { id: 533, name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/533.png', winner: false },
      },
      goals: { home: 3, away: 1 },
      score: { halftime: { home: 2, away: 0 }, fulltime: { home: 3, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1090002,
        date: '2026-04-01T20:00:00+00:00',
        status: { short: 'FT', long: 'Match Finished', elapsed: 90 },
        venue: { id: 1537, name: 'Estadi de Gran Canaria', city: 'Las Palmas' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 30' },
      teams: {
        home: { id: 534, name: 'Las Palmas', logo: 'https://media.api-sports.io/football/teams/534.png', winner: false },
        away: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: true },
      },
      goals: { home: 0, away: 2 },
      score: { halftime: { home: 0, away: 1 }, fulltime: { home: 0, away: 2 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1090003,
        date: '2026-03-25T20:00:00+00:00',
        status: { short: 'FT', long: 'Match Finished', elapsed: 90 },
        venue: { id: 1409, name: 'Estadio Olímpico Lluís Companys', city: 'Barcelona' },
      },
      league: { id: 2, name: 'UEFA Champions League', country: 'World', logo: 'https://media.api-sports.io/football/leagues/2.png', season: SEASON, round: 'Quarter-finals' },
      teams: {
        home: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: true },
        away: { id: 505, name: 'Inter Milan', logo: 'https://media.api-sports.io/football/teams/505.png', winner: false },
      },
      goals: { home: 4, away: 2 },
      score: { halftime: { home: 2, away: 1 }, fulltime: { home: 4, away: 2 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1090004,
        date: '2026-03-18T19:00:00+00:00',
        status: { short: 'FT', long: 'Match Finished', elapsed: 90 },
        venue: { id: 1409, name: 'Estadio Olímpico Lluís Companys', city: 'Barcelona' },
      },
      league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON, round: 'Regular Season - 29' },
      teams: {
        home: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: false },
        away: { id: 548, name: 'Real Sociedad', logo: 'https://media.api-sports.io/football/teams/548.png', winner: false },
      },
      goals: { home: 1, away: 1 },
      score: { halftime: { home: 1, away: 0 }, fulltime: { home: 1, away: 1 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
    {
      fixture: {
        id: 1090005,
        date: '2026-03-12T20:00:00+00:00',
        status: { short: 'FT', long: 'Match Finished', elapsed: 90 },
        venue: { id: 1456, name: 'Estadio Santiago Bernabéu', city: 'Madrid' },
      },
      league: { id: 2, name: 'UEFA Champions League', country: 'World', logo: 'https://media.api-sports.io/football/leagues/2.png', season: SEASON, round: 'Quarter-finals' },
      teams: {
        home: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png', winner: false },
        away: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png', winner: true },
      },
      goals: { home: 1, away: 3 },
      score: { halftime: { home: 0, away: 1 }, fulltime: { home: 1, away: 3 }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    },
  ],
}

// ---------------------------------------------------------------------------
// La Liga standings (top 5)
// ---------------------------------------------------------------------------
export const mockStandings: ApiResponse<ApiStanding[][]> = {
  get: 'standings',
  parameters: { league: String(LA_LIGA_ID), season: String(SEASON) },
  errors: [],
  results: 1,
  paging: { current: 1, total: 1 },
  response: [
    [
      {
        rank: 1,
        team: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
        points: 74,
        goalsDiff: 42,
        group: 'La Liga',
        form: 'WWDWW',
        status: 'same',
        description: 'Promotion - Champions League (Group Stage: )',
        all: { played: 31, win: 23, draw: 5, lose: 3, goals: { for: 78, against: 36 } },
        home: { played: 15, win: 13, draw: 1, lose: 1, goals: { for: 42, against: 14 } },
        away: { played: 16, win: 10, draw: 4, lose: 2, goals: { for: 36, against: 22 } },
        update: '2026-04-07T00:00:00+00:00',
      },
      {
        rank: 2,
        team: { id: 541, name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
        points: 68,
        goalsDiff: 35,
        group: 'La Liga',
        form: 'WWWLW',
        status: 'same',
        description: 'Promotion - Champions League (Group Stage: )',
        all: { played: 31, win: 21, draw: 5, lose: 5, goals: { for: 70, against: 35 } },
        home: { played: 16, win: 13, draw: 2, lose: 1, goals: { for: 38, against: 16 } },
        away: { played: 15, win: 8, draw: 3, lose: 4, goals: { for: 32, against: 19 } },
        update: '2026-04-07T00:00:00+00:00',
      },
      {
        rank: 3,
        team: { id: 533, name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/533.png' },
        points: 62,
        goalsDiff: 22,
        group: 'La Liga',
        form: 'WDWLW',
        status: 'same',
        description: 'Promotion - Champions League (Group Stage: )',
        all: { played: 31, win: 18, draw: 8, lose: 5, goals: { for: 58, against: 36 } },
        home: { played: 16, win: 11, draw: 3, lose: 2, goals: { for: 34, against: 18 } },
        away: { played: 15, win: 7, draw: 5, lose: 3, goals: { for: 24, against: 18 } },
        update: '2026-04-07T00:00:00+00:00',
      },
      {
        rank: 4,
        team: { id: 548, name: 'Real Sociedad', logo: 'https://media.api-sports.io/football/teams/548.png' },
        points: 55,
        goalsDiff: 14,
        group: 'La Liga',
        form: 'DWWWD',
        status: 'same',
        description: 'Promotion - Europa League (Group Stage: )',
        all: { played: 31, win: 16, draw: 7, lose: 8, goals: { for: 52, against: 38 } },
        home: { played: 15, win: 10, draw: 3, lose: 2, goals: { for: 30, against: 18 } },
        away: { played: 16, win: 6, draw: 4, lose: 6, goals: { for: 22, against: 20 } },
        update: '2026-04-07T00:00:00+00:00',
      },
      {
        rank: 5,
        team: { id: 543, name: 'Real Betis', logo: 'https://media.api-sports.io/football/teams/543.png' },
        points: 52,
        goalsDiff: 8,
        group: 'La Liga',
        form: 'WLDWW',
        status: 'same',
        description: null,
        all: { played: 31, win: 15, draw: 7, lose: 9, goals: { for: 50, against: 42 } },
        home: { played: 16, win: 9, draw: 4, lose: 3, goals: { for: 28, against: 20 } },
        away: { played: 15, win: 6, draw: 3, lose: 6, goals: { for: 22, against: 22 } },
        update: '2026-04-07T00:00:00+00:00',
      },
    ],
  ],
}

// ---------------------------------------------------------------------------
// Players with stats
// ---------------------------------------------------------------------------
export const mockPlayers: ApiResponse<ApiPlayerWithStats[]> = {
  get: 'players',
  parameters: { team: String(BARCA_ID), season: String(SEASON) },
  errors: [],
  results: 3,
  paging: { current: 1, total: 1 },
  response: [
    {
      player: {
        id: 521,
        name: 'Robert Lewandowski',
        firstname: 'Robert',
        lastname: 'Lewandowski',
        age: 37,
        nationality: 'Poland',
        photo: 'https://media.api-sports.io/football/players/521.png',
        height: '185 cm',
        weight: '80 kg',
        injured: false,
        position: 'Attacker',
      },
      statistics: [
        {
          team: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
          league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON },
          games: { appearences: 29, lineups: 29, minutes: 2520, rating: '7.82' },
          goals: { total: 24, assists: 7, saves: null, conceded: null },
          shots: { total: 88, on: 52 },
          passes: { total: 620, key: 34, accuracy: 74 },
          tackles: { total: 12, blocks: 3, interceptions: 5 },
          dribbles: { attempts: 38, success: 21 },
          cards: { yellow: 3, yellowred: 0, red: 0 },
        },
      ],
    },
    {
      player: {
        id: 35845,
        name: 'Pedri',
        firstname: 'Pedro',
        lastname: 'González López',
        age: 23,
        nationality: 'Spain',
        photo: 'https://media.api-sports.io/football/players/35845.png',
        height: '174 cm',
        weight: '60 kg',
        injured: false,
        position: 'Midfielder',
      },
      statistics: [
        {
          team: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
          league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON },
          games: { appearences: 27, lineups: 26, minutes: 2185, rating: '7.64' },
          goals: { total: 8, assists: 11, saves: null, conceded: null },
          shots: { total: 42, on: 24 },
          passes: { total: 1840, key: 62, accuracy: 88 },
          tackles: { total: 38, blocks: 8, interceptions: 22 },
          dribbles: { attempts: 72, success: 48 },
          cards: { yellow: 4, yellowred: 0, red: 0 },
        },
      ],
    },
    {
      player: {
        id: 35907,
        name: 'Gavi',
        firstname: 'Pablo',
        lastname: 'Gavi Páez',
        age: 21,
        nationality: 'Spain',
        photo: 'https://media.api-sports.io/football/players/35907.png',
        height: '173 cm',
        weight: '60 kg',
        injured: false,
        position: 'Midfielder',
      },
      statistics: [
        {
          team: { id: BARCA_ID, name: 'FC Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
          league: { id: LA_LIGA_ID, name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png', season: SEASON },
          games: { appearences: 25, lineups: 23, minutes: 1890, rating: '7.55' },
          goals: { total: 5, assists: 9, saves: null, conceded: null },
          shots: { total: 28, on: 15 },
          passes: { total: 1620, key: 55, accuracy: 87 },
          tackles: { total: 52, blocks: 6, interceptions: 30 },
          dribbles: { attempts: 85, success: 52 },
          cards: { yellow: 7, yellowred: 0, red: 1 },
        },
      ],
    },
  ],
}
