import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

export const updateTurn = async (gameID: string, oponentID: string) => {
  const oponentDocRef = doc(db, `users/${oponentID}`)

  await updateDoc(doc(db, 'games', gameID), {
    [`nextTurn`]: oponentDocRef,
  })
}
