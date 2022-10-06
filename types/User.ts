import { DocumentReference, DocumentData } from 'firebase/firestore'

interface User {
  id: string
  games: string[]
  proposedGames: DocumentReference<DocumentData>[]
  name: string
}

export default User
