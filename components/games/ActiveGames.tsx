import { Avatar, Button, Card, Group, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import Game from '../../types/Game'
import ColorSchemeToggle from '../ColorSchemeToggle'

interface IActiveGames {
  userUID: string
  games: Game[] | null
}

interface IActiveGame {
  game: Game
  yourTurn: boolean
}
const ActiveGame = ({ game, yourTurn }: IActiveGame) => {
  return (
    <>
      <Group
        position="apart"
        mb="sm"
        key={game.id}
        style={{
          border: yourTurn ? '2px solid green' : '2px solid gray',
          backgroundColor: yourTurn ? '#ebfbee' : '#dee2e6',
          borderRadius: '5px',
          padding: '0.5rem',
        }}
      >
        <Stack>
          <Group spacing="xl">
            <Text color="black">Against {game.opponentName}</Text>
            <Avatar color="orange" radius="xl">
              KL
            </Avatar>
          </Group>
          <Group spacing="xl">
            <Text color="gray.7">Rounds left: 8</Text>
            <Text color="gray.7">
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

      <Text size="lg" pb="sm">
        Your turn
      </Text>
      {games &&
        games
          .filter((game) => game.nextTurn === userUID)
          .map((game) => (
            <ActiveGame key={game.id} game={game} yourTurn={true} />
          ))}

      <Text size="lg" pb="sm">
        Their turn
      </Text>
      {games &&
        games
          .filter((game) => game.nextTurn != userUID)
          .map((game) => (
            <ActiveGame key={game.id} game={game} yourTurn={false} />
          ))}
    </Card>
  )
}

export default ActiveGames
