import { Stack } from '@mantine/core'
import { getDocs, collection } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import LeaderboardList from '../leaderboard/LeaderboardList'
import Podium from '../leaderboard/Podium'
import { db } from '../../firebase/clientApp'
import usersConverter from '../../firebase/converters/userConverter'
import User from '../../types/User'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Set cache header
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
    /* ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    ) */

    // Retrieve all documents in users collection
    const querySnapshot = await getDocs(
      collection(db, 'users').withConverter(usersConverter)
    )

    // Sort users by XP
    const usersDocumentsSortedByXP = querySnapshot.docs.sort((a, b) => {
      return b.data().experiencePoints - a.data().experiencePoints
    })

    // Convert to list containing only name and XP
    const usersSortedByXP: Partial<User>[] = []
    usersDocumentsSortedByXP.forEach((user) => {
      usersSortedByXP.push({
        name: user.data().name,
        experiencePoints: user.data().experiencePoints,
      })
    })

    return {
      props: { usersSortedByXP },
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

interface ILeaderboard {
  usersSortedByXP: Partial<User>[]
}

const Leaderboard = (props: ILeaderboard) => {
  const { usersSortedByXP } = props

  // Top three -> podium
  const podiumData = usersSortedByXP.slice(0, 3)
  // Rest -> List up as cards
  const restPlayers = usersSortedByXP.slice(3)

  return (
    <Stack align="center">
      <Podium players={podiumData} />
      <LeaderboardList players={restPlayers} />
    </Stack>
  )
}

export default Leaderboard
