import { doc, updateDoc } from 'firebase/firestore'
import { IGameContext } from '../../components/game/utils/gameContext'
import { db } from '../../firebase/clientApp'

// TODO: Get updated points values after last round - Points from last round should be take in account

export const setWinner = async (gameContext: IGameContext) => {
  // If you win
  if (gameContext.userPoints > gameContext.opponentPoints) {
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      winner: gameContext.userName,
    })
    // If Opponent win
  } else if (gameContext.userPoints < gameContext.opponentPoints) {
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      winner: gameContext.opponentName,
    })
    // If equal points
  } else {
    await updateDoc(doc(db, 'games', gameContext.gameID), {
      winner: null,
    })
  }
}
