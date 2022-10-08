import { updateDoc } from 'firebase/firestore'
import CheckBoardRequestData from '../types/CheckBoardRequestData'
import { generateGameRef } from './updatePoints'

// Update board array inside boardData document
export const updateBoard = async (boardData: CheckBoardRequestData) => {
  await updateDoc(generateGameRef(boardData), {
    [`board`]: boardData.board,
  })
}
