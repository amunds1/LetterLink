import { GetServerSideProps } from 'next'
import fetchGamesByUserID, {
  Game,
} from '../../firebase/fetch/fetchGamesByUserID'
import { Card, Text, Button, Group } from '@mantine/core'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await fetchGamesByUserID('5B7aHn9nPMbGj0RvapSacncvdDl1')

  return {
    props: { games },
  }
}

const Games = (games: { games: Game[] }) => {
  return (
    <>
      {games.games.map((game) => {
        return (
          <Card key={'abc'} shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Game against {game.oponent}</Text>
            </Group>

            <Text size="sm" color="dimmed">
              Boardsize {game.boardSize}
            </Text>

            <Link href={`/game/${2}`}>
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

export default Games
