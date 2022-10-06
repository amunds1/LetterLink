import { Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '../firebase/clientApp'
import usersConverter from '../firebase/converters/userConverter'
import Game from '../types/Game'
import selectUserID from '../utils/selectUserID'

const Oponent = ({ game }: { game: Game }) => {
  const [userAuthData, loading, error] = useAuthState(getAuth(firebase))

  const [userData, userLoading, userError] = useDocument(
    userAuthData &&
      doc(
        getFirestore(firebase),
        'users',
        selectUserID(userAuthData.uid, game.playerOne.id, game.playerTwo.id)
      ).withConverter(usersConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return <Text weight={500}>Game against {userData?.data()?.name}</Text>
}

export default Oponent
