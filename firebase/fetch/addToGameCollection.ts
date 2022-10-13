import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../clientApp'
import generateGameConfig from '../constants/BaseGameConfig'
import gamesConverter from '../converters/gamesConverter'
import updateUserGamesList from './updateUserGamesList'

const addGameToCollection = async (
  userDocID: string,
  oponentDocID: string,
  boardSize: string
) => {
  // Generate document refrences to document in users collection, of player and oponent
  const userDocRef = doc(db, `users/${userDocID}`)
  const oponentDocRef = doc(db, `users/${oponentDocID}`)
  const boardSizeAsNumber = parseInt(boardSize)

  const docRef = await addDoc(
    collection(db, 'games').withConverter(gamesConverter),
    {
      boardSize: boardSizeAsNumber,
      playerOne: userDocRef,
      playerTwo: oponentDocRef,
      isActive: false,
      proposedAt: Timestamp.now(),
      proposedBy: userDocRef,
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

    await setDoc(docRef, generateGameConfig(boardSizeAsNumber))
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

    await setDoc(docRef, generateGameConfig(boardSizeAsNumber))
  }

  updateUserGamesList(docRef, userDocID)
  updateUserGamesList(docRef, oponentDocID)
}

export default addGameToCollection
