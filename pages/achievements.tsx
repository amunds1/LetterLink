import { Button, Progress, Stack, Text } from '@mantine/core'
import { IconMedal } from '@tabler/icons'
import { doc, increment, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase/clientApp'

interface IAchievement {
  title: string
  range: number
  completionStatus: number
  unlocked: boolean
}

const mockData: { [key: string]: IAchievement } = {
  'play-10-games': {
    title: 'Play 10 games',
    range: 10,
    completionStatus: 5,
    unlocked: false,
  },
  'win-3-games': {
    title: 'Win 3 games',
    range: 3,
    completionStatus: 2,
    unlocked: true,
  },
  'play-three-opponents': {
    title: 'Play three different opponents',
    range: 3,
    completionStatus: 3,
    unlocked: true,
  },
}

// Interface for gameStatus
interface IGameStatus {
  won: boolean
  opponent: string
}

const gameStatus: IGameStatus = {
  won: true,
  opponent: 'Hikaru Nakamura',
}

const Acheviement = ({ data }: { data: IAchievement }) => {
  return (
    <Stack>
      <IconMedal color={data.unlocked ? 'gold' : 'gray'} size={80} />
      <Text align="center">{data.title}</Text>
      <Progress size="xl" value={100 * (data.completionStatus / data.range)} />
    </Stack>
  )
}

const Achievements = () => {
  const [mock, setMockData] = useState(mockData)

  const userID = 'l7QwyHv2CWWPb2LZPxcnQFtiNLs1'

  const updateAchievementStatus = async (gameData: IGameStatus) => {
    // Achievement: Play 10 games
    if (mockData['play-10-games'].unlocked == false) {
      const achievement = mockData['play-10-games']

      // Temp data to update achievement in firestore
      const data = {
        completionStatus: increment(1),
        unlocked: false,
      }

      // Set unlocked to true if completionStatus is one less than range
      // which means the achievement is completed
      if (achievement.completionStatus == achievement.range - 1) {
        data.unlocked = true
      }

      // Update completionStatus of achievement in firestore
      await updateDoc(doc(db, userID, 'achievements', 'win-10-games'), data)
    }

    // Win 3 games
    /* if (mockData['win-3-games'].unlocked == false) {
      if (gameData.won) {
        setMockData({
          ...mockData,
          'win-3-games': { ...mockData['win-3-games'], completionStatus: +1 },
        })
      }
    }

    // Play three different opponents
    if (mockData['play-three-opponents'].unlocked == false) {
      const previousOpponents = ['Magnus Carlsen', 'Fabiano Caruana']
      if (!previousOpponents.includes(gameData.opponent)) {
        mockData['play-three-opponents'].completionStatus += 1
      }
    } */
  }

  return (
    <>
      <Stack>
        <Button onClick={() => updateAchievementStatus(gameStatus)}>
          Completed game
        </Button>
        {Object.keys(mockData).map((key) => (
          <Acheviement key={key} data={mockData[key]} />
        ))}
      </Stack>
    </>
  )
}

export default Achievements
