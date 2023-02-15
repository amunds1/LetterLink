export type Player = {
  username: string
  points: number
}

export const mockPlayerData: Player[] = [
  {
    username: 'Cow',
    points: 100,
  },
  {
    username: 'Pig',
    points: 100,
  },
  {
    username: 'Wolf',
    points: 300,
  },
  {
    username: 'Owl',
    points: 150,
  },
  {
    username: 'Rabbit',
    points: 50,
  },
  {
    username: 'Frog',
    points: 77,
  },
]

export const generateMockData = () => {
  return mockPlayerData
}
