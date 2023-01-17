import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import usersConverter from '../../../firebase/converters/userConverter'

const gamesListChangedListener = (
  userUID: string,
  refreshGamesList: () => void
) =>
  onSnapshot(doc(db, 'users', userUID).withConverter(usersConverter), (doc) => {
    const data = doc.data()

    if (data) {
      console.log('Refreshing games data')
      refreshGamesList()
    }
  })

export default gamesListChangedListener
