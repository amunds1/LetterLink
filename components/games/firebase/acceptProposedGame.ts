import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

interface IAcceptProposedGame {
  userRef: DocumentReference<DocumentData>
  gameID: string
}

const acceptProposedGame = async ({ userRef, gameID }: IAcceptProposedGame) => {
  const gameRef = doc(db, 'games', gameID)

  // 1. Add game refrence to games (active games)
  await updateDoc(userRef, {
    games: arrayUnion(gameRef),
  })

  // 2. Remove game refrence from proposedGames
  await updateDoc(userRef, {
    proposedGames: arrayRemove(gameRef),
  })

  // 3. Mark game as active
  await updateDoc(gameRef, {
    isActive: true,
  })
}

export default acceptProposedGame
