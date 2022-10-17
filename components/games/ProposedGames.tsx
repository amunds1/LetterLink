import { QuerySnapshot } from 'firebase/firestore'
import Game from '../../types/Game'
import GameProposal from './GameProposal'

interface IProposedGames {
  userUID: string
  games: QuerySnapshot<Game> | undefined
}

const ProposedGames = (props: IProposedGames) => {
  const { userUID, games } = props

  console.log('Gamesss', games)

  // Fetch proposedGames from user
  /* const [user, userLoading, userError] = useDocument(
    doc(getFirestore(firebase), 'users', userUID).withConverter(usersConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  ) */

  // Return null if games array belonging to a user is empty, true otherwise
  //const hasProposedGames = user?.data()?.proposedGames?.length! ? true : null

  // Fetch games by proposedGames
  /* const [games, gamesLoading, gamesError] = useCollection(
    hasProposedGames &&
      user &&
      user.data() &&
      query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', user.data()?.proposedGames)
      ).withConverter(gamesConverter)
  ) */

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
