import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

interface IAcceptProposedGame {
  userUID: string
  gameID: string
}

const acceptProposedGame = async ({ userUID, gameID }: IAcceptProposedGame) => {
  const gameRef = doc(db, 'games', gameID)
  const userRef = doc(db, 'user', userUID)

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
