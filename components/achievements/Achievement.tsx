import { Card, Progress, Text, Stack, Image, Group } from '@mantine/core'
import AchievementIcons, {
  IAchievementIcons,
} from '../../constants/AchievementIcons'
import { IAchievement } from './types/IAchievement'

const Acheviement = ({ data }: { data: IAchievement }) => {
  const AchievementsIconsList: IAchievementIcons = AchievementIcons

  return (
    <Card style={{ width: '100%' }} shadow="lg">
      <div style={{ display: 'flex', gap: '3%', alignItems: 'center' }}>
        {data.unlocked && (
          <Image
            src={
              AchievementsIconsList[data.title.toLowerCase().replace(/ /g, '-')]
            }
            width={80}
            alt="Unlocked medal"
          />
        )}
        {!data.unlocked && (
          <Image
            src={AchievementsIconsList['locked']}
            width={60}
            alt="Locked medal"
          />
        )}

        <Stack spacing="xs" style={{ width: '100%' }}>
          <Group position="apart" noWrap>
            {/* Achievement title */}
            <Text
              sx={(theme) => ({
                '@media (max-width: 500px)': {
                  fontSize: theme.fontSizes.xs,
                },
              })}
              weight="bold"
            >
              {data.title}
            </Text>
            {/* Achievement completion status */}
            <Text>
              {data.title == 'Play 10 games' && data.completionStatus >= 10
                ? '10 / 10'
                : `${data.completionStatus} / ${data.range}`}
            </Text>
          </Group>
          {/* Achievement completion status using progress bar */}
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
