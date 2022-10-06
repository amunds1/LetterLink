import { DocumentReference, DocumentData } from 'firebase/firestore'

interface User {
  id: string
  games: DocumentReference<DocumentData>[]
  proposedGames: DocumentReference<DocumentData>[]
  name: string
}

export default User
