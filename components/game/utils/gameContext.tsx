import { createContext, Dispatch, SetStateAction } from 'react'
import GameStates from '../types/gameStates'

export interface IGameContext {
  selectedLetter: string | null
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
  gameState:
    | GameStates.PLACE_OWN
    | GameStates.CHOOSE
    | GameStates.PLACE_OPPONENTS
    | GameStates.END
  setGameState: Dispatch<
    SetStateAction<
      | GameStates.PLACE_OWN
      | GameStates.CHOOSE
      | GameStates.PLACE_OPPONENTS
      | GameStates.END
    >
  >
  gameID: string
  userUID: string
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
    [key: number]: number[]
  }
  rowValidWords: {
    [key: number]: number[]
  }
  yourTurn: boolean
  opponentID: string
  setYourTurn: Dispatch<SetStateAction<boolean>>
  opponentName: string
  userName: string
  opponentPoints: number
  setOpponentPoints: Dispatch<SetStateAction<number>>
  userPoints: number
  setUserPoints: Dispatch<SetStateAction<number>>
  setRoundsLeft: Dispatch<number>
  roundsLeft: number
  winner: string | null
}

export const GameContext = createContext<IGameContext | null>(null)
