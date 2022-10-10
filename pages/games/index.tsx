import { Button, Center, createStyles, Stack, Text } from '@mantine/core'
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
import ProposedGames from '../../components/games/ProposedGames'
import firebase from '../../firebase/clientApp'
import gamesConverter from '../../firebase/converters/gamesConverter'
import usersConverter from '../../firebase/converters/userConverter'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const Games = () => {
  const { classes } = useStyles()
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
  const hasGames = user?.data()?.games?.length! ? true : null

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
    <>
      {!userAuthData && !loading && (
        <Center className={classes.center}>
          <Text size={'xl'}>
            To view your games you need to{' '}
            <Link href={'/signin'}>
              <a>Sign In</a>
            </Link>
          </Text>
        </Center>
      )}

      {userAuthData && !loading && (
        <Stack style={{ width: '100%' }}>
          <Stack className={classes.center} style={{ width: '100%' }}>
            <ProposedGames userUID={userAuthData.uid} />
            {games && <ActiveGames games={games} />}
          </Stack>

          <Link href="/game/new">
            <Button>Start a new game</Button>
          </Link>
        </Stack>
      )}
    </>
  )
}

export default Games
