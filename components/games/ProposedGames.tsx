import {
  collection,
  doc,
  documentId,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
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

  // Return null if games array belonging to a user is empty, true otherwise
  const hasProposedGames = user?.data()?.proposedGames?.length! ? true : null

  // Fetch games by proposedGames
  const [games, gamesLoading, gamesError] = useCollection(
    hasProposedGames &&
      user &&
      user.data() &&
      query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', user.data()?.proposedGames)
      ).withConverter(gamesConverter)
  )

  return (
    <>
      {games &&
        userUID &&
        games.docs.map((game) => (
          <GameProposal key={game.id} game={game.data()} userUID={userUID} />
        ))}
    </>
  )
}

export default ProposedGames
