export type Player = {
  username: string
  points: number
}

export const mockPlayerData: Player[] = [
  {
    username: 'Andreas',
    points: 100,
  },
  {
    username: 'Kristine',
    points: 100,
  },
  {
    username: 'Carl',
    points: 300,
  },
  {
    username: 'Mathias',
    points: 150,
  },
  {
    username: 'Per',
    points: 50,
  },
  {
    username: 'Yusef',
    points: 77,
  },
]

export const generateMockData = () => {
  return mockPlayerData
}
