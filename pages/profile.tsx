import {
  Avatar,
  Button,
  Card,
  createStyles,
  Group,
  Stack,
  Text,
} from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import ExperiencePointsBar from '../components/profile/ExperiencePointsBar'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import Statistics from '../components/profile/Statistics'
import fetchUID from '../firebase/fetchUID'
import User from '../types/User'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Set cache header
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )

    const uid = await fetchUID(ctx)
    const userData = JSON.parse(JSON.stringify(await fetchUserData(uid)))

    return {
      props: {
        userData,
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
}

const Profile = (props: IProfile) => {
  const { userData } = props

  return (
    <Stack style={{ height: '100%' }} align="center" justify="center">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group position="apart" pb={'lg'}>
          <Group>
            <Avatar color="cyan" radius="xl">
              AA
            </Avatar>
            <Text size={30}>{userData.name}</Text>
          </Group>
          <Link href={'/settings'}>
            <Button variant="outline" size="xs">
              Edit profile
            </Button>
          </Link>
        </Group>
        <ExperiencePointsBar experiencePoints={userData.experiencePoints} />
        <Statistics />
      </Card>
      <Text size={30}>Previous games</Text>
    </Stack>
  )
}

export default Profile
