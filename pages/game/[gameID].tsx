import { doc, getFirestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import firebase from '../../firebase/clientApp'
import { useDocument } from 'react-firebase-hooks/firestore'

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

  console.log(value?.data())

  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
        {value && <span>Document: {JSON.stringify(value.data())}</span>}
      </p>
    </div>
  )
}

export default GameID
