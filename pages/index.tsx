import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'

export default function Home() {
  // Destructure user, loading, and error out of the hook.
  const [user, loading, error] = useAuthState(getAuth(firebase))

  // console.log the current user and loading status
  console.log('Loading:', loading, '|', 'Current user:', user)

  return <div>Hello!</div>
}
