import {
  arrayRemove,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import { generateBoardDataDocRef } from '../../game/firebase/addToGameCollection'

interface IRejectProposedGame {
  userUID: string
  gameID: string
}

const rejectProposedGame = async ({ userUID, gameID }: IRejectProposedGame) => {
  const gameRef = doc(db, 'games', gameID)
  const userRef = doc(db, 'user', userUID)

  // 1. Remove game refrence from proposedGames
  await updateDoc(userRef, {
    proposedGames: arrayRemove(gameRef),
  })

  // 2. Delete doc inside subcollection of game doc
  await deleteDoc(generateBoardDataDocRef(gameID, userRef.id))

  // 3. Delete game doc
  await deleteDoc(gameRef)
}

export default rejectProposedGame
