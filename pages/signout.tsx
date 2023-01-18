import { Center, createStyles, Text } from '@mantine/core'
import { getAuth, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const SignOut = () => {
  const [signedOut, setSignedOut] = useState(false)
  const { classes } = useStyles()

  useEffect(() => {
    signOut(getAuth(firebase)).then((e) => {
      setSignedOut(true)
    })
  }, [])

  return (
    <Center className={classes.center}>
      {signedOut && <Text size="xl">Successfully signed out</Text>}
    </Center>
  )
}

export default SignOut
