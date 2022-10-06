import { Button, Card, Text, Group, Badge, Center, Avatar } from '@mantine/core'

interface IGameProposal {
  oponent: { name: string; intials: string }
  proposedDaysAgo: string
}

const GameProposal = ({ oponent, proposedDaysAgo }: IGameProposal) => {
  return (
    <Card>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Game against {oponent.name}</Text>
        <Badge color="orange" variant="light">
          {proposedDaysAgo} days ago
        </Badge>
      </Group>
      <Center>
        <Avatar color="cyan" radius="xl" size={'lg'}>
          {oponent.intials}
        </Avatar>
      </Center>
      <Button variant="light" color="green" fullWidth mt="md" radius="md">
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
