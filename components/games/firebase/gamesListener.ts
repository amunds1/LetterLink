import { onSnapshot, doc } from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
import yourTurn from '../../../components/game/firebase/yourTurn'
import { db } from '../../../firebase/clientApp'
import gamesConverter from '../../../firebase/converters/gamesConverter'
import usersConverter from '../../../firebase/converters/userConverter'

const gamesListener = (userUID: string) => {
  onSnapshot(doc(db, 'users', userUID).withConverter(usersConverter), (doc) => {
    console.log(doc.data())
  })
}

export default gamesListener
