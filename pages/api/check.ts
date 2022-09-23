// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const wordExists = (word: string[]) => {
  if (JSON.stringify(word) == JSON.stringify(['A', 'B', 'E'])) return true

  return false
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Board prior to move
  const prevBoard = ['A', 'B', 'C', 'D']
  // Board after move
  const nextBoard = ['A', 'B', 'E', 'D']

  // Find from which index arrays are different
  for (let i = 0; i < prevBoard.length; i++) {
    if (prevBoard[i] != nextBoard[i]) {
      const differentIndex = i
      console.log('Different from index', differentIndex)

      // In reverse, check words against Ordbok-API
      // Only checks words up to the differentIndex
      for (let k = nextBoard.length; k > differentIndex; k--) {
        const word = nextBoard.slice(0, k)

        if (wordExists(word)) {
          console.log('Found valid word:', word)
        }
      }
    }
  }

  res.status(200).json({ name: 'John Doe' })
}
