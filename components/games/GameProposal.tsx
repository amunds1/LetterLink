import { Button, Card, Group, Badge, Center, Avatar } from '@mantine/core'
import { useEffect, useState } from 'react'
import Game from '../../types/Game'
import Oponent from '../Oponent'
import acceptProposedGame from './firebase/acceptProposedGame'
import rejectProposedGame from './firebase/rejectProposedGame'

interface IGameProposal {
  game: Game
}

const GameProposal = ({ game }: IGameProposal) => {
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

  console.log(gameProposedTimeDelta)

  return (
    <Card>
      <Group position="apart" mt="md" mb="xs">
        <Oponent game={game} />
        <Badge color="orange" variant="light">
          {gameProposedTimeDelta.value} {gameProposedTimeDelta.label} ago
        </Badge>
      </Group>
      <Center>
        <Avatar color="cyan" radius="xl" size={'lg'}>
          AB
        </Avatar>
      </Center>
      <Button
        onClick={async () => {
          await acceptProposedGame({
            gameID: game.id!,
            userRef: game.playerOne,
          })
          await acceptProposedGame({
            gameID: game.id!,
            userRef: game.playerTwo,
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
        <Button
          variant="subtle"
          color="red"
          mt="md"
          radius="md"
          onClick={async () => {
            await rejectProposedGame({
              gameID: game.id!,
              userRef: game.playerOne,
            })
            await rejectProposedGame({
              gameID: game.id!,
              userRef: game.playerTwo,
            })
          }}
        >
          Reject
        </Button>
      </Center>
    </Card>
  )
}

export default GameProposal
