import firebase from './clientApp'
import { signOut, getAuth } from 'firebase/auth'

const signOutUser = async () => {
  await signOut(getAuth(firebase))
}

export default signOutUser
