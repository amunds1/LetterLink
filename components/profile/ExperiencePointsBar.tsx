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

  // Remaining XP to next level (will be a number between 1 and 50)
  const remainingXP = level * 50 - experiencePoints

  // Percent to next level, used in progress bar
  const percentNextLevel = (remainingXP / 50) * 100

  return (
    <Stack spacing="xs">
      <Text size="sm" align="left" color="teal" weight="bold">
        {experiencePoints} XP
      </Text>
      <Progress
        color="teal"
        size="xl"
        radius="lg"
        value={percentNextLevel}
        label={`${percentNextLevel} %`}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text size="lg" color="teal" weight="bold">
          Level {level} - {levelName}
        </Text>
        <Text size="sm" color="gray.6">
          {remainingXP} XP to{' '}
          <Text size="md" span color="teal" weight="bold">
            {' '}
            Level {level + 1}
          </Text>
        </Text>
      </div>
    </Stack>
  )
}

export default ExperiencePointsBar
