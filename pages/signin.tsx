import { Center, createStyles, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AuthenticationForm } from '../components/signin/AuthenticationForm'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const SignIn = () => {
  const { classes } = useStyles()

  const [user, loading, error] = useAuthState(getAuth(firebase))

  return (
    <>
      {user && !loading && (
        <Center className={classes.center}>
          <Text size={'xl'}>Signed in as {user.displayName}</Text>
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
