import { Progress, Stack, Text } from '@mantine/core'
import Levels, { ILevels } from '../../constants/Levels'

const ExperiencePointsBar = ({
  experiencePoints,
}: {
  experiencePoints: number
}) => {
  // Calculate level (+1 so that first level is level 1)
  /* 
    Level 1 -> 0 to 49 XP
    Level 2 -> 50 to 99 XP
    Level 3 -> 100 to 149 XP
    ...
  */
  const level = Math.floor(experiencePoints / 50 + 1)

  // Find levelName for that level
  const levelList: ILevels = Levels
  const levelName: string = levelList[level]

  // Remaining XP to next level
  const remainingXP = level * 50 - experiencePoints

  // Percent to next level, used in progress bar
  const percentNextLevel = ((experiencePoints - (level - 1) * 50) / 50) * 100

  return (
    <Stack>
      <Text align="center">
        Level {level} - {levelName}
      </Text>
      <Progress
        color="green"
        size="xl"
        value={percentNextLevel}
        label={`${percentNextLevel} %`}
      />
      <Text align="center" size="sm">
        You have {experiencePoints} XP. Earn just {remainingXP} more XP points
        to reach Level {level + 1}!
      </Text>
    </Stack>
  )
}

export default ExperiencePointsBar
