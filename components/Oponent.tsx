import { doc, getFirestore, QueryDocumentSnapshot } from 'firebase/firestore'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '../firebase/clientApp'
import Game from '../types/Game'
import usersConverter from '../utils/userConverter'
import { Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import selectUserID from '../utils/selectUserID'

const Oponent = ({ game }: { game: Game }) => {
  const [userAuthData, loading, error] = useAuthState(getAuth(firebase))

  const [userData, userLoading, userError] = useDocument(
    userAuthData &&
      doc(
        getFirestore(firebase),
        'users',
        selectUserID(
          userAuthData.uid,
          game.player1.user.id,
          game.player2.user.id
        )
      ).withConverter(usersConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return <Text weight={500}>Game against {userData?.data()?.name}</Text>
}

export default Oponent
