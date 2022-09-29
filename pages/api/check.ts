// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import checkRowOrColumn from './utils/checkRowOrColumn'

type ResponseData = {
  message?: string
  row?: {
    wordPosition: number[]
    word: string
    positionIndex: number
    points: number
  }
  column?: {
    wordPosition: number[]
    word: string
    positionIndex: number
    points: number
  }
}

type RequestData = {
  row: {
    data: string[]
    positionIndex: number
    differentIndex: number
  }
  column: {
    data: string[]
    positionIndex: number
    differentIndex: number
  }
}

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

  if (validWordInRow) {
    response.row = {
      positionIndex: boardData.row.positionIndex,
      points: validWordInRow.word.length,
      wordPosition: validWordInRow.position,
      word: validWordInRow.word,
    }
  }

  // Check column
  const validWordInColumn = await checkRowOrColumn(
    boardData.column.data,
    boardData.column.differentIndex
  )

  if (validWordInColumn) {
    response.column = {
      positionIndex: boardData.column.positionIndex,
      points: validWordInColumn.word.length,
      wordPosition: validWordInColumn.position,
      word: validWordInColumn.word,
    }
  }

  console.log('Row valid word:', validWordInRow)
  console.log('Row valid word:', validWordInColumn)

  res.status(200).json(response)
}
