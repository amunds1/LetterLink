import { Stack, Progress, Text } from '@mantine/core'
import { IconMedal } from '@tabler/icons'
import { IAchievement } from './types/IAchievement'

const Acheviement = ({ data }: { data: IAchievement }) => {
  return (
    <Stack>
      <IconMedal color={data.unlocked ? 'gold' : 'gray'} size={80} />
      <Text align="center">{data.title}</Text>
      <Progress size="xl" value={100 * (data.completionStatus / data.range)} />
    </Stack>
  )
}

export default Acheviement
