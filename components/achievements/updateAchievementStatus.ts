import { arrayUnion, doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/clientApp'
import { IGameStatus } from './mockData'
import { IAchievement } from './types/IAchievement'

// Update achievement status in firestore. Called after game is completed
const updateAchievementStatus = async (
  gameData: IGameStatus,
  userID: string,
  achievements: { [key: string]: IAchievement }
) => {
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
      // Set openAchievementModal = true to let the User know it has been unlocked
      if (achievement.completionStatus == achievement.range - 1) {
        tempUnlocked = true
        await updateDoc(doc(db, 'users', userID), {
          'achievements.play-10-games.openAchievementModal': true,
        })
      }

      // Update completionStatus and unlocked of achievement in firestore
      await updateDoc(doc(db, 'users', userID), {
        'achievements.play-10-games.completionStatus': increment(1),
        'achievements.play-10-games.unlocked': tempUnlocked,
      })
    } else {
      // Update completionStatus even if achievement was unlocked
      await updateDoc(doc(db, 'users', userID), {
        'achievements.play-10-games.completionStatus': increment(1),
      })
    }

    /* 
      Achievement: Win 3 games
      Condition: Game is won
    */
    if (achievements['win-3-games'].unlocked == false) {
      const achievement = achievements['win-3-games']
      let tempUnlocked = false

      // If game was won, update completionStatus and unlocked of achievement in firestore
      if (gameData.won) {
        if (achievement.completionStatus == achievement.range - 1) {
          tempUnlocked = true

          // Set unlocked to true if completionStatus is one less than range
          // which means the achievement is completed
          // Set openAchievementModal = true to let the User know it has been unlocked
          await updateDoc(doc(db, 'users', userID), {
            'achievements.win-3-games.openAchievementModal': true,
          })
        }
      }

      await updateDoc(doc(db, 'users', userID), {
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

    const previousOpponents = achievement.previousOpponents

    if (!previousOpponents?.includes(gameData.opponent)) {
      if (achievement.completionStatus == achievement.range - 1) {
        tempUnlocked = true

        // Set unlocked to true if completionStatus is one less than range
        // which means the achievement is completed
        // Set openAchievementModal = true to let the User know it has been unlocked
        await updateDoc(doc(db, 'users', userID), {
          'achievements.play-3-different-opponents.openAchievementModal': true,
        })
      }

      await updateDoc(doc(db, 'users', userID), {
        'achievements.play-3-different-opponents.completionStatus':
          increment(1),
        'achievements.play-3-different-opponents.unlocked': tempUnlocked,
        'achievements.play-3-different-opponents.previousOpponents': arrayUnion(
          gameData.opponent
        ),
      })
    }
  }
}

export default updateAchievementStatus
