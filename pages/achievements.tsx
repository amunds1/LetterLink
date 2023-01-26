import { Grid, Progress, Stack, Text } from '@mantine/core'

import { IconMedal } from '@tabler/icons'

interface IAchievement {
  title: string
  range: number
  completionStatus: number
  unlocked: boolean
}

const mockData: { [key: string]: IAchievement } = {
  'play-10-games': {
    title: 'Play 10 games',
    range: 10,
    completionStatus: 5,
    unlocked: false,
  },
  'win-3-games': {
    title: 'Win 3 games',
    range: 3,
    completionStatus: 2,
    unlocked: false,
  },
  'play-three-opponents': {
    title: 'Play three different opponents',
    range: 3,
    completionStatus: 3,
    unlocked: true,
  },
}

const updateAchievementStatus = () => {
  // Play 10 games

  // Win 3 games
  if (mockData['win-3-games'].unlocked == false) {
  }

  // Play three different opponents
}

const Acheviement = ({ data }: { data: IAchievement }) => {
  return (
    <Stack>
      <IconMedal color={data.unlocked ? 'gold' : 'gray'} size={80} />
      <Text align="center">{data.title}</Text>
      <Progress size="xl" value={100 * (data.completionStatus / data.range)} />
    </Stack>
  )
}

const Achievements = () => {
  return (
    <>
      <Grid>
        {/* {mockData.values().map((achievement) => (
          <Grid.Col key={achievement.title} span={4}>
            <Acheviement data={achievement} />
          </Grid.Col>
        ))} */}
      </Grid>
    </>
  )
}

export default Achievements
