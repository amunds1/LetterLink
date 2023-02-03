import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import firebase from './clientApp'

// https://www.audreyhal.com/blog/push-notifications-with-firebase-in-react

const messaging = getMessaging(firebase)

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPIT_KEY })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken)
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        )
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('payload', payload)
      resolve(payload)
    })
  })
