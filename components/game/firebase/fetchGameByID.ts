/* 
  Currently replaced by useDocument() hook in [gameID.tsx] and therefore not in use.
  Might come useful if we chose to do SSR on [gameID.tsx], because then useDocument() hook will not work
*/
import { doc, DocumentData, DocumentSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

interface Game {
  player1: string
  player2: string
  boardSize: number
}

/* 
  Fetch document from games collection by ID
*/
const fetchGameByID = async (firebaseGameID: string): Promise<Game[]> => {
  const docRef = doc(db, 'games', firebaseGameID).withConverter(gameConverter)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists())
    console.log(`Games document with ID ${firebaseGameID} does not exist`)

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
        player1: game.player1,
        player2: game.player2,
      }

      return gameFormatted
    })
  },
}

export default fetchGameByID
