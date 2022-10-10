// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import validateBoard from '../../utils/validateBoard'
import CheckBoardRequestData from './types/CheckBoardRequestData'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const boardData: CheckBoardRequestData = {
    gameID: 'gamK381QMVcb9SUVU1Nv',
    userID: 'l7QwyHv2CWWPb2LZPxcnQFtiNLs1',
    board: ['T', 'E', 'S', 'T'],
    row: {
      data: ['K', 'A', 'K', 'E'],
      positionIndex: 2,
      differentIndex: 1,
    },
    column: {
      data: ['K', 'A', 'K', 'E'],
      positionIndex: 0,
      differentIndex: 1,
    },
  }

  const r = await validateBoard(boardData)
  console.log(r)

  res.status(200).json({ name: 'John Doe' })
}
