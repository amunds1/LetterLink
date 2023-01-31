import { Button, Stack } from '@mantine/core'
import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next/types'
import Acheviement from '../components/achievements/Achievement'
import { IGameStatus, gameStatus } from '../components/achievements/mockData'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import { db } from '../firebase/clientApp'
import fetchUID from '../firebase/fetchUID'
import User from '../types/User'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    // Set cache header
    // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
    ctx.res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )

    const uid = await fetchUID(ctx)
    const userData = JSON.parse(JSON.stringify(await fetchUserData(uid)))

    return {
      props: {
        userData,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

interface IAchievements {
  userData: User
}

const Achievements = (props: IAchievements) => {
  const { id, achievements } = props.userData

  // Update achievement status in firestore. Called after game is completed
  const updateAchievementStatus = async (gameData: IGameStatus) => {
    if (achievements) {
      /* 
        Achievement: Play 10 games
        Condition: Game is completed
      */
      if (achievements['play-10-games'].unlocked == false) {
        const achievement = achievements['play-10-games']
        let tempUnlocked = false

        // Set unlocked to true if completionStatus is one less than range
        // which means the achievement is completed
        if (achievement.completionStatus == achievement.range - 1) {
          tempUnlocked = true
        }

        // Update completionStatus and unlocked of achievement in firestore
        await updateDoc(doc(db, 'users', id), {
          'achievements.play-10-games.completionStatus': increment(1),
          'achievements.play-10-games.unlocked': tempUnlocked,
        })
      }

      /* 
        Achievement: Win 3 games
        Condition: Game is won
      */
      if (achievements['win-3-games'].unlocked == false) {
        const achievement = achievements['win-3-games']
        let tempUnlocked = false

        // Set unlocked to true if completionStatus is one less than range
        // which means the achievement is completed
        if (achievement.completionStatus == achievement.range - 1) {
          tempUnlocked = true
        }

        // If game was won, update completionStatus and unlocked of achievement in firestore
        if (gameData.won) {
          await updateDoc(doc(db, 'users', id), {
            'achievements.win-3-games.completionStatus': increment(1),
            'achievements.win-3-games.unlocked': tempUnlocked,
          })
        }
      }

      /* 
        Achievement: Play 3 different opponents
        Condition: Game is completed and opponent is not one of the previous opponents
      */
      if (achievements['play-3-different-opponents'].unlocked == false) {
        const achievement = achievements['play-3-different-opponents']
        let tempUnlocked = false

        // Set unlocked to true if completionStatus is one less than range
        // which means the achievement is completed
        if (achievement.completionStatus == achievement.range - 1) {
          tempUnlocked = true
        }

        const previousOpponents = achievement.previousOpponents

        if (!previousOpponents?.includes(gameData.opponent)) {
          await updateDoc(doc(db, 'users', id), {
            'achievements.play-3-different-opponents.completionStatus':
              increment(1),
            'achievements.play-3-different-opponents.unlocked': tempUnlocked,
            'achievements.play-3-different-opponents.previousOpponents':
              arrayUnion(gameData.opponent),
          })
        }
      }
    }
  }

  return (
    <>
      {achievements && (
        <Stack>
          <Button onClick={() => updateAchievementStatus(gameStatus)}>
            Simulate completed game
          </Button>
          {Object.keys(achievements).map((key) => (
            <Acheviement key={key} data={achievements[key]} />
          ))}
        </Stack>
      )}
    </>
  )
}

export default Achievements
