import { Dispatch, SetStateAction, useContext } from 'react'
import { updateGameState } from '../../../pages/api/utils/updateGameState'
import { updateIsActiveToFalse } from '../../../pages/api/utils/updateIsActiveToFalse'
import { updateRoundsLeft } from '../../../pages/api/utils/updateRoundsLeft'
import { updateTurn } from '../../../pages/api/utils/updateTurn'
import GameStates from '../types/gameStates'

const getNextState = (
  prevState: GameStates,
  gameID: string,
  opponentID: string,
  roundsLeft: number,
  setYourTurn: Dispatch<SetStateAction<boolean>>,
  setRoundsLeft: Dispatch<number>
) => {
  // State change from choosing a letter (CHOOSE) to placing own chosen letter (PLACE_OWN)
  if (prevState === GameStates.CHOOSE) {
    // Update state in Firebase and return new state
    updateGameState(gameID, GameStates.PLACE_OWN)
    return GameStates.PLACE_OWN
  }

  /* 
    State change from placing own chosen letter (PLACE_OWN) to to placing opponents chosen letter (PLACE_OPPONENTS)
    This also means that it is the end of the turn
  */
  if (prevState === GameStates.PLACE_OWN) {
    // Set new game state in Firebase
    updateGameState(gameID, GameStates.PLACE_OPPONENTS)

    // Update nextTurn param in Firebase to be opponent
    updateTurn(gameID, opponentID)

    // Set yourTurn param in gameContext to false
    setYourTurn(false)

    // Count down numbers left in Firebase
    const newRoundsLeft = roundsLeft - 1

    updateRoundsLeft(gameID, newRoundsLeft)

    // Cound down numbersLeft param in gameContex
    setRoundsLeft(newRoundsLeft)

    // Return new state
    return GameStates.PLACE_OPPONENTS
  }

  // State change from cplacing opponents chosen letter (PLACE_OPPONENTS) to choosing a letter (CHOOSE)
  if (prevState === GameStates.PLACE_OPPONENTS) {
    // Update state in Firebase and return new state
    if (roundsLeft === 1) {
      updateGameState(gameID, GameStates.END)
      updateRoundsLeft(gameID, 0)
      updateIsActiveToFalse(gameID)
      return GameStates.END
    }
    updateGameState(gameID, GameStates.CHOOSE)
    return GameStates.CHOOSE
  }
}

export default getNextState
