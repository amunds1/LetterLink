import { DocumentReference, DocumentData, Timestamp } from 'firebase/firestore'
import { IAchievement } from '../components/achievements/types/IAchievement'
import { IBeatenMostStats } from '../components/game/types/IBeatenMostStats'

interface User {
  id: string
  games: DocumentReference<DocumentData>[] | null
  proposedGames: DocumentReference<DocumentData>[] | null
  name: string
  experiencePoints: number
  achievements?: { [key: string]: IAchievement }
  wins?: number
  opponents?: {
    [key: string]: IBeatenMostStats
  }
  hasDefaultUsername: boolean
  lastActionPerformed?: Timestamp
  streak?: number
  openLeveldUpModal?: boolean
}

export default User
