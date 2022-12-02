import { Progress, Stack, Text } from '@mantine/core'

const ExperiencePointsBar = () => {
  return (
    <Stack style={{ width: '60%' }}>
      <Text align="center">Level 2</Text>
      <Progress color="green" size="xl" value={70} label={'70 XP'} />
      <Text align="center" size={'sm'}>
        Earn just 30 more XP points to reach level 3!
      </Text>
    </Stack>
  )
}

export default ExperiencePointsBar
