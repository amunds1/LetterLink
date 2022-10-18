import { Center, createStyles, Text } from '@mantine/core'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import Statistics from '../components/profile/Statistics'
import { db } from '../firebase/clientApp'
import usersConverter from '../firebase/converters/userConverter'
import fetchUID from '../firebase/fetchUID'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const uid = await fetchUID(ctx)
    const userData = await fetchUserData(uid)

    // Can not directly pass userData because proposedGames and games are not serializable

    return {
      props: {
        userData: { name: userData?.name },
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
  userData: { name: string }
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
