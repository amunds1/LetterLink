import { Button } from '@mantine/core'
import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import firebase from '../firebase/clientApp'

const SignOut = () => {
  return <Button onClick={() => signOut(getAuth(firebase))}>Log out</Button>
}

export default SignOut
