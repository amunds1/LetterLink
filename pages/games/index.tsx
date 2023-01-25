import { Button, createStyles, Stack } from '@mantine/core'
import { collection, doc, query, where } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ActiveGames from '../../components/games/ActiveGames'
import {
  fetchActiveGames,
  fetchProposedGames,
} from '../../components/games/firebase/fetchGames'
import ProposedGames from '../../components/games/ProposedGames'
import { fetchUserData } from '../../components/profile/firebase/fetchUserData'
import { db } from '../../firebase/clientApp'
import gamesConverter from '../../firebase/converters/gamesConverter'
import fetchUID from '../../firebase/fetchUID'
import Game from '../../types/Game'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Set cache header
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )

    let activeGames: Game[] = []
    let proposedGames: Game[] = []

    const uid = await fetchUID(ctx)

    // Fetch user data
    const userData = await fetchUserData(uid)

    // Fetch active games
    if (userData?.games?.length) {
      activeGames = await fetchActiveGames(userData.games, uid)
    }

    // Fetch proposed games
    if (userData?.proposedGames?.length) {
      proposedGames = await fetchProposedGames(userData.proposedGames, uid)
    }

    return {
      props: {
        uid: uid,
        activeGames: activeGames,
        proposedGames: proposedGames,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

interface IGames {
  uid: string
  activeGames: Game[]
  proposedGames: Game[]
}

const Games = (props: IGames) => {
  const { classes } = useStyles()
  const { uid } = props

  const [games, setGames] = useState<Game[]>(
    props.proposedGames.concat(props.activeGames)
  )

  /* 
    Listen for changes on documents where the DocumentReference value of playerOne matches
    the authenticated user
  */
  const [gamesPlayerOneField, loadingPlayerOne, errorPlayerOe] =
    useCollectionData(
      query(
        collection(db, 'games').withConverter(gamesConverter),
        where('playerOne', '==', doc(db, 'users', uid))
      ),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    )

  /* 
    Listen for changes on documents where the DocumentReference value of playerTwo matches
    the authenticated user
  */
  const [gamesPlayerTwoField, loadingPlayerTwo, errorPlayerTwo] =
    useCollectionData(
      query(
        collection(db, 'games').withConverter(gamesConverter),
        where('playerTwo', '==', doc(db, 'users', uid))
      ),
      {
        snapshotListenOptions: { includeMetadataChanges: true },
      }
    )

  /*
    When either gamesPlayerOneField or gamesPlayerTwoField changes, combine them and
    add them to the games array
  */
  useEffect(() => {
    if (gamesPlayerOneField && gamesPlayerTwoField) {
      setGames(gamesPlayerOneField.concat(gamesPlayerTwoField))
    }
  }, [gamesPlayerOneField, gamesPlayerTwoField])

  return (
    <>
      <Stack style={{ width: '100%' }}>
        <Stack className={classes.center} style={{ width: '100%' }}>
          {/* Display proposed games (isActive = false) using filter */}
          <ProposedGames
            userUID={uid}
            games={games.filter((game) => game.isActive == false)}
          />
          {/* Display active games (isActive = true) using filter */}
          <ActiveGames
            userUID={uid}
            games={games.filter((game) => game.isActive == true)}
          />
        </Stack>

        <Link href="/game/new">
          <Button>Start a new game</Button>
        </Link>
      </Stack>
    </>
  )
}

export default Games
