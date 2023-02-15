import { Card, Image, Text, Group, Container, Stack } from '@mantine/core'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
import { Player } from './mockData'
import { useMediaQuery } from '@mantine/hooks'

const LeaderboardList = ({ players }: { players: Player[] }) => {
  const ProfileIconsList: IProfileIcon = ProfileIcons
  const matches = useMediaQuery('(min-width: 850px)')
  return (
    <Stack spacing="xs" style={{ width: matches ? '30%' : '80%' }}>
      {players.map((player, index) => {
        return (
          <Card key={index} shadow="sm">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Group>
                <Text weight="bold">{index + 4}.</Text>
                <Image src={ProfileIconsList[player.username]} width={30} />
                <Text>{player.username}</Text>
              </Group>
              <Text color="teal" weight="bold">
                {player.points} XP
              </Text>
            </div>
          </Card>
        )
      })}
    </Stack>
  )
}

export default LeaderboardList
