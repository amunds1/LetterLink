import { Avatar, Button, Card, Group, Stack, Text } from '@mantine/core'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase/clientApp'
import usersConverter from '../../firebase/converters/userConverter'
import Game from '../../types/Game'
import selectUserID from './utils/selectUserID'

interface IActiveGames {
  userUID: string
  games: Game[] | null
}

interface IActiveGame {
  game: Game
  yourTurn: boolean
  userUID: string
}
const ActiveGame = ({ game, yourTurn, userUID }: IActiveGame) => {
  // Fetch opponent data to get name
  const [opponent, loading, error] = useDocumentDataOnce(
    doc(
      db,
      'users',
      selectUserID(userUID, game.playerOne as string, game.playerTwo as string)
    ).withConverter(usersConverter)
  )

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
            <Text color="black">Against {opponent?.name}</Text>
            <Avatar color="orange" radius="xl">
              KL
            </Avatar>
          </Group>
          <Group spacing="xl">
            <Text color="gray.7">
              Rounds left: {Math.ceil(game.roundsLeft / 2)}
            </Text>
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
            <ActiveGame
              key={game.id}
              game={game}
              yourTurn={true}
              userUID={userUID}
            />
          ))}

      <Text size="lg" pb="sm">
        Their turn
      </Text>
      {games &&
        games
          .filter((game) => game.nextTurn != userUID)
          .map((game) => (
            <ActiveGame
              key={game.id}
              game={game}
              yourTurn={false}
              userUID={userUID}
            />
          ))}
    </Card>
  )
}

export default ActiveGames
