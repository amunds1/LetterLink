import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'
import { fetchBoardData } from '../firebase/fetchBoardData'
import fetchGameData from '../firebase/fetchGameData'
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

      // Fetch game data from Firebase
      const gameData = await fetchGameData(gameContext.gameID)

      /* 
        Generate a list on the following format:

        [['player1ID', totalPoints], ['player2ID', totalPoints ]
      */
      const players: [string, number][] = Object.entries(gameData!.totalPoints)

      // Determine the winner and update Game document in Firebase
      if (players[0][1] > players[1][1]) {
        await updateDoc(doc(db, 'games', gameContext.gameID), {
          winner: players[0][0],
        })

        // Increment wins in user document in Firebase
        await updateDoc(doc(db, 'users', players[0][0]), {
          wins: increment(1),
        })
      } else if (players[0][1] < players[1][1]) {
        await updateDoc(doc(db, 'games', gameContext.gameID), {
          winner: players[1][0],
        })

        // Increment wins in user document in Firebase
        await updateDoc(doc(db, 'users', players[1][0]), {
          wins: increment(1),
        })
      } else {
        await updateDoc(doc(db, 'games', gameContext.gameID), {
          winner: 'DRAW',
        })
      }

      // Update the experience points of the players
      await updateDoc(doc(db, 'users', players[0][0]), {
        experiencePoints: increment(players[0][1]),
      })

      await updateDoc(doc(db, 'users', players[1][0]), {
        experiencePoints: increment(players[1][1]),
      })
    } else {
      await updateDoc(doc(db, 'games', gameContext.gameID), {
        gameState: GameStates.CHOOSE,
      })
    }
  }
}

export default updateGameState
