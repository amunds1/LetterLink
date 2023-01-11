import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import CheckBoardRequestData from '../types/CheckBoardRequestData'

// Generate ref to boardData stored in the subcollection of a game document
export const generateGameRef = (boardData: CheckBoardRequestData) =>
  doc(db, 'games', boardData.gameID, boardData.userID, 'boardData')

// Update rowPoints object inside boardData document
export const updateRowPoints = async (
  boardData: CheckBoardRequestData,
  points: number
) => {
  await updateDoc(generateGameRef(boardData), {
    [`rowPoints.${boardData.row.positionIndex}`]: points,
  })
}

// Update columnPoints object inside boardData document
export const updateColumnPoints = async (
  boardData: CheckBoardRequestData,
  points: number
) => {
  await updateDoc(generateGameRef(boardData), {
    [`columnPoints.${boardData.column.positionIndex}`]: points,
  })
}
