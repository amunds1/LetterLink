import { DocumentReference, DocumentData } from 'firebase/firestore'
import { IAchievement } from '../pages/achievements'

interface User {
  id: string
  games: DocumentReference<DocumentData>[] | null
  proposedGames: DocumentReference<DocumentData>[] | null
  name: string
  experiencePoints: number
  achievements?: { [key: string]: IAchievement }
}

export default User
