import {
  Avatar,
  Grid,
  Group,
  Stack,
  Text,
  Card,
  Button,
  Collapse,
  Container,
  Box,
} from '@mantine/core'
import { IconChevronDown, IconChevronRight, IconChevronUp } from '@tabler/icons'
import { doc } from 'firebase/firestore'
import Link from 'next/link'
import { useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
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

  const ProfileIconsList: IProfileIcon = ProfileIcons

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
                  {opponent?.name && (
                    <Avatar src={ProfileIconsList[opponent?.name]} />
                  )}
                  {!opponent?.name && (
                    <Avatar src={ProfileIconsList['Unknown']} />
                  )}
                  <Text color="black" weight="bold" size="md">
                    {opponent?.name}
                  </Text>
                </Group>
                <Group spacing="md" mb="xs" ml="xs">
                  <Text color="gray.7">
                    {game.boardSize}x{game.boardSize}
                  </Text>
                  <Text color="gray.7">
                    {opponent &&
                      (game.winner == userUID
                        ? 'You won the game'
                        : game.winner == opponent.id
                        ? `${opponent.name} won the game`
                        : 'The game has no winner')}
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
                <IconChevronRight color="#141517" />
              </div>
            </Grid.Col>
          </Grid>
        </Link>
      </Card>
    </>
  )
}

const FinishedGames = ({ games, userUID }: IFinishedGames) => {
  const [opened, setOpened] = useState(false)

  if (!games) return <></>

  return (
    <>
      {games.length > 0 && (
        <>
          <Button
            onClick={() => setOpened((o) => !o)}
            rightIcon={
              !opened ? (
                <IconChevronDown color="black" />
              ) : (
                <IconChevronUp color="black" />
              )
            }
            variant="subtle"
            style={{ width: '100%', justifyContent: 'left' }}
          >
            <Text size="xl" weight="bold" color="black">
              Finished games
            </Text>
          </Button>
          <Collapse
            in={opened}
            transitionDuration={100}
            transitionTimingFunction="linear"
          >
            <Stack>
              {games &&
                userUID &&
                games.map((game) => (
                  <FinishedGame key={game.id} game={game} userUID={userUID} />
                ))}
            </Stack>
          </Collapse>
        </>
      )}
    </>
  )
}

export default FinishedGames
