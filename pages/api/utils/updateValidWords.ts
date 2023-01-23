import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import usersConverter from '../../../firebase/converters/userConverter'
import CheckBoardRequestData from '../types/CheckBoardRequestData'
import { fetchBoardData } from '../../../components/game/firebase/fetchBoardData'
import { updateColumnPoints, updateRowPoints } from './updatePoints'

// Generate ref to boardData stored in the subcollection of a game document
export const generateGameRef = (boardData: CheckBoardRequestData) =>
  doc(db, 'games', boardData.gameID, boardData.userID, 'boardData')

// Update rowValidWords object inside boardData document
/* export const updateValidRowWords = async (
  boardData: CheckBoardRequestData,
  validWordInRow: { word: string; position: number[] }
) => {
  await updateDoc(generateGameRef(boardData), {
    [`rowValidWords.${boardData.row.positionIndex}`]: validWordInRow.position,
  })
} */

// Update columnValidWords object inside boardData document
export const updateValidColumnWords = async (
  boardData: CheckBoardRequestData,
  validWordInColumn: { word: string; position: number[] }
) => {
  // Fetch board data from Firebase
  const tempBoardData = await fetchBoardData(boardData.gameID, boardData.userID)

  if (tempBoardData) {
    // Save columnValidWords for given column
    const validWordsMask =
      tempBoardData.columnValidWords[boardData.column.positionIndex]

    // Update columnValidWords in board data depending on position param
    for (
      let i = validWordInColumn.position[0];
      i <= validWordInColumn.position[1];
      i++
    )
      validWordsMask[i] = 1

    // Count number of 1's in validWordMask, where a 1 equals one point, and update points
    const points = validWordsMask.filter((x) => x == 1).length
    updateColumnPoints(boardData, points)

    // Update totalPoints
    const prevPointScore = tempBoardData.totalPoints
    const newPointScore = prevPointScore + points

    // Update columnValidWords with new updated array for given column
    await updateDoc(generateGameRef(boardData), {
      [`columnValidWords.${boardData.column.positionIndex}`]: validWordsMask,
      totalPoints: newPointScore,
    })
  }
}

// Update rowValidWords object inside boardData document
export const updateValidRowWords = async (
  boardData: CheckBoardRequestData,
  validWordInRow: { word: string; position: number[] }
) => {
  // Fetch board data from Firebase
  const tempBoardData = await fetchBoardData(boardData.gameID, boardData.userID)

  if (tempBoardData) {
    // Save rowValidWords for given row
    const validWordsMask =
      tempBoardData.rowValidWords[boardData.row.positionIndex]

    // Update rowValidWords in board data depending on position param
    for (
      let i = validWordInRow.position[0];
      i <= validWordInRow.position[1];
      i++
    )
      validWordsMask[i] = 1

    // Count number of 1's in validWordMask, where a 1 equals one point, and update points
    const points = validWordsMask.filter((x) => x == 1).length
    updateRowPoints(boardData, points)

    // Update totalPoints
    const prevPointScore = tempBoardData.totalPoints
    const newPointScore = prevPointScore + points

    // Update rowValidWords with new updated array for given row
    await updateDoc(generateGameRef(boardData), {
      [`rowValidWords.${boardData.row.positionIndex}`]: validWordsMask,
      totalPoints: newPointScore,
    })
  }
}
