import { Button } from '@mantine/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
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
import fetchUID from '../../firebase/fetchUID'
import BoardData from '../../types/BoardData'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const gameID = ctx.query.gameID as string

  // Fetch uid, boardData and gameData
  const uid = await fetchUID(ctx)
  const boardData = await fetchBoardData(gameID, uid)
  const gameData = await fetchGameData(gameID)

  // Retrieve nextTurn, boardSize, selectedLetter from gameData
  const nextTurn = gameData?.nextTurn.id
  const boardSize = gameData?.boardSize
  const selectedLetter = gameData?.selectedLetter

  return {
    props: {
      uid: uid,
      gameID: gameID,
      boardData: boardData,
      nextTurn: nextTurn,
      boardSize: boardSize,
      selectedLetterFromServer: selectedLetter,
    },
  }
}

interface IGameID {
  uid: string
  gameID: string
  boardData: BoardData
  nextTurn: string
  boardSize: number
  selectedLetterFromServer: string
}

const GameID = (props: IGameID) => {
  // Destructure props
  const {
    uid,
    gameID,
    boardData,
    nextTurn,
    boardSize,
    selectedLetterFromServer,
  } = props

  // https://github.com/atlassian/react-beautiful-dnd/issues/1756#issuecomment-599388505
  resetServerContext()

  // Assign selectedLetter from Firebase as default value
  const [selectedLetter, setSelectedLetter] = useState<string | null>(
    selectedLetterFromServer || null
  )

  const [gameState, setGameState] = useState<
    GameStates.PLACE | GameStates.CHOOSE
  >(GameStates.PLACE)

  // Populate GameContext
  const GameContextValues: IGameContext = {
    selectedLetter: selectedLetter,
    setSelectedLetter: setSelectedLetter,
    gameState: gameState,
    setGameState: setGameState,
    gameID: gameID,
    userID: uid,
    rowPoints: boardData.rowPoints,
    columnPoints: boardData.columnPoints,
    grid: {
      size: boardSize,
      values: boardData.board,
    },
    columnValidWords: boardData.columnValidWords,
    rowValidWords: boardData.rowValidWords,
  }

  return (
    <>
      {/* Display who turn it is */}
      {yourTurn(nextTurn, uid) ? (
        <YourTurnStatusMessage />
      ) : (
        <OpponentTurnStatusMessage />
      )}

      <GameContext.Provider value={GameContextValues}>
        <Points />
        <GameBoard />
        {gameState === GameStates.CHOOSE && <SelectLetter />}
      </GameContext.Provider>

      <Link href="/games">
        <Button>Back to games</Button>
      </Link>
    </>
  )
}

export default GameID
