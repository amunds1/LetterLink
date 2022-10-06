import { Button, Group, Stack } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import {
  collection,
  doc,
  documentId,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import ActiveGames from '../../components/games/ActiveGames'
import GameProposal from '../../components/games/GameProposal'
import ProposedGames from '../../components/games/ProposedGames'
import firebase from '../../firebase/clientApp'
import gamesConverter from '../../firebase/converters/gamesConverter'
import usersConverter from '../../firebase/converters/userConverter'

const Games = () => {
  const [userAuthData, loading, error] = useAuthState(getAuth(firebase))

  /* 
    1. Fetch 'games' array from the document of the logged in user, from the 'users' collection
  */
  const [user, userLoading, userError] = useDocument(
    userAuthData &&
      doc(getFirestore(firebase), 'users', userAuthData.uid).withConverter(
        usersConverter
      ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  // Return null if games array belonging to a user is empty, true otherwise
  const hasGames = user?.data()?.games.length! ? true : null

  /* 
    2. Retrieves games belonging to a user from the useDocument() hook above
  */
  const [games, gamesLoading, gamesError] = useCollection(
    hasGames &&
      query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', user?.data()?.games)
      ).withConverter(gamesConverter)
  )

  return (
    <Stack>
      {userAuthData && <ProposedGames userUID={userAuthData.uid} />}
      <ActiveGames games={games} />
      <Link href="/game/new">
        <Button>Start a new game</Button>
      </Link>
    </Stack>
  )
}

export default Games
