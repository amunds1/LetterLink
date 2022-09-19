import { Button, Space } from '@mantine/core'
import React from 'react'
import firebase from '../firebase/clientApp'
import { useSignInWithGithub } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

const SignIn = () => {
  const [signInWithGithub] = useSignInWithGithub(getAuth(firebase))

  return (
    <>
      <a>Click here to sign in</a>
      <Space h="md" />
      <Button onClick={() => signInWithGithub()}>Sign in using GitHub</Button>
    </>
  )
}

export default SignIn
