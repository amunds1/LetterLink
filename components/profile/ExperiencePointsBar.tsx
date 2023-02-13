import { Progress, Stack, Text } from '@mantine/core'
import Levels, { ILevels } from '../../constants/Levels'

const ExperiencePointsBar = ({
  experiencePoints,
}: {
  experiencePoints: number
}) => {
  // Calculate level
  const level = Math.floor(experiencePoints / 50)

  // Find levelName for that level
  const levelList: ILevels = Levels
  const levelName: string = levelList[level]

  return (
    <Stack>
      <Text align="center">
        Level {level} - {levelName}
      </Text>
      <Progress
        color="green"
        size="xl"
        value={experiencePoints}
        label={`${experiencePoints} XP`}
      />
      <Text align="center" size="sm">
        Earn just {(level + 1) * 50 - experiencePoints} more XP points to reach
        Level
        {level + 1}!
      </Text>
    </Stack>
  )
}

export default ExperiencePointsBar
