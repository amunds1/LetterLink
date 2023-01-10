import { DocumentReference, DocumentData } from 'firebase/firestore'

interface User {
  id: string
  games: DocumentReference<DocumentData>[] | null
  proposedGames: DocumentReference<DocumentData>[] | null
  name: string
  experiencePoints: number
}

export default User
