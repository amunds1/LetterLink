import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'

interface Game {
  id?: string
  isActive: boolean
  boardSize: number
  playerOne: DocumentReference<DocumentData>
  playerTwo: DocumentReference<DocumentData>
  proposedAt: Timestamp
  proposedBy: DocumentReference<DocumentData>
  nextTurn: DocumentReference<DocumentData>
  selectedLetter: string | null
}

export default Game
