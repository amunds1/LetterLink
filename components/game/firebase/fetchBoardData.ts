import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import boardDataConverter from '../../../firebase/converters/boardDataConverter'

// Fetch boardData document
export const fetchBoardData = async (gameID: string, uid: string) => {
  const boardDocRef = doc(db, `games/${gameID}/${uid}/boardData`).withConverter(
    boardDataConverter
  )
  const boardData = (await getDoc(boardDocRef)).data()

  return boardData
}
