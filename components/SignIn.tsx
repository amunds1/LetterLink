import { Button, Center, Container, createStyles, Space } from '@mantine/core'
import React from 'react'
import firebase from '../firebase/clientApp'
import { useSignInWithGithub } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

const useStyles = createStyles(() => ({
  container: { height: '100%', width: '10%', backgroundColor: 'red' },
}))

const SignIn = () => {
  const { classes } = useStyles()

  const [signInWithGithub] = useSignInWithGithub(getAuth(firebase))

  return (
    <Container className={classes.container}>
      <a>Click here to sign in</a>
      <Space h="md" />
      <Button onClick={() => signInWithGithub()}>Sign in using GitHub</Button>
    </Container>
  )
}

export default SignIn
