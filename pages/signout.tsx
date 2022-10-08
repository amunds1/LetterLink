import { signOut, getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import firebase from '../firebase/clientApp'

const SignOut = () => {
  useEffect(() => {
    signOut(getAuth(firebase))
  }, [])

  return <div>Successfully signed out</div>
}

export default SignOut
