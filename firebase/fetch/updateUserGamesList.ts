import {
  doc,
  updateDoc,
  arrayUnion,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore'
import { db } from '../clientApp'

/* 
  Update games array stored on users document with the new game ID
*/
const updateUserGamesList = async (
  gameRef: DocumentReference<DocumentData>,
  userDocID: string
) => {
  const usersRef = doc(db, `users/${userDocID}`)

  await updateDoc(usersRef, {
    proposedGames: arrayUnion(gameRef),
  })
}

export default updateUserGamesList
