export interface IGameStatus {
  won: boolean
  opponent: string
}

export const gameStatus: IGameStatus = {
  won: true,
  opponent: 'Hikaru Nakamura',
}
