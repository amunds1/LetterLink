import { Grid, Stack, Text } from '@mantine/core'

import { IconMedal } from '@tabler/icons'

const Acheviement = ({ unlocked }: { unlocked: boolean }) => {
  return (
    <Stack align={'center'}>
      <IconMedal color={unlocked ? 'gold' : 'gray'} size={80} />
      <Text align="center">Play 10 games</Text>
    </Stack>
  )
}

const Achievements = () => {
  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <Acheviement unlocked={true} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Acheviement unlocked={false} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Acheviement unlocked={false} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Acheviement unlocked={false} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Acheviement unlocked={true} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Acheviement unlocked={false} />
        </Grid.Col>
      </Grid>
    </>
  )
}

export default Achievements
