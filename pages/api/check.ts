// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import checkRowOrColumn from './utils/checkRowOrColumn'
import ResponseData from './types/ResponseData'
import RequestData from './types/RequestData'
import { updateRowPoints, updateColumnPoints } from './utils/updatePoints'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let response: ResponseData = {}

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

    updateRowPoints(boardData, validWordInRow)
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

    updateColumnPoints(boardData, validWordInColumn)
  }

  res.status(200).json(response)
}
