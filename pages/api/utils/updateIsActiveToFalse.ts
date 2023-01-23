import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

export const updateIsActiveToFalse = async (gameID: string) => {
  await updateDoc(doc(db, 'games', gameID), {
    isActive: false,
  })
}
