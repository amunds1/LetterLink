import Link from 'next/link'
import { Card, Group, Button, Text } from '@mantine/core'
import { QuerySnapshot } from 'firebase/firestore'
import Game from '../types/Game'
import Oponent from './Oponent'

const ActiveGames = ({ games }: { games: QuerySnapshot<Game> | undefined }) => {
  return (
    <>
      {games &&
        games.docs.map((game) => {
          const gameData = game.data()

          return (
            <Card key={game.id} shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                <Oponent game={gameData} />
              </Group>

              <Text size="sm" color="dimmed">
                Boardsize {gameData.boardSize}
              </Text>

              <Link href={`/game/${gameData.id}`}>
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
