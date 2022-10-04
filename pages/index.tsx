import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Center, Container, createStyles, Space, Text } from '@mantine/core'
import SignOut from '../components/SignOut'
import SignIn from '../components/SignIn'
import { useEffect } from 'react'
import validateBoard from '../utils/validateBoard'

const useStyles = createStyles(() => ({
  center: { height: '100vh' },
}))

export default function Home() {
  const { classes } = useStyles()

  const [user, loading, error] = useAuthState(getAuth(firebase))

  console.log('Loading:', loading, '|', 'Current user:', user?.uid)

  return (
    <Center className={classes.center}>
      {user ? (
        <Container>
          <Text size={'xl'}>Hello, {user.displayName}!</Text>
          <Space h="md" />
          <SignOut />
        </Container>
      ) : (
        <Container>
          <SignIn />
        </Container>
      )}
    </Center>
  )
}
