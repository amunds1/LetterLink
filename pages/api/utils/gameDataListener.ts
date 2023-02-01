import { onSnapshot, doc } from 'firebase/firestore'
import { Dispatch, SetStateAction, use } from 'react'
import { fetchBoardData } from '../../../components/game/firebase/fetchBoardData'
import yourTurn from '../../../components/game/firebase/yourTurn'
import GameStates from '../../../components/game/types/gameStates'
import { IGameContext } from '../../../components/game/utils/gameContext'
import { db } from '../../../firebase/clientApp'
import gamesConverter from '../../../firebase/converters/gamesConverter'

const gameDataListener = (gameContextValues: IGameContext) =>
  onSnapshot(
    doc(db, 'games', gameContextValues.gameID).withConverter(gamesConverter),
    async (doc) => {
      // Retrieve game data
      const data = doc.data()

      // Set rounds left
      gameContextValues.setRoundsLeft(data?.roundsLeft as number)

      // Set selected letter
      gameContextValues.setSelectedLetter(data?.selectedLetter as string)

      // Set game state
      gameContextValues.setGameState(data?.gameState as GameStates)

      // Set value of yourTurn in GameContext to true if nextTurn in Firebase matches uid of authenticated user.
      // False otherwise
      gameContextValues.setYourTurn(
        yourTurn(gameContextValues.userUID, data?.nextTurn as string)
      )

      // Update user points
      gameContextValues.setUserPoints(
        data?.totalPoints[gameContextValues.userUID] as number
      )

      // Set opponent points
      gameContextValues.setOpponentPoints(
        data?.totalPoints[gameContextValues.opponentID] as number
      )

      // Set winner
      gameContextValues.setWinner(data?.winner as string)
    }
  )

export default gameDataListener
