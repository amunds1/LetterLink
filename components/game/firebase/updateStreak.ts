import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

export const updateStreak = async (uid: string) => {
  const dateFromFirebase = new Date(2023, 1, 24)

  const currentDate = new Date(2023, 1, 25)

  console.log(dateFromFirebase.getDay(), currentDate.getDay())

  if (dateFromFirebase.getDay() + 1 === currentDate.getDay()) {
    console.log('Increment')

    // Update date of last action performed in Firestore
    await updateDoc(doc(db, 'users', uid), {
      lastActionPerformed: new Date(),
      streak: increment(1),
    })
  } else if (dateFromFirebase.getDay() + 1 < currentDate.getDay()) {
    console.log('Reset')

    // Update date of last action performed in Firestore
    await updateDoc(doc(db, 'users', uid), {
      lastActionPerformed: new Date(),
      streak: 1,
    })
  }
}
