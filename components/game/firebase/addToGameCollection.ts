import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import generateGameConfig from '../constants/BaseGameConfig'
import gamesConverter from '../../../firebase/converters/gamesConverter'
import updateUserGamesList from './updateUserGamesList'

export const generateBoardDataDocRef = (gameID: string, userID: string) =>
  // Path: games (collection) -> gameID (document) -> userID (subcollection) -> boardData (document)
  doc(db, 'games', gameID, userID, 'boardData')

const addGameToCollection = async (
  userDocID: string,
  oponentDocID: string,
  boardSize: string
) => {
  const boardSizeAsNumber = parseInt(boardSize)

  // Generate document refrences to document in users collection, of player and oponent
  const userDocRef = doc(db, `users/${userDocID}`)
  const oponentDocRef = doc(db, `users/${oponentDocID}`)

  // Path: games (collection)
  const docRef = await addDoc(
    collection(db, 'games').withConverter(gamesConverter),
    {
      boardSize: boardSizeAsNumber,
      playerOne: userDocRef,
      playerTwo: oponentDocRef,
      isActive: false,
      proposedAt: Timestamp.now(),
      proposedBy: userDocRef,
      nextTurn: oponentDocRef,
    }
  )

  // Get ID of newly created game document
  const gameID = docRef.id

  // Add boardData to player subcollection inside game document, for the first player
  gameID &&
    userDocID &&
    (await setDoc(
      generateBoardDataDocRef(docRef.id, userDocID),
      generateGameConfig(boardSizeAsNumber)
    ))

  // Add boardData to player subcollection inside game document, for the second player
  gameID &&
    oponentDocID &&
    (await setDoc(
      generateBoardDataDocRef(docRef.id, oponentDocID),
      generateGameConfig(boardSizeAsNumber)
    ))

  updateUserGamesList(docRef, userDocRef)
  updateUserGamesList(docRef, userDocRef)
}

export default addGameToCollection
