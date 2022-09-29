import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import RequestData from '../types/RequestData'

// Generate ref to boardData stored in the subcollection of a game document
const generateGameRef = (boardData: RequestData) =>
  doc(db, 'games', boardData.gameID, boardData.userID, 'boardData')

// Update rowPoints object inside boardData document
export const updateRowPoints = async (
  boardData: RequestData,
  validWordInRow: { word: string; position: number[] }
) => {
  await updateDoc(generateGameRef(boardData), {
    [`rowPoints.${boardData.row.positionIndex}`]: validWordInRow.word.length,
  })
}

// Update columnPoints object inside boardData document
export const updateColumnPoints = async (
  boardData: RequestData,
  validWordInColumn: { word: string; position: number[] }
) => {
  await updateDoc(generateGameRef(boardData), {
    [`columnPoints.${boardData.column.positionIndex}`]:
      validWordInColumn.word.length,
  })
}
