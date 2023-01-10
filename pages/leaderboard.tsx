import { Stack } from '@mantine/core'
import LeaderboardTable from '../components/leaderboard/LeaderboardTable'
import Podium from '../components/leaderboard/Podium'

const Leaderboard = () => {
  return (
    <Stack align={'center'}>
      <Podium />
      <LeaderboardTable />
    </Stack>
  )
}

export default Leaderboard
