import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  createStyles,
  Group,
  Stack,
  Text,
} from '@mantine/core'
import { IconCircleCheck, IconCircleLetterX } from '@tabler/icons'
import { useEffect, useState } from 'react'
import Game from '../../types/Game'
import acceptProposedGame from './firebase/acceptProposedGame'
import rejectProposedGame from './firebase/rejectProposedGame'
import withdrawGameProposal from './firebase/withdrawGameProposal'

interface IGameProposal {
  game: Game
  userUID: string
}

const useStyles = createStyles((theme) => ({
  opponent: {
    size: theme.fontSizes.md,

    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.sm,
    },

    [theme.fn.smallerThan(500)]: {
      fontSize: theme.fontSizes.sm,
    },
  },
  opponentStats: {
    size: theme.fontSizes.md,

    [theme.fn.smallerThan('sm')]: {
      fontSize: theme.fontSizes.sm,
    },

    [theme.fn.smallerThan(500)]: {
      fontSize: theme.fontSizes.sm,
    },
  },
}))

const GameProposalCompact = ({ game, userUID }: IGameProposal) => {
  const [gameProposedTimeDelta, setGameProposedTimeDelta] = useState<{
    value: number
    label: string
  }>({ value: 0, label: '' })

  /* useEffect(() => {
    const proposedAtAsDate = new Date(game.proposedAt as Date)
    const timeDelta = Date.now() - proposedAtAsDate.getTime()

    const timeDeltaSeconds = timeDelta / 1000
    const timeDeltaMinutes = timeDeltaSeconds / 60
    const timeDeltaHours = timeDeltaMinutes / 60

    setGameProposedTimeDelta({
      value: Math.round(timeDeltaHours),
      label: 'hours',
    })
  }, [game]) */

  const { classes } = useStyles()

  return (
    <Card>
      <Group position="center" mt="md" mb="xs" spacing={15}>
        <Stack align="center" justify="flex-start" spacing="xs">
          <Text pb={0} size="xs">
            New
          </Text>
          <div
            style={{
              height: '5px',
              width: '5px',
              backgroundColor: 'red',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
        </Stack>

        <Avatar color="cyan" radius="xl" size="md">
          AB
        </Avatar>

        <Stack spacing="xs">
          <Text className={classes.opponent}>Against {game.opponentName}</Text>
          <Text className={classes.opponentStats} color="gray.7">
            Level 2 • 200 XP
          </Text>
        </Stack>

        {/* <Badge color="orange" variant="light">
          {gameProposedTimeDelta.value} {gameProposedTimeDelta.label} ago
        </Badge> */}

        {userUID != game.proposedBy && (
          <>
            {/* ACCEPT PROPOSAL BUTTON */}
            <ActionIcon
              onClick={async () => {
                await acceptProposedGame({
                  gameID: game.id!,
                  userUID: game.playerOne as string,
                })
                await acceptProposedGame({
                  gameID: game.id!,
                  userUID: game.playerTwo as string,
                })
              }}
            >
              <IconCircleCheck color="#40c057" />
            </ActionIcon>
            <ActionIcon
              onClick={async () => {
                await rejectProposedGame({
                  gameID: game.id!,
                  userUID: game.playerOne as string,
                })
                await rejectProposedGame({
                  gameID: game.id!,
                  userUID: game.playerTwo as string,
                })
              }}
            >
              <IconCircleLetterX color="#fa5252" />
            </ActionIcon>
          </>
        )}

        {userUID === game.proposedBy && (
          <Button
            onClick={async () => {
              await withdrawGameProposal({
                gameID: game.id!,
                userUID: game.playerOne as string,
              })
              await withdrawGameProposal({
                gameID: game.id!,
                userUID: game.playerTwo as string,
              })
            }}
            variant="light"
            color="red"
            mt="md"
            radius="xl"
          >
            Withdraw proposal
          </Button>
        )}
      </Group>
    </Card>
  )
}

export default GameProposalCompact
