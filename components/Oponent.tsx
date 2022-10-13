import { Text } from '@mantine/core'
import { doc, getFirestore } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '../firebase/clientApp'
import usersConverter from '../firebase/converters/userConverter'
import Game from '../types/Game'
import selectUserID from '../utils/selectUserID'

interface IOponent {
  userUID: string
  game: Game
}

const Oponent = ({ userUID, game }: IOponent) => {
  const [userData, userLoading, userError] = useDocument(
    doc(
      getFirestore(firebase),
      'users',
      selectUserID(userUID, game.playerOne.id, game.playerTwo.id)
    ).withConverter(usersConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return <Text weight={500}>Game against {userData?.data()?.name}</Text>
}

export default Oponent
