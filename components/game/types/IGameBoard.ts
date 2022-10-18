import { Dispatch, SetStateAction } from 'react'
import GameStates from './gameStates'

interface IGameBoard {
  grid: {
    size: number
    values: string[]
  }
  gameID: string
  userID: string
  columnValidWords: {
    [key: number]: string[]
  }
  rowValidWords: {
    [key: number]: string[]
  }
  selectedLetter: string | null
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
  gameState: GameStates.PLACE | GameStates.CHOOSE
  setGameState: Dispatch<SetStateAction<GameStates.PLACE | GameStates.CHOOSE>>
}

export default IGameBoard
