import { doc, addDoc, collection, setDoc, documentId } from 'firebase/firestore'
import gamesConverter from '../converters/gamesConverter'
import { db } from '../clientApp'
import updateUserGamesList from './updateUserGamesList'

const addGameToCollection = async (userDocID: string, oponentDocID: string) => {
  // Generate document refrences to document in users collection, of player and oponent
  const userDocRef = doc(db, `users/${userDocID}`)
  const oponentDocRef = doc(db, `users/${oponentDocID}`)

  const docRef = await addDoc(
    collection(db, 'games').withConverter(gamesConverter),
    {
      id: documentId(),
      boardSize: 6,
      playerOne: userDocRef,
      playerTwo: oponentDocRef,
      isActive: false,
    }
  )

  // Get ID of newly created game document
  const gameID = docRef.id

  if (gameID && userDocID) {
    const docRef = doc(
      db,
      // Collection
      'games',
      // Document (GameID)
      gameID,
      // Subcollection (Player ID)
      userDocID,
      // Document inside subcollection
      'boardData'
    )

    await setDoc(docRef, {
      board: ['A', 'B', 'C'],
      rowPoints: {},
      colPoints: {},
    })
  }

  if (gameID && oponentDocID) {
    const docRef = doc(
      db,
      // Collection
      'games',
      // Document (GameID)
      gameID,
      // Subcollection (Player ID)
      oponentDocID,
      // Document inside subcollection
      'boardData'
    )

    await setDoc(docRef, {
      board: ['A', 'B', 'C'],
      rowPoints: {},
      colPoints: {},
    })
  }

  updateUserGamesList(docRef, userDocID)
  updateUserGamesList(docRef, oponentDocID)
}

export default addGameToCollection
