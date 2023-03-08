import { Card, Divider, Group, Image, Stack, Text } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import ExperiencePointsBar from '../components/profile/ExperiencePointsBar'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import Statistics from '../components/profile/Statistics'
import ProfileIcons, { IProfileIcon } from '../constants/ProfileIcons'
import fetchUID from '../firebase/fetchUID'
import User from '../types/User'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Set cache header
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
    /* ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    ) */

    // Get userData from firestore
    const uid = await fetchUID(ctx)
    let userData = await fetchUserData(uid)
    userData = JSON.parse(JSON.stringify(userData))

    const gamesPlayed =
      userData?.achievements!['play-10-games'].completionStatus

    // Calculate win rate
    const winRate = userData?.wins! / gamesPlayed!

    // --- Calculate <most wins against> and <most defeats against> ---

    /* opponents is a dict at the form:

        opponents = {
          opponentID {
            youWon: 0,
            yoyLost: 0
          },
          opponentID2 {
            ...
          }
          ...
        }
    */
    const opponents = userData?.opponents

    // Temporary storing the user you have beaten the most
    let tempYouBeatenMost = {
      opponentID: '',
      youWon: 0,
    }

    // Temporary storing the user that have beaten you the most
    let tempBeatenYouMost = {
      opponentID: '',
      youLost: 0,
    }

    /* Going through the opponents list to find and update
    the one that have beaten you the most and 
    the one you have beaten the most.
    */
    for (let opponent in opponents) {
      if (opponents[opponent].youWon > tempYouBeatenMost.youWon) {
        tempYouBeatenMost = {
          opponentID: opponent,
          youWon: opponents[opponent].youWon,
        }
      }
      if (opponents[opponent].youLost > tempBeatenYouMost.youLost) {
        tempBeatenYouMost = {
          opponentID: opponent,
          youLost: opponents[opponent].youLost,
        }
      }
    }

    /* Set userBeatenYouMost and  userYouBeatenMost
    
    CASE 1:
      If you have no defeates or no wins, these will be empty strings */
    let userBeatenYouMost = tempBeatenYouMost.opponentID
    let userYouBeatenMost = tempYouBeatenMost.opponentID

    /* 
    CASE 2: 
      If you have beaten a user, it will fetch their username */
    if (userYouBeatenMost) {
      const youBeatenMostUserData = await fetchUserData(
        tempYouBeatenMost.opponentID
      )
      userYouBeatenMost = JSON.parse(
        JSON.stringify(youBeatenMostUserData?.name)
      )
    }

    /* 
    CASE 2: 
      If a user has beaten you, it will fetch their username */
    if (userBeatenYouMost) {
      const beatenYouMostUserData = await fetchUserData(
        tempBeatenYouMost.opponentID
      )
      userBeatenYouMost = JSON.parse(
        JSON.stringify(beatenYouMostUserData?.name)
      )
    }

    return {
      props: {
        userData,
        winRate,
        gamesPlayed: gamesPlayed,
        userBeatenYouMost,
        userYouBeatenMost,
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

interface IProfile {
  userData: User
  winRate: number
  gamesPlayed: number
  userBeatenYouMost: string
  userYouBeatenMost: string
}

const Profile = (props: IProfile) => {
  const {
    userData,
    winRate,
    gamesPlayed,
    userBeatenYouMost,
    userYouBeatenMost,
  } = props

  const ProfileIconsList: IProfileIcon = ProfileIcons

  return (
    <Stack style={{ height: '100%' }} align="center" justify="center">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart">
          <Group>
            <Image src={ProfileIconsList[userData.name]} width={60} />
            <Text size={30} weight="bold">
              {userData.name}
            </Text>
          </Group>
          {/* <Link href="/settings">
            <Image src="/icons/settings.svg" width={40} />
          </Link> */}
        </Group>
        <Divider my="sm" pb="lg" />
        <ExperiencePointsBar experiencePoints={userData.experiencePoints} />
        <Statistics
          winRate={winRate}
          gamesPlayed={gamesPlayed}
          userBeatenYouMost={userBeatenYouMost}
          userYouBeatenMost={userYouBeatenMost}
        />
      </Card>
    </Stack>
  )
}

export default Profile
