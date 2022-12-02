import { Center, createStyles, Text } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import Statistics from '../components/profile/Statistics'
import fetchUID from '../firebase/fetchUID'
import User from '../types/User'

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

  const { classes } = useStyles()

  return (
    <>
      <Center>
        <Text size="lg">{userData.name}</Text>
      </Center>
      <Statistics />
    </>
  )
}

export default Profile
