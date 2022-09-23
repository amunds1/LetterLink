import { doc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import firebase from '../../firebase/clientApp'
import { useDocument } from 'react-firebase-hooks/firestore'
import gamesConverter from '../../utils/gamesConverter'

import { Button } from '@mantine/core'
import Link from 'next/link'

export type GameStandalone = {
  boardSize: number
  player1: {
    board: string
    user: string
  }
}

const GameID = () => {
  const router = useRouter()
  const { gameID } = router.query

  const [value, loading, error] = useDocument(
    doc(getFirestore(firebase), 'games', gameID as string).withConverter(
      gamesConverter
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const data = value?.data()

  return (
    <div>
      <p>Gameboard {data?.player1.board}</p>
      <p>Gameboard {data?.player1.board}</p>
      <Link href="/games">
        <Button>Back to games</Button>
      </Link>
    </div>
  )
}

export default GameID
