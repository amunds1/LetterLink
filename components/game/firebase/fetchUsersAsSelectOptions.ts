import { SelectItem } from '@mantine/core'
import {
  query,
  collection,
  where,
  documentId,
  getDocs,
} from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import usersConverter from '../../../firebase/converters/userConverter'

export const fetchUsersAsSelectOptions = async (uid: string) => {
  // Generate array of name and id to be used as Select options
  const options: (string | SelectItem)[] = []

  // Retrieve user documents of all users expect the authenticated one
  const q = query(
    collection(db, 'users'),
    where(documentId(), '!=', uid)
  ).withConverter(usersConverter)

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((user) => {
    options.push({ value: user.data().id, label: user.data().name })
  })

  return options
}
