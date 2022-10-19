import { updateTurn } from '../../../pages/api/utils/updateTurn'
import GameStates from '../types/gameStates'

const getNextState = (
  prevState: GameStates,
  gameID: string,
  opponentID: string
) => {
  if (prevState === GameStates.CHOOSE) {
    return GameStates.PLACE_OWN
  } else if (prevState === GameStates.PLACE_OWN) {
    updateTurn(gameID, opponentID)
    return GameStates.PLACE_OPPONENTS
  } else if (prevState === GameStates.PLACE_OPPONENTS) {
    return GameStates.CHOOSE
  } else {
    console.log('An error occured when determining the next game state')
  }
}

export default getNextState
