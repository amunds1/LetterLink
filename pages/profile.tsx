import { Center, createStyles, Stack, Text } from '@mantine/core'
import { GetServerSidePropsContext } from 'next'
import ExperiencePointsBar from '../components/profile/ExperiencePointsBar'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import Statistics from '../components/profile/Statistics'
import fetchUID from '../firebase/fetchUID'
import User from '../types/User'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
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
      <Stack style={{ height: '100%' }} align="center" justify={'space-around'}>
        <Text size="lg">{userData.name}</Text>
        <ExperiencePointsBar />
        <Statistics />
      </Stack>
    </>
  )
}

export default Profile
