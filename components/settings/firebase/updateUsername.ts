import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

const updateUsername = async (userUID: string, newUsername: string) => {
  console.log('eid', userUID, newUsername)
  const userRef = doc(db, 'users', userUID)

  await updateDoc(userRef, {
    name: newUsername,
  })

  return true
}

export default updateUsername
