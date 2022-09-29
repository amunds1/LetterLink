import { updateDoc } from 'firebase/firestore'
import RequestData from '../types/RequestData'
import { generateGameRef } from './updatePoints'

// Update board array inside boardData document
export const updateBoard = async (boardData: RequestData) => {
  await updateDoc(generateGameRef(boardData), {
    [`board`]: boardData.board,
  })
}
