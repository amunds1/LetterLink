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
  userUID: string
  gameID: string
}

const acceptProposedGame = async ({ userUID, gameID }: IAcceptProposedGame) => {
  const userRef = doc(db, 'users', userUID)
  const gameRef = doc(db, 'games', gameID)

  // 1. Add game refrence to games (active games)
  await updateDoc(userRef, {
    games: arrayUnion(gameID),
  })

  // 2. Remove game refrence from proposedGames
  await updateDoc(userRef, {
    proposedGames: arrayRemove(gameID),
  })

  // 3. Mark game as active
  await updateDoc(gameRef, {
    isActive: true,
  })
}

export default acceptProposedGame
