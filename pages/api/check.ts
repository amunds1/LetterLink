// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const wordExists = (word: string[]) => {
  if (JSON.stringify(word) == JSON.stringify(['A', 'B', 'E'])) return true

  return false
}

const checkRow = (prevBoardRow: string[], nextBoardRow: string[]): number => {
  // Find from which index arrays are different
  for (let i = 0; i < prevBoardRow.length; i++) {
    if (prevBoardRow[i] != nextBoardRow[i]) {
      const differentIndex = i
      console.log('Different from index', differentIndex)

      // In reverse, check words against Ordbok-API
      // Only checks words up to the differentIndex
      for (let k = nextBoardRow.length; k > differentIndex; k--) {
        const word = nextBoardRow.slice(0, k)

        if (wordExists(word)) {
          console.log('Found valid word:', word)

          return word.length
        }
      }
    }
  }

  return 0
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const rowPoints = [0, 0]
  const colPoints = [0, 0]

  // Board prior to move
  const prevBoardRow = ['A', 'B', 'C', 'D']
  // Board after move
  const nextBoardRow = ['A', 'B', 'E', 'D']

  console.log('Points for row', checkRow(prevBoardRow, nextBoardRow))

  res.status(200).json({ name: 'John Doe' })
}
