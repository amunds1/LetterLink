import { Avatar, Card, Group, Stack, Text } from '@mantine/core'
import ProfileIcons, { IProfileIcon } from '../constants/ProfileIcons'

const DisplayNameAndStreak = ({
  name,
  streak,
}: {
  name: string
  streak: number
}) => {
  const ProfileIconsList: IProfileIcon = ProfileIcons
  return (
    <Card>
      <Group position="center">
        <Text size="xl" align="center">
          Welcome, {name}!
        </Text>
        <Avatar
          src={
            ProfileIconsList.hasOwnProperty(name)
              ? ProfileIconsList[name]
              : ProfileIconsList['Unknown']
          }
        />
      </Group>
      <Text pt={15} align="center" size="lg">
        Keep it going, you are on a{' '}
        <Text span color="orange" weight="bolder">
          {streak}
        </Text>{' '}
        {streak === 1 ? 'day' : 'days'} streak! 🔥
      </Text>
    </Card>
  )
}

export default DisplayNameAndStreak
