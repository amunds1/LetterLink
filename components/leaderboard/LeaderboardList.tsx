import {
  Card,
  Image,
  Text,
  Group,
  Stack,
  useMantineColorScheme,
} from '@mantine/core'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
import { useMediaQuery } from '@mantine/hooks'
import User from '../../types/User'
import { LevelTreshold } from '../../constants/Levels'

const LeaderboardList = ({ players }: { players: Partial<User>[] }) => {
  const ProfileIconsList: IProfileIcon = ProfileIcons
  const matches = useMediaQuery('(min-width: 900px)')

  // Dark mode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  return (
    <Stack spacing="xs" style={{ width: matches ? '30%' : '80%' }}>
      {players.map((player, index) => {
        return (
          <Card key={index} shadow="sm">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Group>
                <Text weight="bold">{index + 4}.</Text>
                <Image
                  src={ProfileIconsList[player.name!]}
                  width={30}
                  alt="Profile avatar"
                />
                <Text>{player.name}</Text>
              </Group>
              <Text color="teal" weight="bold">
                <Text size="xs" mr={10} span color={dark ? 'gray.6' : 'gray'}>
                  Level{' '}
                  {Math.floor(player.experiencePoints! / LevelTreshold + 1)}
                </Text>
                {player.experiencePoints} XP
              </Text>
            </div>
          </Card>
        )
      })}
    </Stack>
  )
}

export default LeaderboardList
