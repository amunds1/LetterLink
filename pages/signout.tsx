import { Button, Center, createStyles, Space, Text } from '@mantine/core'
import { getAuth, signOut } from 'firebase/auth'
import Link from 'next/link'
import { useEffect } from 'react'
import firebase from '../firebase/clientApp'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const SignOut = () => {
  const { classes } = useStyles()

  useEffect(() => {
    signOut(getAuth(firebase))
  }, [])

  return (
    <Center className={classes.center}>
      <Text size={'xl'}>Successfully signed out</Text>
    </Center>
  )
}

export default SignOut
