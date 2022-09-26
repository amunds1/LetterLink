import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { doc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '../../firebase/clientApp'

export type GameStandalone = {
  boardSize: number
  player1: {
    board: string
    user: string
  }
}

const GameID = () => {
  const router = useRouter()
  const [gameID, setgameID] = useState<string | undefined>()

  useEffect(() => {
    if (!router.isReady) return

    const { gameID } = router.query
    setgameID(gameID as string)
  }, [gameID, router.isReady, router.query])

  const [value, loading, error] = useDocument(
    doc(getFirestore(firebase), `games/${gameID}`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const data = value?.data()

  return (
    <div>
      <p>Gameboard {data?.player1.board}</p>
      <p>Gameboard {JSON.stringify(router.query)}</p>
      <Link href="/games">
        <Button>Back to games</Button>
      </Link>
    </div>
  )
}

export default GameID
