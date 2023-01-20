import { Avatar, Button, Card, Group, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import Game from '../../types/Game'

interface IActiveGames {
  userUID: string
  games: Game[] | null
}

interface IActiveGame {
  game: Game
  uid: string
}
const ActiveGame = ({ game, uid }: IActiveGame) => {
  return (
    <>
      <Group
        position="apart"
        mb="sm"
        key={game.id}
        style={{
          border: '2px solid green',
          backgroundColor: '#ebfbee',
          borderRadius: '5px',
          padding: '0.5rem',
        }}
      >
        <Stack>
          <Group spacing="xl">
            <Text>Against {game.opponentName}</Text>
            <Avatar color="orange" radius="xl">
              KL
            </Avatar>
          </Group>
          <Group spacing="xl">
            <Text color="#495057">Rounds left: 8</Text>
            <Text color="#495057">
              Boardsize: {game.boardSize}x{game.boardSize}
            </Text>
          </Group>
        </Stack>
        <Link
          href={`/game/${game.id}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Button color="green" variant="filled">
            Open game
          </Button>
        </Link>
      </Group>
    </>
  )
}

const ActiveGames = ({ games, userUID }: IActiveGames) => {
  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <Text align="left" size="lg" pb="xl">
        Active games
      </Text>
      {games &&
        games.map((game) => {
          return (
            <>
              <Text size="lg" pb="sm">
                Your turn
              </Text>
              <ActiveGame game={game} uid={userUID} />

              <Text size="lg" pb="sm">
                Their turn
              </Text>
            </>
          )
        })}
    </Card>
  )
}

export default ActiveGames
