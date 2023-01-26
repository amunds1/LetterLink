import { Card, Stack, Text, Loader } from '@mantine/core'
import Game from '../../types/Game'
import GameProposal from './GameProposal'
import GameProposalCompact from './GameProposalCompact'

interface IProposedGames {
  userUID: string
  games: Game[] | null
}

const ProposedGames = (props: IProposedGames) => {
  const { userUID, games } = props

  if (!games)
    return (
      <Stack>
        <Text italic={true} color="grey">
          No games found
        </Text>
      </Stack>
    )

  return (
    <Stack>
      {games.length > 0 && (
        <>
          <Text align="left" size="xl" weight="bold">
            Game requests
          </Text>
          <Card shadow="sm" p="sm" radius="md" withBorder>
            {games &&
              userUID &&
              games.map((game) => (
                <GameProposal key={game.id} game={game} userUID={userUID} />
              ))}
          </Card>
        </>
      )}
    </Stack>
  )
}

export default ProposedGames
