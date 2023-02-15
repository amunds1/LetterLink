import { Avatar, Center, RingProgress, Stack, Text, Image } from '@mantine/core'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'

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
  const ProfileIconsList: IProfileIcon = ProfileIcons

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 1,
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
        {userYouBeatenMost.length === 0 && (
          <>
            <Image width={ringSize} src={ProfileIconsList['Unknown']} />
            <Text>No wins</Text>{' '}
          </>
        )}
        {userYouBeatenMost.length > 0 && (
          <>
            <Image width={ringSize} src={ProfileIconsList[userYouBeatenMost]} />
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
        {userBeatenYouMost.length === 0 && (
          <>
            <Image width={ringSize} src={ProfileIconsList['Unknown']} />
            <Text>No defeats</Text>
          </>
        )}
        {userBeatenYouMost.length > 0 && (
          <>
            <Image width={ringSize} src={ProfileIconsList[userBeatenYouMost]} />
            <Text size="sm">
              Most defeats against{' '}
              <Text span weight={700} size="md">
                {userBeatenYouMost}
              </Text>{' '}
            </Text>
          </>
        )}
      </Stack>
    </div>
  )
}

export default Statistics
