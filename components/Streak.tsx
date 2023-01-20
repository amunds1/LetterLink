import { Card, Center, Group, RingProgress, Stack, Text } from '@mantine/core'
import { IconFlame } from '@tabler/icons'

const streakData = {
  1: ['Mo', true],
  2: ['Tu', true],
  3: ['We', true],
  4: ['Th', true],
  5: ['Fr', true],
  6: ['Sa', false],
  7: ['Su', false],
}

const Streak = () => {
  Object.values(streakData).forEach((day) => {
    console.log(day[0], day[1])
  })
  return (
    <Card>
      <Stack justify="center" align="center">
        <RingProgress
          sections={[{ value: 100, color: 'orange' }]}
          size={150}
          thickness={7}
          label={
            <Stack>
              <Text size={25} align="center" color="orange">
                5
              </Text>
              <Text size={15} align="center" color="orange">
                days
              </Text>
            </Stack>
          }
        />

        <Group>
          {Object.values(streakData).map((value, key) => (
            <Stack key={key} align="center" justify="center">
              <IconFlame
                width="30px"
                height="30px"
                color={value[1] ? 'orange' : 'grey'}
              />
              <Text weight="500">{value[0]}</Text>
            </Stack>
          ))}
        </Group>
      </Stack>
    </Card>
  )
}

export default Streak
