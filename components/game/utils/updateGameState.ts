import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import updateAchievementStatus from '../../achievements/updateAchievementStatus'
import { fetchUserData } from '../../profile/firebase/fetchUserData'
import fetchGameData from '../firebase/fetchGameData'
import GameStates from '../types/gameStates'
import { IGameContext } from './gameContext'
import updateWinner from './updateWinner'

const updateGameState = async (gameContext: IGameContext) => {
  // State change from choosing a letter (CHOOSE) to placing own chosen letter (PLACE_OWN)
  if (gameContext.gameState === GameStates.CHOOSE) {
    // Update state in Firebase and return new state
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      gameState: GameStates.PLACE_OWN,
    })
  }

  /* 
    State change from placing own chosen letter (PLACE_OWN) to to placing opponents chosen letter (PLACE_OPPONENTS)
    This also means that it is the end of the turn
  */
  if (gameContext.gameState === GameStates.PLACE_OWN) {
    // Update state in Firebase
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      gameState: GameStates.PLACE_OPPONENTS,
      nextTurn: doc(db, `users/${gameContext.opponentID}`),
      roundsLeft: gameContext.roundsLeft - 1,
    })
  }

  // State change from cplacing opponents chosen letter (PLACE_OPPONENTS) to choosing a letter (CHOOSE)
  if (gameContext.gameState === GameStates.PLACE_OPPONENTS) {
    // Update state in Firebase
    if (gameContext.roundsLeft === 1) {
      await updateDoc(doc(db, 'games', gameContext.gameID), {
        gameState: GameStates.END,
        roundsLeft: 0,
        isActive: false,
      })

      await updateWinner(gameContext)

      // Fetch userData, opponentData and gameData
      const userData = await fetchUserData(gameContext.userUID)
      const opponentData = await fetchUserData(gameContext.opponentID)
      const gameData = await fetchGameData(gameContext.gameID)

      // Update achievements for user
      await updateAchievementStatus(
        {
          won: gameContext.userUID === gameData!.winner,
          opponent: gameContext.opponentID,
        },
        gameContext.userUID,
        userData?.achievements!
      )

      // Update achievements for opponent
      await updateAchievementStatus(
        {
          won: gameContext.opponentID === gameData!.winner,
          opponent: gameContext.userUID,
        },
        gameContext.opponentID,
        opponentData?.achievements!
      )
    } else {
      await updateDoc(doc(db, 'games', gameContext.gameID), {
        gameState: GameStates.CHOOSE,
      })
    }
  }
}

export default updateGameState
