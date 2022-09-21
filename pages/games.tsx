import { GetServerSideProps } from 'next'
import fetchGamesByUserID, { Game } from '../firebase/fetch/fetchGamesByUserID'
import { Card, Text, Button, Group } from '@mantine/core'

export const getServerSideProps: GetServerSideProps = async () => {
  const games = await fetchGamesByUserID('fCRVeYrTPFWyn1UF6QvQ')

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

            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
              Continue
            </Button>
          </Card>
        )
      })}
    </>
  )
}

export default Games
