import {
  arrayRemove,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

interface IRejectProposedGame {
  userRef: DocumentReference<DocumentData>
  gameID: string
}

const rejectProposedGame = async ({ userRef, gameID }: IRejectProposedGame) => {
  const gameRef = doc(db, 'games', gameID)
  const playerSubcollectionGameRef = doc(
    db,
    'games',
    gameID,
    userRef.id,
    'boardData'
  )

  // 1. Remove game refrence from proposedGames
  await updateDoc(userRef, {
    proposedGames: arrayRemove(gameRef),
  })

  // 2. Delete doc inside subcollection of game doc
  await deleteDoc(playerSubcollectionGameRef)

  // 3. Delete game doc
  await deleteDoc(gameRef)
}

export default rejectProposedGame
