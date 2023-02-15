import { Card, Stack, Text, Loader } from '@mantine/core'
import Game from '../../types/Game'
import GameProposal from './GameProposal'

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
    <>
      {games.length > 0 && (
        <Stack>
          <Text align="left" size="xl" weight="bold">
            Game requests
          </Text>

          {games &&
            userUID &&
            games.map((game) => (
              <GameProposal key={game.id} game={game} userUID={userUID} />
            ))}
        </Stack>
      )}
    </>
  )
}

export default ProposedGames
