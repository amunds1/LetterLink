import { Center, createStyles, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import Statistics from '../components/profile/Statistics'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const Profile = () => {
  const { classes } = useStyles()
  const [user, loading, error] = useAuthState(getAuth(firebase))

  return (
    <>
      {!user && !loading && (
        <Center className={classes.center}>
          <Text size={'xl'}>
            To view your profile you need to{' '}
            <Link href={'/signin'}>
              <a>Sign In</a>
            </Link>
          </Text>
        </Center>
      )}

      {user && !loading && <Statistics />}
    </>
  )
}

export default Profile
