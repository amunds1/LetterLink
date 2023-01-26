import { Card } from '@mantine/core'
import Game from '../../types/Game'
import GameProposal from './GameProposal'
import GameProposalCompact from './GameProposalCompact'

interface IProposedGames {
  userUID: string
  games: Game[] | null
}

const ProposedGames = (props: IProposedGames) => {
  const { userUID, games } = props

  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      {games &&
        userUID &&
        games.map((game) => (
          <GameProposal key={game.id} game={game} userUID={userUID} />
        ))}
    </Card>
  )
}

export default ProposedGames
