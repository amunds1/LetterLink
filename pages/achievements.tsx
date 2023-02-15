import { Container, Stack } from '@mantine/core'
import { GetServerSidePropsContext } from 'next/types'
import Acheviement from '../components/achievements/Achievement'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
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

interface IAchievements {
  userData: User
}

const Achievements = (props: IAchievements) => {
  const { id, achievements } = props.userData

  return (
    <>
      {achievements && (
        <Container>
          <Stack align="center">
            {Object.keys(achievements).map((key) => (
              <Acheviement key={key} data={achievements[key]} />
            ))}
          </Stack>
        </Container>
      )}
    </>
  )
}

export default Achievements
