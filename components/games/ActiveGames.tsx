import { Avatar, Grid, Group, Stack, Text, Card } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
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
      <Card
        p="sm"
        shadow="sm"
        key={game.id}
        radius="md"
        style={{
          // Lime 0 and orange 0
          backgroundColor: yourTurn ? '#F4FCE3' : '#FFF4E6',
          padding: '0.5rem',
          border: yourTurn ? '1px solid #D8F5A2' : '1px solid #FFD8A8',
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
                  <Avatar
                    color="grape"
                    radius="xl"
                    style={{ border: '1px solid #EEBEFA' }}
                  >
                    KL
                  </Avatar>
                  <Text color="black" weight="bold" size="md">
                    {opponent?.name}
                  </Text>
                </Group>
                <Group spacing="md" mb="xs" ml="xs">
                  <Text color="gray.7">
                    Rounds left: {Math.ceil(game.roundsLeft / 2)}
                  </Text>
                  <Text color="gray.7">
                    Boardsize: {game.boardSize}x{game.boardSize}
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
                <IconChevronRight
                  color={yourTurn ? '#66A80F' : '#E8590C'}
                  size="2rem"
                />
              </div>
            </Grid.Col>
          </Grid>
        </Link>
      </Card>
    </>
  )
}

const ActiveGames = ({ games, userUID }: IActiveGames) => {
  if (!games) return <></>

  return (
    <Stack>
      {/* YOUR TURN */}
      {games?.filter((game) => game.nextTurn === userUID).length > 0 && (
        <Stack>
          <Text align="left" size="xl" weight="bold" mt="sm">
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
        </Stack>
      )}

      {/* THEIR TURN */}
      {games?.filter((game) => game.nextTurn != userUID).length > 0 && (
        <Stack>
          <Text align="left" size="xl" weight="bold" mt="sm">
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
        </Stack>
      )}
    </Stack>
  )
}

export default ActiveGames
