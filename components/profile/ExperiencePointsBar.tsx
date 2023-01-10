import { Progress, Stack, Text } from '@mantine/core'

const ExperiencePointsBar = ({
  experiencePoints,
}: {
  experiencePoints: number
}) => {
  return (
    <Stack>
      <Text align="center">Level 2</Text>
      <Progress
        color="green"
        size="xl"
        value={experiencePoints}
        label={`${experiencePoints} XP`}
      />
      <Text align="center" size={'sm'}>
        Earn just {100 - experiencePoints} more XP points to reach level 3!
      </Text>
    </Stack>
  )
}

export default ExperiencePointsBar
