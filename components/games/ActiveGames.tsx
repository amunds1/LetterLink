import {
  Avatar,
  Grid,
  Group,
  Stack,
  Text,
  Card,
  useMantineColorScheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
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
  // Darkmode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  // Fetch opponent data to get name
  const [opponent, loading, error] = useDocumentDataOnce(
    doc(
      db,
      'users',
      selectUserID(userUID, game.playerOne as string, game.playerTwo as string)
    ).withConverter(usersConverter)
  )

  const ProfileIconsList: IProfileIcon = ProfileIcons

  return (
    <>
      <Card
        p="sm"
        shadow="sm"
        key={game.id}
        radius="md"
        style={{
          // Darkmode - Lime 8 and orange 8 33%
          // Lightmode - Lime 0 and orange 0
          backgroundColor: dark
            ? yourTurn
              ? '#66A80F33'
              : '#E8590C33'
            : yourTurn
            ? '#F4FCE3'
            : '#FFF4E6',
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
                  {opponent?.name && (
                    <Avatar src={ProfileIconsList[opponent?.name]} />
                  )}
                  {!opponent?.name && (
                    <Avatar src={ProfileIconsList['Unknown']} />
                  )}

                  <Text weight="bold" size="md">
                    {opponent?.name}
                  </Text>
                </Group>
                <Group spacing="md" mb="xs" ml="xs">
                  <Text color={dark ? 'dark.2' : 'gray.7'}>
                    {game.boardSize}x{game.boardSize}
                  </Text>
                  <Text color={dark ? 'dark.2' : 'gray.7'}>
                    Rounds left: {Math.ceil(game.roundsLeft / 2)}
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
                  // Darkmode - lime 2 & organge 2
                  // Lightmode - lime 8 & organge 8
                  color={
                    dark
                      ? yourTurn
                        ? '#D8F5A2'
                        : '#FFD8A8'
                      : yourTurn
                      ? '#66A80F'
                      : '#E8590C'
                  }
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
          <Text align="center" size="xl" weight="bold" mt="sm">
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
          <Text align="center" size="xl" weight="bold" mt="sm">
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
