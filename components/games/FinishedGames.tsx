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

  /* TODO: 
        [ ] gjøre dette om til eget komponent
        [ ] legge til hvem som vant på finished games 
  */
  return (
    <>
      <Group
        position="apart"
        key={game.id}
        style={{
          border: '2px solid gray',
          backgroundColor: '#dee2e6',
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
