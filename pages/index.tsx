import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { Center, Container, createStyles, Space, Text } from '@mantine/core'
import SignOut from '../components/SignOut'
import SignIn from '../components/SignIn'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import validateBoard from '../utils/validateBoard'

const useStyles = createStyles(() => ({
  center: { height: '100vh' },
}))

export default function Home() {
  const { classes } = useStyles()

  const [user, loading, error] = useAuthState(getAuth(firebase))
  const router = useRouter()

  console.log('Loading:', loading, '|', 'Current user:', user?.uid)

  useEffect(() => {
    console.log(user, loading)
  }, [user, loading, router])

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
