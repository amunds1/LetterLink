import {
  arrayUnion,
  DocumentData,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore'

/* 
  Update games array stored on users document with the new game ID
*/
const updateUserGamesList = async (
  gameRef: DocumentReference<DocumentData>,
  userDocRef: DocumentReference<DocumentData>
) => {
  await updateDoc(userDocRef, {
    proposedGames: arrayUnion(gameRef),
  })
}

export default updateUserGamesList
