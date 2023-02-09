// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import CheckBoardRequestData from './types/CheckBoardRequestData'
import CheckBoardResponseData from './types/CheckBoardResponseData'
import newCheckRowOrColumn from './utils/newCheckRowOrColumn'
import { updateBoard } from './utils/updateBoard'
import {
  updateValidColumnWords,
  updateValidRowWords,
} from './utils/updateValidWords'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckBoardResponseData>
) {
  let response: CheckBoardResponseData = {}

  // Return error message if HTTP method was not POST
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  // Cast request body to RequestData type
  const boardData: CheckBoardRequestData = { ...req.body }

  const promises = []

  // Check row
  const validWordInRow = await newCheckRowOrColumn(
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

    await updateValidRowWords(boardData, validWordInRow)
  }

  // Check column
  const validWordInColumn = await newCheckRowOrColumn(
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

    await updateValidColumnWords(boardData, validWordInColumn)
  }

  // Update board
  await updateBoard(boardData)

  res.status(200).json(response)
  return
}
