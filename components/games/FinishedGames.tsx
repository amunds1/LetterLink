import { Avatar, Grid, Group, Stack, Text, Card } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase/clientApp'
import usersConverter from '../../firebase/converters/userConverter'
import Game from '../../types/Game'
import selectUserID from './utils/selectUserID'

interface IFinishedGames {
  userUID: string
  games: Game[] | null
}

interface IFinishedGame {
  game: Game
  userUID: string
}

const FinishedGame = ({ game, userUID }: IFinishedGame) => {
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
      <Card
        shadow="lg"
        key={game.id}
        radius="md"
        style={{
          backgroundColor: '#C1C2C5',
          padding: '0.5rem',
          border: '1px solid #909296',
        }}
      >
        <Link
          href={`/game/${game.id}`}
          style={{ color: 'inherit', textDecoration: 'none', width: '100%' }}
        >
          <Grid>
            <Grid.Col span="auto">
              <Stack spacing="xs">
                <Group spacing="sm" mt="xs" ml="xs">
                  <Avatar color="orange" radius="xl">
                    KL
                  </Avatar>
                  <Text color="black" weight="bold" size="md">
                    {opponent?.name}
                  </Text>
                </Group>
                <Group spacing="md" mb="xs" ml="xs">
                  <Text color="gray.7">
                    {game.boardSize}x{game.boardSize}
                  </Text>
                  <Text color="gray.7">
                    {game.winner
                      ? game.winner === opponent?.name
                        ? `${game.winner} won the game`
                        : 'You won the game'
                      : 'The game has no winner'}
                  </Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span="content" mr="xs">
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  display: 'flex',
                }}
              >
                <IconChevronRight color="#141517" size="2rem" />
              </div>
            </Grid.Col>
          </Grid>
        </Link>
      </Card>
    </>
  )
}

const FinishedGames = ({ games, userUID }: IFinishedGames) => {
  if (!games) return <></>

  return (
    <Stack>
      {games.length > 0 && (
        <>
          <Text align="left" size="xl" weight="bold" mt="sm">
            Finished games
          </Text>
          {games &&
            userUID &&
            games.map((game) => (
              <FinishedGame key={game.id} game={game} userUID={userUID} />
            ))}
        </>
      )}
    </Stack>
  )
}

export default FinishedGames
