import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

export const updateTurn = async (gameID: string, opponentID: string) => {
  const oponentDocRef = doc(db, `users/${opponentID}`)

  await updateDoc(doc(db, 'games', gameID), {
    [`nextTurn`]: oponentDocRef,
  })
}
