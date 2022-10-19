import { QuerySnapshot } from 'firebase/firestore'
import Game from '../../types/Game'
import GameProposal from './GameProposal'

interface IProposedGames {
  userUID: string
  games: Game[] | null
}

const ProposedGames = (props: IProposedGames) => {
  const { userUID, games } = props

  return (
    <>
      {games &&
        userUID &&
        games.map((game) => (
          <GameProposal key={game.id} game={game} userUID={userUID} />
        ))}
    </>
  )
}

export default ProposedGames
