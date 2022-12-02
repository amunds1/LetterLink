export type Player = {
  username: string
  gamesPlayed: number
  wins: number
  losses: number
}

export const mockPlayerData: Player[] = [
  {
    username: 'Andreas',
    gamesPlayed: 2,
    wins: 1,
    losses: 1,
  },
  {
    username: 'Kristine',
    gamesPlayed: 10,
    wins: 4,
    losses: 6,
  },
  {
    username: 'Carl',
    gamesPlayed: 10,
    wins: 6,
    losses: 4,
  },
  {
    username: 'Mathias',
    gamesPlayed: 3,
    wins: 2,
    losses: 1,
  },
  {
    username: 'Per',
    gamesPlayed: 3,
    wins: 1,
    losses: 2,
  },
  {
    username: 'Yusef',
    gamesPlayed: 2,
    wins: 1,
    losses: 1,
  },
]

export const generateMockData = () => {
  return mockPlayerData
}
