import {
  collection,
  documentId,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import ActiveGames from '../../components/ActiveGames'
import firebase from '../../firebase/clientApp'
import gamesConverter from '../../utils/gamesConverter'

const Games = () => {
  /* 
    Retrieves games belonging to a user from the 'games' collection, by gamesByID refrences, stored on the 'users' collection for a given user
  */
  const [value, loading, error] = useCollection(
    query(
      collection(getFirestore(firebase), 'games'),
      where(documentId(), 'in', ['RaLiOvotbc1eKvnwdqVJ'])
    ).withConverter(gamesConverter)
  )

  return <ActiveGames games={value} />
}

export default Games
