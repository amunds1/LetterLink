import Link from 'next/link'
import { Card, Group, Button, Text } from '@mantine/core'
import { QuerySnapshot } from 'firebase/firestore'
import Game from '../../types/Game'
import Oponent from './Oponent'

interface IActiveGames {
  userUID: string
  games: Game[] | null
}

const ActiveGames = ({ games, userUID }: IActiveGames) => {
  return (
    <>
      {games &&
        games.map((game) => {
          return (
            <Card key={game.id} shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                {/* <Oponent game={game} userUID={userUID} /> */}
              </Group>

              <Text size="sm" color="dimmed">
                Boardsize {game.boardSize}
              </Text>

              <Link href={`/game/${game.id}`}>
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Continue
                </Button>
              </Link>
            </Card>
          )
        })}
    </>
  )
}

export default ActiveGames
