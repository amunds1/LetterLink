import { DocumentReference, DocumentData } from 'firebase/firestore'
import { IAchievement } from '../components/achievements/types/IAchievement'

interface User {
  id: string
  games: DocumentReference<DocumentData>[] | null
  proposedGames: DocumentReference<DocumentData>[] | null
  name: string
  experiencePoints: number
  achievements?: { [key: string]: IAchievement }
  wins?: number
}

export default User
