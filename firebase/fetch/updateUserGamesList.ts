import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../clientApp'

/* 
  Update games array stored on users document with the new game ID
*/
const updateUserGamesList = async (gameID: string, userDocID: string) => {
  const usersRef = doc(db, `users/${userDocID}`)

  await updateDoc(usersRef, {
    games: arrayUnion(gameID),
  })
}

export default updateUserGamesList
