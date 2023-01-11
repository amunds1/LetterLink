import { doc, updateDoc } from 'firebase/firestore'
import GameStates from '../../../components/game/types/gameStates'
import { db } from '../../../firebase/clientApp'

export const updateGameState = async (
  gameID: string,
  newGameState: GameStates
) => {
  await updateDoc(doc(db, 'games', gameID), {
    [`gameState`]: newGameState,
  })
}
