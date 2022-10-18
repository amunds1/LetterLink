import { Avatar, Badge, Button, Card, Center, Group } from '@mantine/core'
import { useEffect, useState } from 'react'
import Game from '../../types/Game'
import acceptProposedGame from './firebase/acceptProposedGame'
import rejectProposedGame from './firebase/rejectProposedGame'
import withdrawGameProposal from './firebase/withdrawGameProposal'

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
    const timeDelta = Date.now() - game.proposedAt.toMillis()

    const timeDeltaSeconds = timeDelta / 1000
    const timeDeltaMinutes = timeDeltaSeconds / 60
    const timeDeltaHours = timeDeltaMinutes / 60

    setGameProposedTimeDelta({
      value: Math.round(timeDeltaHours),
      label: 'hours',
    })
  }, [game])

  console.log(userUID != game.proposedBy.id)

  return (
    <Card>
      <Group position="apart" mt="md" mb="xs">
        {/* <Oponent game={game} userUID={userUID} /> */}
        <Badge color="orange" variant="light">
          {gameProposedTimeDelta.value} {gameProposedTimeDelta.label} ago
        </Badge>
      </Group>
      <Center>
        <Avatar color="cyan" radius="xl" size={'lg'}>
          AB
        </Avatar>
      </Center>

      {userUID === game.proposedBy.id && (
        <>
          {/* ACCEPT PROPOSAL BUTTON */}
          <Button
            onClick={async () => {
              await acceptProposedGame({
                gameID: game.id!,
                userUID: game.playerOne.id,
              })
              await acceptProposedGame({
                gameID: game.id!,
                userUID: game.playerTwo.id,
              })
            }}
            variant="light"
            color="green"
            fullWidth
            mt="md"
            radius="md"
          >
            Accept
          </Button>

          <Center>
            {/* REJECT PROPOSAL BUTTON */}
            <Button
              variant="subtle"
              color="red"
              mt="md"
              radius="md"
              onClick={async () => {
                await rejectProposedGame({
                  gameID: game.id!,
                  userUID: game.playerOne.id,
                })
                await rejectProposedGame({
                  gameID: game.id!,
                  userUID: game.playerTwo.id,
                })
              }}
            >
              Reject
            </Button>
          </Center>
        </>
      )}

      {userUID != game.proposedBy.id && (
        <Button
          onClick={async () => {
            await withdrawGameProposal({
              gameID: game.id!,
              userRef: game.playerOne,
            })
            await withdrawGameProposal({
              gameID: game.id!,
              userRef: game.playerTwo,
            })
          }}
          variant="light"
          color="red"
          fullWidth
          mt="md"
          radius="md"
        >
          Withdraw proposal
        </Button>
      )}
    </Card>
  )
}

export default GameProposal
