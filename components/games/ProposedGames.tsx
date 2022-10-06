import { Group } from '@mantine/core'
import {
  collection,
  doc,
  documentId,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import React from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import firebase from '../../firebase/clientApp'
import gamesConverter from '../../firebase/converters/gamesConverter'
import usersConverter from '../../firebase/converters/userConverter'
import GameProposal from './GameProposal'

const ProposedGames = ({ userUID }: { userUID: string }) => {
  // Fetch proposedGames from user
  const [user, userLoading, userError] = useDocument(
    doc(getFirestore(firebase), 'users', userUID).withConverter(usersConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  // Fetch games by proposedGames
  const [games, gamesLoading, gamesError] = useCollection(
    user &&
      user.data() &&
      query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', user.data()?.proposedGames)
      ).withConverter(gamesConverter)
  )

  return (
    <Group spacing={'sm'}>
      {games &&
        games.docs.map((game) => (
          <GameProposal key={game.id} game={game.data()} userUID={userUID} />
        ))}
    </Group>
  )
}

export default ProposedGames
