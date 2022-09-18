import React from 'react'
import StyledFirebaseAuth from '../components/StyledFirebaseAuth'
import firebase from '../firebase/clientApp'
import { getAuth, GithubAuthProvider } from 'firebase/auth'

// Configure FirebaseUI.
const uiConfig = {
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // GitHub as the only included Auth Provider.
  // You could add and configure more here!

  // getAuth(firebase.getApp()).auth.GithubAuthProvider.PROVIDER_ID,

  signInOptions: [GithubAuthProvider.PROVIDER_ID],
}

const login = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth(firebase)} />
  )
}

export default login
