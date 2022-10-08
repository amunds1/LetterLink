import { Center, createStyles, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AuthenticationForm } from '../components/SignIn/AuthenticationForm'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const SignIn = () => {
  const { classes } = useStyles()

  const [user, loading, error] = useAuthState(getAuth(firebase))

  const router = useRouter()

  useEffect(() => {
    if (user && !loading) {
      router.push('/games')
    }
  }, [user, loading, router])

  return (
    <>
      {user && !loading && (
        <Center className={classes.center}>
          <Text size={'xl'}>You are already signed in</Text>
        </Center>
      )}

      {!user && !loading && (
        <Center className={classes.center}>
          <AuthenticationForm />
        </Center>
      )}
    </>
  )
}

export default SignIn
