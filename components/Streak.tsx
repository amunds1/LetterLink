import { Card, Center, Group, RingProgress, Stack, Text } from '@mantine/core'
import { IconFlame } from '@tabler/icons'

const streakData = {
  1: ['M', true],
  2: ['T', true],
  3: ['W', true],
  4: ['T', true],
  5: ['F', true],
  6: ['S', false],
  7: ['S', false],
}

const Streak = () => {
  Object.values(streakData).forEach((day) => {
    console.log(day[0], day[1])
  })
  return (
    <Card>
      <Center>
        <RingProgress
          sections={[{ value: 100, color: 'orange' }]}
          size={200}
          thickness={7}
          label={
            <Stack>
              <Text weight={'bold'} size={35} align="center" color={'orange'}>
                5
              </Text>
              <Text weight={'bold'} size="xl" align="center" color={'orange'}>
                days
              </Text>
            </Stack>
          }
        />
      </Center>

      <Group>
        {Object.values(streakData).map((value, key) => (
          <Stack key={key} align="center" justify={'center'}>
            <IconFlame
              width={'50px'}
              height={'50px'}
              color={value[1] ? 'orange' : 'grey'}
            />
            <Text weight={'500'}>{value[0]}</Text>
          </Stack>
        ))}
      </Group>
    </Card>
  )
}

export default Streak
