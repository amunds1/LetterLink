import { doc, increment, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

export const updateStreak = async (
  uid: string,
  lastActionPerformed: Timestamp | undefined
) => {
  const currentDate = new Date()

  if (lastActionPerformed == undefined) {
    await updateDoc(doc(db, 'users', uid), {
      lastActionPerformed: Timestamp.fromDate(new Date()),
      streak: 1,
    })

    return
  }

  const dateStoredInFirebase = new Date(lastActionPerformed.seconds * 1000)

  if (dateStoredInFirebase.getDay() + 1 === currentDate.getDay()) {
    // Update date of last action performed in Firestore
    await updateDoc(doc(db, 'users', uid), {
      lastActionPerformed: Timestamp.now(),
      streak: increment(1),
    })
  } else if (dateStoredInFirebase.getDay() + 1 < currentDate.getDay()) {
    // Update date of last action performed in Firestore
    await updateDoc(doc(db, 'users', uid), {
      lastActionPerformed: Timestamp.now(),
      streak: 1,
    })
  }
}
