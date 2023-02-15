import { Stack } from '@mantine/core'
import LeaderboardList from '../components/leaderboard/LeaderboardList'
import LeaderboardTable from '../components/leaderboard/LeaderboardTable'
import { mockPlayerData } from '../components/leaderboard/mockData'
import Podium from '../components/leaderboard/Podium'

const Leaderboard = () => {
  // TODO: Fetch user data
  // Sort users by XP
  const mockData = mockPlayerData.sort(function (a, b) {
    return b.points - a.points
  })

  // Top three -> podium
  const podiumData = mockData.slice(0, 3)
  // Rest -> List up as cards
  const restPlayers = mockData.slice(3)

  return (
    <Stack align="center">
      <Podium players={podiumData} />
      <LeaderboardList players={restPlayers} />
    </Stack>
  )
}

export default Leaderboard
