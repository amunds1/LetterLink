import { Avatar, Center, RingProgress, Stack, Text } from '@mantine/core'

const Statistics = () => {
  const ringSize = 100
  const ringThickness = 5

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 30,
        paddingTop: '2rem',
      }}
    >
      <Stack align="center">
        <RingProgress
          size={ringSize}
          thickness={ringThickness}
          sections={[{ value: 100, color: 'teal' }]}
          label={
            <Center>
              <Text color="green" weight={700} align="center" size="md">
                7
              </Text>
            </Center>
          }
        />
        <Text size={'md'}>Games played</Text>
      </Stack>

      <Stack align="center">
        <RingProgress
          size={ringSize}
          thickness={ringThickness}
          sections={[{ value: 42, color: 'blue' }]}
          label={
            <Text color="blue" weight={700} align="center" size="md">
              42%
            </Text>
          }
        />
        <Text size={'md'}>Win rate</Text>
      </Stack>

      <Stack align="center">
        <Avatar size={ringSize} color="blue" variant="outline" />
        <Text size={'sm'}>Most wins against</Text>
      </Stack>

      <Stack align="center">
        <Avatar size={ringSize} color="blue" variant="outline" />
        <Text size={'sm'}>Most defeats against</Text>
      </Stack>
    </div>
  )
}

export default Statistics
