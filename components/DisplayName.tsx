import { Avatar, Card, Group, Text } from '@mantine/core'
import ProfileIcons, { IProfileIcon } from '../constants/ProfileIcons'

const DisplayName = ({ name }: { name: string }) => {
  const ProfileIconsList: IProfileIcon = ProfileIcons
  return (
    <Card>
      <Group position="center">
        <Text size="lg" align="center">
          Welcome, {name}!
        </Text>
        <Avatar src={ProfileIconsList[name]} />
      </Group>
    </Card>
  )
}

export default DisplayName
