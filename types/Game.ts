import { DocumentData, DocumentReference, Timestamp } from 'firebase/firestore'
import User from './User'

interface Game {
  id?: string
  isActive: boolean
  boardSize: number
  playerOne: User
  playerTwo: User
  proposedAt: Timestamp
  proposedBy: User
}

export default Game
