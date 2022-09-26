import { Button, Stack } from '@mantine/core'
import {
  collection,
  doc,
  documentId,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import Link from 'next/link'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import ActiveGames from '../../components/ActiveGames'
import firebase from '../../firebase/clientApp'
import gamesConverter from '../../utils/gamesConverter'
import usersConverter from '../../utils/userConverter'

const Games = () => {
  /* 
    1. Fetch 'games' array from the document of the logged in user, from the 'users' collection
  */
  const [user, userLoading, userError] = useDocument(
    doc(
      getFirestore(firebase),
      'users',
      '5B7aHn9nPMbGj0RvapSacncvdDl1'
    ).withConverter(usersConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  /* 
    2. Retrieves games belonging to a user from the useDocument() hook above
  */
  const [games, gamesLoading, gamesError] = useCollection(
    user &&
      query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', user.data()?.games)
      ).withConverter(gamesConverter)
  )

  return (
    <Stack>
      <ActiveGames games={games} />
      <Link href="/game/new">
        <Button>Start a new game</Button>
      </Link>
    </Stack>
  )
}

export default Games
