import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

const updateSelectedLetter = async (gameID: string, selectedLetter: string) => {
  await updateDoc(doc(db, 'games', gameID), {
    [`selectedLetter`]: selectedLetter,
  })
}

export default updateSelectedLetter
