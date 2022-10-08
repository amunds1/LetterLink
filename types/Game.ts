import { DocumentData, DocumentReference } from 'firebase/firestore'

interface Game {
  id?: string
  isActive: boolean
  boardSize: number
  playerOne: DocumentReference<DocumentData>
  playerTwo: DocumentReference<DocumentData>
}

export default Game
