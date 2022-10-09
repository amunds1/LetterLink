import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'

interface Game {
  id?: string
  isActive: boolean
  boardSize: number
  playerOne: DocumentReference<DocumentData>
  playerTwo: DocumentReference<DocumentData>
  proposedAt: Timestamp
}

export default Game
