import { doc, increment, updateDoc } from 'firebase/firestore'
import { fetchBoardData } from '../../../components/game/firebase/fetchBoardData'
import { db } from '../../../firebase/clientApp'
import CheckBoardRequestData from '../types/CheckBoardRequestData'
import { updateColumnPoints, updateRowPoints } from './updatePoints'

// Generate ref to boardData stored in the subcollection of a game document
export const generateGameRef = (boardData: CheckBoardRequestData) =>
  doc(db, 'games', boardData.gameID, boardData.userID, 'boardData')

// Update columnValidWords object inside boardData document
export const updateValidColumnWords = async (
  boardData: CheckBoardRequestData,
  validWordInColumn: { word: string; position: number[]; points: number }
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

    updateColumnPoints(boardData, validWordInColumn.points)

    // Await both updates to boardData and game documents
    await Promise.all([
      // Update columnValidWords with new updated array for given column
      updateDoc(generateGameRef(boardData), {
        [`columnValidWords.${boardData.column.positionIndex}`]: validWordsMask,
      }),
      updateDoc(doc(db, 'games', boardData.gameID), {
        [`totalPoints.${boardData.userID}`]: increment(
          validWordInColumn.points
        ),
      }),
    ])
      .then((res) => {
        return true
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  } else {
    console.log('Could not fetch board data')
    return false
  }
}

// Update rowValidWords object inside boardData document
export const updateValidRowWords = async (
  boardData: CheckBoardRequestData,
  validWordInRow: { word: string; position: number[]; points: number }
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

    updateRowPoints(boardData, validWordInRow.points)

    // Await both updates to boardData and game documents
    await Promise.allSettled([
      // Update rowValidWords with new updated array for given row
      updateDoc(generateGameRef(boardData), {
        [`rowValidWords.${boardData.row.positionIndex}`]: validWordsMask,
      }),
      updateDoc(doc(db, 'games', boardData.gameID), {
        [`totalPoints.${boardData.userID}`]: increment(validWordInRow.points),
      }),
    ])
      .then((res) => {
        return true
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  } else {
    console.log('Could not fetch board data')
    return false
  }
}
