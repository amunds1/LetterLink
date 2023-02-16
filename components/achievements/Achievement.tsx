import { Card, Progress, Text, Stack, Image } from '@mantine/core'
import AchievementIcons, {
  IAchievementIcons,
} from '../../constants/AchievementIcons'
import { IAchievement } from './types/IAchievement'

const Acheviement = ({ data }: { data: IAchievement }) => {
  const AchievementsIconsList: IAchievementIcons = AchievementIcons
  return (
    <Card style={{ backgroundColor: 'white', width: '60%' }} shadow="lg">
      <div style={{ display: 'flex', gap: '5%', alignItems: 'center' }}>
        {data.unlocked && (
          <Image
            src={
              AchievementsIconsList[data.title.toLowerCase().replace(/ /g, '-')]
            }
            width={80}
          />
        )}
        {!data.unlocked && (
          <Image src={AchievementsIconsList['locked']} width={80} />
        )}
        <Stack spacing="xs" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text align="left" weight="bold">
              {data.title}
            </Text>
            <Text>
              {data.completionStatus} / {data.range}
            </Text>
          </div>
          <Progress
            size="xl"
            color={data.unlocked ? 'lime' : 'cyan'}
            value={100 * (data.completionStatus / data.range)}
          />
        </Stack>
      </div>
    </Card>
  )
}

export default Acheviement
