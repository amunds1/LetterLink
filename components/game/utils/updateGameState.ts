import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import updateDocument from '../../../firebase/updateDocument'
import GameStates from '../types/gameStates'
import { IGameContext } from './gameContext'

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

      // Update XP after the game is completed
      await updateDoc(doc(db, 'users', gameContext.userUID), {
        experiencePoints: gameContext.userData.experiencePoints + 100,
      })

      await updateDoc(doc(db, 'users', gameContext.opponentID), {
        experiencePoints: gameContext.opponentData.experiencePoints + 100,
      })
    } else {
      await updateDoc(doc(db, 'games', gameContext.gameID), {
        gameState: GameStates.CHOOSE,
      })
    }
  }
}

export default updateGameState
