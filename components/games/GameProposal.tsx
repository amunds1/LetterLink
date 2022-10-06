import { Button, Card, Group, Badge, Center, Avatar } from '@mantine/core'
import Game from '../../types/Game'
import Oponent from '../Oponent'
import acceptProposedGame from './firebase/acceptProposedGame'

interface IGameProposal {
  game: Game
  userUID: string
}

const GameProposal = ({ game, userUID }: IGameProposal) => {
  return (
    <Card>
      <Group position="apart" mt="md" mb="xs">
        <Oponent game={game} />
        <Badge color="orange" variant="light">
          2 days ago
        </Badge>
      </Group>
      <Center>
        <Avatar color="cyan" radius="xl" size={'lg'}>
          AB
        </Avatar>
      </Center>
      <Button
        onClick={async () =>
          await acceptProposedGame({ gameID: game.id, userUID: userUID })
        }
        variant="light"
        color="green"
        fullWidth
        mt="md"
        radius="md"
      >
        Accept
      </Button>
      <Center>
        <Button variant="subtle" color="red" mt="md" radius="md">
          Reject
        </Button>
      </Center>
    </Card>
  )
}

export default GameProposal
