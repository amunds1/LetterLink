import { Container } from '@mantine/core'
import { doc } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { fetchBoardData } from '../../components/game/firebase/fetchBoardData'
import fetchGameData from '../../components/game/firebase/fetchGameData'
import getName from '../../components/game/firebase/getName'
import yourTurn from '../../components/game/firebase/yourTurn'
import GameBoard from '../../components/game/GameBoard'
import { IValidWords } from '../../components/game/interface/IvalidWords'
import Points from '../../components/game/Points'
import SelectLetter from '../../components/game/SelectLetter'
import {
  OpponentTurnStatusMessage,
  YourTurnStatusMessage,
  EndTurnStatusMessage,
  PointsStatusMessage,
} from '../../components/game/StatusMessage'
import GameStates from '../../components/game/types/gameStates'
import {
  GameContext,
  IGameContext,
} from '../../components/game/utils/gameContext'
import BackToGamesButton from '../../components/games/BackToGamesButton'
import selectUserID from '../../components/games/utils/selectUserID'
import { db } from '../../firebase/clientApp'
import boardDataConverter from '../../firebase/converters/boardDataConverter'
import fetchUID from '../../firebase/fetchUID'
import BoardData from '../../types/BoardData'
import Game from '../../types/Game'
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
  const userName = await getName(uid)
  const opponentID = selectUserID(
    uid,
    gameData?.playerOne as string,
    gameData?.playerTwo as string
  )
  const opponentName = await getName(opponentID)

  return {
    props: {
      uid: uid,
      boardData: boardData,
      gameData: gameData,
      initialGameState: initialGameState,
      itsYourTurn: itsYourTurn,
      opponentName: opponentName,
      userName: userName,
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
  opponentName: string
  opponentID: string
  userName: string
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
    opponentName,
    userName,
    roundsIsLeft,
  } = props

  // https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-599388505
  resetServerContext()

  const [yourTurn, setYourTurn] = useState<boolean>(itsYourTurn)

  // Assign selectedLetter from Firebase as default value
  const [selectedLetter, setSelectedLetter] = useState<string | null>(
    gameData.selectedLetter || null
  )

  const [columnValidWords, setColumnValidWords] = useState<{
    [key: number]: number[]
  }>(boardData.columnValidWords)

  const [rowValidWords, setRowValidWords] = useState<{
    [key: number]: number[]
  }>(boardData.rowValidWords)

  const [userPoints, setUserPoints] = useState(gameData.totalPoints[uid])
  const [opponentPoints, setOpponentPoints] = useState(
    gameData.totalPoints[opponentID]
  )

  const [roundsLeft, setRoundsLeft] = useState<number>(roundsIsLeft)

  const [validWords, setValidWords] = useState<IValidWords[]>([])

  // Re-render component after value of yourTurn changes
  useEffect(() => {}, [yourTurn])

  const [gameState, setGameState] = useState<
    | GameStates.PLACE_OWN
    | GameStates.CHOOSE
    | GameStates.PLACE_OPPONENTS
    | GameStates.END
  >(initialGameState)

  /* 
    Listen for changes in board data, in order to update columnValidWords and rowValidWords
    in GameContextValues

    This allows for cells to automatically be coloured green if they are part of a valid word
  */
  const [value, loading, error] = useDocumentData(
    doc(db, 'games', gameData.id as string, uid, 'boardData').withConverter(
      boardDataConverter
    )
  )

  useEffect(() => {
    if (value) {
      setColumnValidWords(value.columnValidWords)
      setRowValidWords(value.rowValidWords)
    }
  }, [value])

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
    columnValidWords: columnValidWords,
    rowValidWords: rowValidWords,
    yourTurn: yourTurn,
    setYourTurn: setYourTurn,
    opponentID: opponentID,
    opponentName: opponentName,
    userName: userName,
    userPoints: userPoints,
    setUserPoints: setUserPoints,
    opponentPoints: opponentPoints,
    setOpponentPoints: setOpponentPoints,
    roundsLeft: roundsLeft,
    setRoundsLeft: setRoundsLeft,
    validWords: validWords,
    setValidWords: setValidWords,
  }

  gameDataListener(GameContextValues)

  return (
    <Container>
      {/* Back to games button */}
      <BackToGamesButton />

      <GameContext.Provider value={GameContextValues}>
        {/* Display who turn it is */}

        {gameState === GameStates.END && <EndTurnStatusMessage />}

        {!validWords.length && gameState !== GameStates.END && yourTurn && (
          <YourTurnStatusMessage />
        )}

        {!validWords.length && gameState !== GameStates.END && !yourTurn && (
          <OpponentTurnStatusMessage />
        )}

        {validWords.length && (
          <PointsStatusMessage validWordList={validWords} />
        )}

        <Points />
        <GameBoard />
        {gameState === GameStates.CHOOSE && <SelectLetter />}
      </GameContext.Provider>
    </Container>
  )
}

export default GameID
