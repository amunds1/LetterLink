import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../clientApp'
import generateGameConfig from '../constants/BaseGameConfig'
import gamesConverter from '../converters/gamesConverter'
import updateUserGamesList from './updateUserGamesList'

const generateBoardDataDocRef = (gameID: string, userID: string) =>
  // Path: games (collection) -> GameID (document) -> UserID (subcollection) -> boardData (document)
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

  gameID &&
    userDocID &&
    (await setDoc(
      generateBoardDataDocRef(docRef.id, userDocID),
      generateGameConfig(boardSizeAsNumber)
    ))

  gameID &&
    oponentDocID &&
    (await setDoc(
      generateBoardDataDocRef(docRef.id, oponentDocID),
      generateGameConfig(boardSizeAsNumber)
    ))

  updateUserGamesList(docRef, userDocID)
  updateUserGamesList(docRef, oponentDocID)
}

export default addGameToCollection
