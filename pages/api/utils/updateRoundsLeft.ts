import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

export const updateRoundsLeft = async (gameID: string, roundsLeft: number) => {
  await updateDoc(doc(db, 'games', gameID), {
    roundsLeft: roundsLeft,
  })
}
