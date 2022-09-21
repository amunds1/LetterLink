import { collection, doc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import firebase from '../../firebase/clientApp'
import { useCollectionData, useDocument } from 'react-firebase-hooks/firestore'

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

  // FIXME Replace hard coded ID with gameID. gameID does not seem
  // to load before useDocument is called
  const [value, loading, error] = useDocument(
    doc(getFirestore(firebase), 'games', 'RaLiOvotbc1eKvnwdqVJ'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const data = value?.data()

  return (
    <div>
      <p>Gameboard {data?.boardSize}</p>
      <p>Gameboard {data?.player1.board}</p>
    </div>
  )
}

export default GameID
