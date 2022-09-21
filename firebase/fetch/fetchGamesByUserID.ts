import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../clientApp'

export interface Game {
  boardSize: number
  oponent: string
}

/* 
  Fetch ongoing games for a given user by user ID
*/
const fetchGamesByUserID = async (firebaseUserID: string): Promise<Game[]> => {
  const docRef = doc(db, 'users', firebaseUserID).withConverter(gameConverter)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists())
    console.log(`Games document belonging to ${firebaseUserID} does not exist`)

  return await docSnap.data()
}

const gameConverter = {
  toFirestore: (data: DocumentData) => {
    return data
  },
  fromFirestore: (snap: DocumentSnapshot<DocumentData>) => {
    const data: DocumentData = snap.data()!

    return data['games'].map((game: DocumentData) => {
      const gameFormatted: Game = {
        boardSize: game.boardSize,
        oponent: game.oponent,
      }

      return gameFormatted
    })
  },
}

export default fetchGamesByUserID
