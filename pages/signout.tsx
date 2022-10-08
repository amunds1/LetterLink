import { Center, createStyles, Text } from '@mantine/core'
import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const SignOut = () => {
  const { classes } = useStyles()

  useEffect(() => {
    signOut(getAuth(firebase))
  }, [])

  const [user, loading, error] = useAuthState(getAuth(firebase))

  return (
    <Center className={classes.center}>
      {!user && !loading && (
        <Text size={'xl'}>
          You were never logged in. Did you mean to{' '}
          <Link href={'/signin'}>
            <a>Sign In</a>
          </Link>
          ?
        </Text>
      )}

      {user && !loading && <Text size={'xl'}>Successfully signed out</Text>}
    </Center>
  )
}

export default SignOut
