import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import gamesConverter from '../../../firebase/converters/gamesConverter'

// Fetch game document
const fetchGameData = async (gameID: string) => {
  const gameDocRef = doc(db, `games/${gameID}`).withConverter(gamesConverter)
  const gameData = (await getDoc(gameDocRef)).data()

  return gameData
}

export default fetchGameData
