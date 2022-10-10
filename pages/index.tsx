import { Center, createStyles, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
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
      <Text size={'xl'}>Welcome to the 5x5 game!</Text>
    </Center>
  )
}
