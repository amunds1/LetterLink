import { DocumentReference } from 'firebase/firestore'

interface Game {
  id?: string
  boardSize: number
  player1: {
    board: string[]
    user: DocumentReference
  }
  player2: {
    board: string[]
    user: DocumentReference
  }
}

export default Game
