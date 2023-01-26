import { Avatar, Grid, Group, Stack, Text, Flex } from '@mantine/core'
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
      <Group
        position="apart"
        key={game.id}
        style={{
          border: yourTurn ? '2px solid green' : '2px solid yellow',
          backgroundColor: yourTurn ? '#ebfbee' : '#FFFFF0',
          borderRadius: '5px',
          padding: '0.5rem',
        }}
      >
        <Link
          href={`/game/${game.id}`}
          style={{ color: 'inherit', textDecoration: 'none', width: '100%' }}
        >
          <Grid>
            <Grid.Col span="auto">
              <Stack spacing="xs">
                <Group spacing="sm">
                  <Avatar color="orange" radius="xl">
                    KL
                  </Avatar>
                  <Text color="black" weight="bold" size="md">
                    {opponent?.name}
                  </Text>
                </Group>
                <Group spacing="md">
                  <Text color="gray.7">
                    Rounds left: {Math.ceil(game.roundsLeft / 2)}
                  </Text>
                  <Text color="gray.7">
                    Boardsize: {game.boardSize}x{game.boardSize}
                  </Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span="content">
              <IconChevronRight />
            </Grid.Col>
          </Grid>
        </Link>
      </Group>
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
