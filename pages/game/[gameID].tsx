import { useRouter } from 'next/router'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { doc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase, { db } from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import GameBoard from '../../components/GameBoard'

const GameID = () => {
  const router = useRouter()
  const [gameID, setgameID] = useState<string>()

  const [userAuthData, loadingUserAuthData, userAuthDataError] = useAuthState(
    getAuth(firebase)
  )

  useEffect(() => {
    if (!router.isReady) return

    const { gameID } = router.query
    setgameID(gameID as string)
  }, [gameID, router.isReady, router.query])

  const [value, loading, error] = useDocument(
    doc(
      getFirestore(firebase),
      `games/${gameID}/${userAuthData?.uid}/boardData`
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const data = value?.data()
  console.log(data?.board)

  return (
    data &&
    gameID &&
    userAuthData && (
      <div>
        <p>Gameboard {data.board}</p>
        <GameBoard
          grid={{
            size: 3,
            values: data.board,
          }}
          gameID={gameID}
          userID={userAuthData.uid}
        />

        <Link href="/games">
          <Button>Back to games</Button>
        </Link>
      </div>
    )
  )
}

export default GameID
