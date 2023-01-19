import { createStyles, Stack } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import ActiveGames from '../components/games/ActiveGames'
import {
  fetchActiveGames,
  fetchProposedGames,
} from '../components/games/firebase/fetchGames'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import Streak from '../components/Streak'
import fetchUID from '../firebase/fetchUID'
import Game from '../types/Game'

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

interface IHome {
  activeGames: Game[] | null
  proposedGames: Game[] | null
  uid: string
}

export default function Home(props: IHome) {
  const { classes } = useStyles()

  const { activeGames, uid } = props

  return (
    <Stack className={classes.center}>
      {/* <Text size="xl">Welcome to the 5x5 game!</Text> */}
      <Streak />
      <ActiveGames userUID={uid} games={activeGames} />
    </Stack>
  )
}
