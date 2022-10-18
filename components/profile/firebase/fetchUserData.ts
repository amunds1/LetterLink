import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import usersConverter from '../../../firebase/converters/userConverter'

export const fetchUserData = async (uid: string) => {
  const userDocRef = doc(db, `users/${uid}`).withConverter(usersConverter)
  const userData = (await getDoc(userDocRef)).data()

  return userData
}
