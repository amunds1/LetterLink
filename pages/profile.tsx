import { Center, createStyles, Text } from '@mantine/core'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
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

    const userDocRef = doc(db, `users/${uid}`).withConverter(usersConverter)
    const userData = (await getDoc(userDocRef)).data()

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
  const { classes } = useStyles()

  return (
    <>
      <Center>
        <Text size="lg">{props.userData.name}</Text>
      </Center>
      <Statistics />
    </>
  )
}

export default Profile
