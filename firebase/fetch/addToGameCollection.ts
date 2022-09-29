import { doc, addDoc, collection } from 'firebase/firestore'
import gamesConverter from '../../utils/gamesConverter'
import { db } from '../clientApp'
import updateUserGamesList from './updateUserGamesList'

const addGameToCollection = async (userDocID: string, oponentDocID: string) => {
  // Generate document refrences to document in users collection, of player and oponent
  const userDocRef = doc(db, `users/${userDocID}`)
  const oponentDocRef = doc(db, `users/${oponentDocID}`)

  const docRef = await addDoc(
    collection(db, 'games').withConverter(gamesConverter),
    {
      boardSize: 6,
      player1: {
        board: ['', '', '', '', '', '', '', '', ''],
        user: userDocRef,
      },
      player2: {
        board: ['', '', '', '', '', '', '', '', ''],
        user: oponentDocRef,
      },
    }
  )

  updateUserGamesList(docRef.id, userDocID)
  updateUserGamesList(docRef.id, oponentDocID)
}

export default addGameToCollection
