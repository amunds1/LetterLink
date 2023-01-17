import { Button, createStyles, Stack } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ActiveGames from '../../components/games/ActiveGames'
import {
  fetchActiveGames,
  fetchProposedGames,
} from '../../components/games/firebase/fetchGames'
import gamesListChangedListener from '../../components/games/firebase/gamesListChangedListener'
import ProposedGames from '../../components/games/ProposedGames'
import { fetchUserData } from '../../components/profile/firebase/fetchUserData'
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

    let activeGames: Game[] | null = null
    let proposedGames: Game[] | null = null

    const uid = await fetchUID(ctx)

    // Fetch user data
    const userData = await fetchUserData(uid)

    // Fetch active games
    if (userData?.games?.length) {
      activeGames = await fetchActiveGames(userData.games)
    }

    // Fetch proposed games
    if (userData?.proposedGames?.length) {
      proposedGames = await fetchProposedGames(userData.proposedGames)
    }

    return {
      props: {
        uid: uid,
        activeGames: activeGames,
        proposedGames: proposedGames,
      },
    }
  } catch (err) {
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
  activeGames: Game[] | null
  proposedGames: Game[] | null
}

const Games = (props: IGames) => {
  const { classes } = useStyles()
  const { uid, activeGames, proposedGames } = props
  const router = useRouter()

  const refreshGamesList = () => {
    router.replace(router.asPath)
  }

  useEffect(() => {
    const unsubscribe = gamesListChangedListener(uid, refreshGamesList)

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => unsubscribe()
  }, [])

  return (
    <>
      <Stack style={{ width: '100%' }}>
        <Stack className={classes.center} style={{ width: '100%' }}>
          <ProposedGames userUID={uid} games={proposedGames} />
          <ActiveGames userUID={uid} games={activeGames} />
        </Stack>

        <Link href="/game/new">
          <Button>Start a new game</Button>
        </Link>
      </Stack>
    </>
  )
}

export default Games
