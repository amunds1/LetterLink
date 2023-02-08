import { auth } from 'firebase-admin'
import { getApp, initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let firebase: FirebaseApp
if (!getApps().length) {
  firebase = initializeApp(clientCredentials)
} else {
  firebase = getApp()
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase)

// firebaseApps previously initialized using initializeApp()
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(getAuth(firebase), `https://localhost:4000`)

  if (!db._settingsFrozen) {
    connectFirestoreEmulator(db, 'localhost', 4000)
  }
}

export default firebase
