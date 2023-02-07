import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Text,
} from '@mantine/core'
import { IconBan, IconCircleCheck, IconCircleX } from '@tabler/icons'
import { doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase/clientApp'
import usersConverter from '../../firebase/converters/userConverter'
import Game from '../../types/Game'
import acceptProposedGame from './firebase/acceptProposedGame'
import rejectProposedGame from './firebase/rejectProposedGame'
import withdrawGameProposal from './firebase/withdrawGameProposal'
import selectUserID from './utils/selectUserID'

interface IGameProposal {
  game: Game
  userUID: string
}

const GameProposal = ({ game, userUID }: IGameProposal) => {
  const [gameProposedTimeDelta, setGameProposedTimeDelta] = useState<{
    value: number
    label: string
  }>({ value: 0, label: '' })

  useEffect(() => {
    const proposedAtAsDate = new Date(game.proposedAt as Date)
    const timeDelta = Date.now() - proposedAtAsDate.getTime()

    const timeDeltaSeconds = timeDelta / 1000
    const timeDeltaMinutes = timeDeltaSeconds / 60
    const timeDeltaHours = timeDeltaMinutes / 60

    setGameProposedTimeDelta({
      value: Math.round(timeDeltaHours),
      label: 'hours',
    })
  }, [game])

  // Fetch opponent data to get name
  const [opponent, loading, error] = useDocumentDataOnce(
    doc(
      db,
      'users',
      selectUserID(userUID, game.playerOne as string, game.playerTwo as string)
    ).withConverter(usersConverter)
  )

  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <Group position="apart" mt="xs" ml="xs">
        <Group position="left">
          <Avatar color="cyan" radius="xl">
            AB
          </Avatar>
          <Text weight="bold"> {opponent?.name}</Text>
        </Group>
        <Badge color="orange" variant="light">
          {gameProposedTimeDelta.value} {gameProposedTimeDelta.label} ago
        </Badge>
      </Group>

      {userUID != (game.proposedBy as string) && (
        <>
          {/* ACCEPT PROPOSAL BUTTON */}
          <Grid>
            <Grid.Col span="auto">
              <Button
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
                variant="light"
                fullWidth
                color="lime"
                mt="md"
                radius="md"
                leftIcon={<IconCircleCheck color="#66A80F" />}
                style={{ border: '1px solid #D8F5A2' }}
              >
                <Text color="lime.8">Accept</Text>
              </Button>
            </Grid.Col>
            <Grid.Col span="auto">
              {/* REJECT PROPOSAL BUTTON */}
              <Button
                variant="light"
                fullWidth
                color="red"
                mt="md"
                radius="md"
                leftIcon={<IconBan color="#F03E3E" />}
                style={{ border: '1px solid #FFC9C9' }}
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
                <Text color="red.7">Reject</Text>
              </Button>
            </Grid.Col>
          </Grid>
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
          fullWidth
          mt="md"
          radius="md"
          leftIcon={<IconCircleX color="#F03E3E" />}
          style={{ border: '1px solid #FFC9C9' }}
        >
          <Text color="red.7">Withdraw proposal</Text>
        </Button>
      )}
    </Card>
  )
}

export default GameProposal
