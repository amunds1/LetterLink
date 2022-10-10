import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import CheckBoardRequestData from '../types/CheckBoardRequestData'

// Generate ref to boardData stored in the subcollection of a game document
export const generateGameRef = (boardData: CheckBoardRequestData) =>
  doc(db, 'games', boardData.gameID, boardData.userID, 'boardData')

// Update rowValidWords object inside boardData document
export const updateValidRowWords = async (
  boardData: CheckBoardRequestData,
  validWordInRow: { word: string; position: number[] }
) => {
  await updateDoc(generateGameRef(boardData), {
    [`rowValidWords.${boardData.row.positionIndex}`]: validWordInRow.position,
  })
}

// Update columnValidWords object inside boardData document
export const updateValidColumnWords = async (
  boardData: CheckBoardRequestData,
  validWordInColumn: { word: string; position: number[] }
) => {
  await updateDoc(generateGameRef(boardData), {
    [`columnValidWords.${boardData.column.positionIndex}`]:
      validWordInColumn.position,
  })
}
