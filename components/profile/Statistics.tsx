import { Avatar, Center, RingProgress, Stack, Text } from '@mantine/core'

const Statistics = ({
  winRate,
  gamesPlayed,
  userBeatenYouMost,
  userYouBeatenMost,
}: {
  winRate: number
  gamesPlayed: number
  userBeatenYouMost: string
  userYouBeatenMost: string
}) => {
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
                {gamesPlayed}
              </Text>
            </Center>
          }
        />
        <Text size="md">Games played</Text>
      </Stack>

      <Stack align="center">
        <RingProgress
          size={ringSize}
          thickness={ringThickness}
          sections={[{ value: winRate * 100, color: 'blue' }]}
          label={
            <Text color="blue" weight={700} align="center" size="md">
              {Math.round(winRate * 100)}%
            </Text>
          }
        />
        <Text size="md">Win rate</Text>
      </Stack>

      <Stack align="center">
        <Avatar
          size={ringSize}
          color={userYouBeatenMost ? 'blue' : 'gray'}
          variant="outline"
        />
        {userYouBeatenMost.length === 0 && <Text>No wins</Text>}
        {userYouBeatenMost.length > 0 && (
          <>
            <Text size="sm">
              Most wins against{' '}
              <Text span weight={700} size="md">
                {userYouBeatenMost}
              </Text>{' '}
            </Text>
          </>
        )}
      </Stack>

      <Stack align="center">
        <Avatar
          size={ringSize}
          color={userBeatenYouMost ? 'blue' : 'gray'}
          variant="outline"
        />
        {userBeatenYouMost.length === 0 && <Text>No defeats</Text>}
        {userBeatenYouMost.length > 0 && (
          <Text size="sm">
            Most defeats against{' '}
            <Text span weight={700} size="md">
              {userBeatenYouMost}
            </Text>{' '}
          </Text>
        )}
      </Stack>
    </div>
  )
}

export default Statistics
