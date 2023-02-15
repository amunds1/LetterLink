import { Center, createStyles, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import AuthenticationForm from '../components/signin/AuthenticationForm'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const SignIn = () => {
  const { classes } = useStyles()

  const [user, loading, error] = useAuthState(getAuth(firebase))

  const router = useRouter()

  // Redirect to / if user is signed in
  useEffect(() => {
    if (user && !loading && !error) {
      router.push('/')
    }
  }, [user, loading, error, router])

  return (
    <>
      {!user && !loading && (
        <Center className={classes.center}>
          <AuthenticationForm />
        </Center>
      )}
    </>
  )
}

export default SignIn
