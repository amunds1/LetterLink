import {
  Avatar,
  Center,
  createStyles,
  Grid,
  RingProgress,
  Stack,
  Text,
} from '@mantine/core'

const useStyles = createStyles(() => ({
  //center: { height: '100%' },
  center: {},
}))

const Statistics = () => {
  const { classes } = useStyles()

  const ringSize = 100
  const ringThickness = 5

  return (
    <Center className={classes.center}>
      <Grid>
        <Grid.Col span={6}>
          <Stack align="center">
            <RingProgress
              size={ringSize}
              thickness={ringThickness}
              sections={[{ value: 100, color: 'teal' }]}
              label={
                <Center>
                  <Text color="green" weight={700} align="center" size="md">
                    7
                  </Text>
                </Center>
              }
            />
            <Text size={'md'}>Games played</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack align="center">
            <RingProgress
              size={ringSize}
              thickness={ringThickness}
              sections={[{ value: 42, color: 'blue' }]}
              label={
                <Text color="blue" weight={700} align="center" size="md">
                  42%
                </Text>
              }
            />
            <Text size={'md'}>Win rate</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack align="center">
            <Avatar size={ringSize} />
            <Text size={'md'}>Most wins against</Text>
          </Stack>
        </Grid.Col>

        <Grid.Col span={6}>
          <Stack align="center">
            <Avatar size={ringSize} />
            <Text size={'md'}>Most defeats against</Text>
          </Stack>
        </Grid.Col>
      </Grid>
    </Center>
  )
}

export default Statistics
