import { createContext, Dispatch, SetStateAction } from 'react'
import GameStates from '../types/gameStates'

export interface IGameContext {
  selectedLetter: string | null
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
  gameState: GameStates.PLACE | GameStates.CHOOSE
  setGameState: Dispatch<SetStateAction<GameStates.PLACE | GameStates.CHOOSE>>
  gameID: string
  userID: string
  columnPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
  grid: {
    size: number
    values: string[]
  }
  columnValidWords: {
    [key: number]: string[]
  }
  rowValidWords: {
    [key: number]: string[]
  }
  yourTurn: boolean
}

export const GameContext = createContext<IGameContext | null>(null)
