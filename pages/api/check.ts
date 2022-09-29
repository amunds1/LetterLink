// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, updateDoc } from 'firebase/firestore'
import checkRowOrColumn from './utils/checkRowOrColumn'
import { db } from '../../firebase/clientApp'
import ResponseData from './types/ResponseData'
import RequestData from './types/RequestData'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let response: ResponseData = {}

  const player = 'player1'

  // Return error message if HTTP method was not POST
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  // Cast request body to RequestData type
  const boardData: RequestData = { ...req.body }

  // Check row
  const validWordInRow = await checkRowOrColumn(
    boardData.row.data,
    boardData.row.differentIndex
  )

  // Populate row object if valid word was found
  if (validWordInRow) {
    response.row = {
      positionIndex: boardData.row.positionIndex,
      points: validWordInRow.word.length,
      wordPosition: validWordInRow.position,
      word: validWordInRow.word,
    }

    // Update rowPoints in Firebase
    const gameRef = doc(db, 'games', boardData.gameID)
    await updateDoc(gameRef, {
      [`${player}.rowPoints.${boardData.row.positionIndex}`]:
        validWordInRow.word.length,
    })
  }

  // Check column
  const validWordInColumn = await checkRowOrColumn(
    boardData.column.data,
    boardData.column.differentIndex
  )

  // Populate column object if valid word was found
  if (validWordInColumn) {
    response.column = {
      positionIndex: boardData.column.positionIndex,
      points: validWordInColumn.word.length,
      wordPosition: validWordInColumn.position,
      word: validWordInColumn.word,
    }

    // Update columnPoints in Firebase
    const gameRef = doc(db, 'games', boardData.gameID)
    await updateDoc(gameRef, {
      [`${player}.colPoints.${boardData.column.positionIndex}`]:
        validWordInColumn.word.length,
    })
  }

  res.status(200).json(response)
}
