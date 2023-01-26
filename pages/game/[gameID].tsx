import { Button, Center, Container } from '@mantine/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { EndedGame } from '../../components/game/EndedGame'
import { fetchBoardData } from '../../components/game/firebase/fetchBoardData'
import fetchGameData from '../../components/game/firebase/fetchGameData'
import yourTurn from '../../components/game/firebase/yourTurn'
import GameBoard from '../../components/game/GameBoard'
import Points from '../../components/game/Points'
import SelectLetter from '../../components/game/SelectLetter'
import {
  OpponentTurnStatusMessage,
  YourTurnStatusMessage,
} from '../../components/game/TurnStatusMessage'
import GameStates from '../../components/game/types/gameStates'
import {
  GameContext,
  IGameContext,
} from '../../components/game/utils/gameContext'
import selectUserID from '../../components/games/utils/selectUserID'
import { fetchUserData } from '../../components/profile/firebase/fetchUserData'
import fetchUID from '../../firebase/fetchUID'
import BoardData from '../../types/BoardData'
import Game from '../../types/Game'
import User from '../../types/User'
import gameDataListener from '../api/utils/gameDataListener'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const gameID = ctx.query.gameID as string

  // Fetch uid, boardData and gameData
  const uid = await fetchUID(ctx)
  const boardData = await fetchBoardData(gameID, uid)
  const gameData = await fetchGameData(gameID)

  // Set intialGameState to be CHOOSE, if selectedLetter is null
  const initialGameState = gameData?.gameState

  const itsYourTurn = yourTurn(gameData?.nextTurn as string, uid)

  const roundsIsLeft = gameData?.roundsLeft

  // Used to display Points and Usernames
  const userData = JSON.parse(JSON.stringify(await fetchUserData(uid)))
  const opponentID = selectUserID(
    uid,
    gameData?.playerOne as string,
    gameData?.playerTwo as string
  )
  const opponentData = JSON.parse(
    JSON.stringify(await fetchUserData(opponentID))
  )

  return {
    props: {
      uid: uid,
      boardData: boardData,
      gameData: gameData,
      initialGameState: initialGameState,
      itsYourTurn: itsYourTurn,
      opponentData: opponentData,
      userData: userData,
      opponentID: opponentID,
      roundsIsLeft: roundsIsLeft,
    },
  }
}

interface IGameID {
  uid: string
  boardData: BoardData
  initialGameState: GameStates
  gameData: Game
  itsYourTurn: boolean
  opponentData: User
  opponentID: string
  userData: User
  roundsIsLeft: number
}

const GameID = (props: IGameID) => {
  const {
    uid,
    boardData,
    initialGameState,
    gameData,
    itsYourTurn,
    opponentID,
    opponentData,
    userData,
    roundsIsLeft,
  } = props

  // https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-599388505
  resetServerContext()

  const [yourTurn, setYourTurn] = useState<boolean>(itsYourTurn)

  // Assign selectedLetter from Firebase as default value
  const [selectedLetter, setSelectedLetter] = useState<string | null>(
    gameData.selectedLetter || null
  )

  const [userPoints, setUserPoints] = useState(gameData.totalPoints[uid])
  const [opponentPoints, setOpponentPoints] = useState(
    gameData.totalPoints[opponentID]
  )

  const [roundsLeft, setRoundsLeft] = useState<number>(roundsIsLeft)

  // Re-render component after value of yourTurn changes
  useEffect(() => {}, [yourTurn])

  const [gameState, setGameState] = useState<
    | GameStates.PLACE_OWN
    | GameStates.CHOOSE
    | GameStates.PLACE_OPPONENTS
    | GameStates.END
  >(initialGameState)

  // Populate GameContext
  const GameContextValues: IGameContext = {
    selectedLetter: selectedLetter,
    setSelectedLetter: setSelectedLetter,
    gameState: gameState,
    setGameState: setGameState,
    gameID: gameData.id as string,
    userUID: uid,
    rowPoints: boardData.rowPoints,
    columnPoints: boardData.columnPoints,
    grid: {
      size: gameData.boardSize,
      values: boardData.board,
    },
    columnValidWords: boardData.columnValidWords,
    rowValidWords: boardData.rowValidWords,
    yourTurn: yourTurn,
    setYourTurn: setYourTurn,
    opponentID: opponentID,
    opponentData: opponentData,
    userData: userData,
    userPoints: userPoints,
    setUserPoints: setUserPoints,
    opponentPoints: opponentPoints,
    setOpponentPoints: setOpponentPoints,
    roundsLeft: roundsLeft,
    setRoundsLeft: setRoundsLeft,
  }

  gameDataListener(GameContextValues)

  return (
    <Container>
      {/* Display who turn it is */}
      {yourTurn ? <YourTurnStatusMessage /> : <OpponentTurnStatusMessage />}

      <GameContext.Provider value={GameContextValues}>
        <Points />
        <GameBoard />
        {gameState === GameStates.CHOOSE && <SelectLetter />}
        {gameState === GameStates.END && <EndedGame />}
      </GameContext.Provider>

      <Link href="/games">
        <Center>
          <Button>Back to games</Button>
        </Center>
      </Link>
    </Container>
  )
}

export default GameID
