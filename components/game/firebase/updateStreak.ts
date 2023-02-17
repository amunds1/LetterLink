import { updateDoc, arrayUnion, doc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import { IGameContext } from '../utils/gameContext'

export const updateStreak = async () => {
  const dateFromFirebase = new Date(2023, 1, 15)

  const currentDate = new Date()

  console.log(dateFromFirebase.getDay(), currentDate.getDay())

  if (dateFromFirebase.getDay() + 1 === currentDate.getDay()) {
    console.log('increment streak')
  } else if (dateFromFirebase.getDay() > currentDate.getDay() + 1) {
    console.log('reset streak')
  } else {
    console.log('do nothing')
  }

  /*
    
    
    2. If Date().getDay() stored === Date().getDay() + 1, then increment streak by one

    3. If Date().getDay() stored > Date().getDay() + 1, then reset streak to 0
  */

  // Update date of last action performed in Firestores
  /* await updateDoc(doc(db, 'users', gameContext.userUID), {
    lastActionPerformed: new Date(),
  }) */
}
