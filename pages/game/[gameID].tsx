import { Button, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import yourTurn from '../../components/game/firebase/yourTurn'
import GameBoard from '../../components/game/GameBoard'
import Points from '../../components/game/Points'
import SelectLetter from '../../components/game/SelectLetter'
import TurnStatusMessage from '../../components/game/TurnStatusMessage'
import firebase, { db } from '../../firebase/clientApp'
import boardDataConverter from '../../firebase/converters/boardDataConverter'
import gamesConverter from '../../firebase/converters/gamesConverter'
import Game from '../../types/Game'
import GameStates from '../../components/game/types/gameStates'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import fetchUID from '../../firebase/fetchUID'
import BoardData from '../../types/BoardData'
import { resetServerContext } from 'react-beautiful-dnd'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const uid = await fetchUID(ctx)
  const gameID = ctx.query.gameID

  const boardDocRef = doc(db, `games/${gameID}/${uid}/boardData`).withConverter(
    boardDataConverter
  )

  const boardData = (await getDoc(boardDocRef)).data()

  const gameDocRef = doc(db, `games/${gameID}`).withConverter(gamesConverter)

  const gameData = (await getDoc(gameDocRef)).data()

  console.log(gameData)

  return {
    props: {
      uid: uid,
      gameID: gameID,
      boardData: boardData,
      nextTurn: gameData?.nextTurn.id,
    },
  }
}

interface IGameID {
  uid: string
  gameID: string
  boardData: BoardData
  nextTurn: string
}

const GameID = (props: IGameID) => {
  const { uid, gameID, boardData, nextTurn } = props

  resetServerContext()

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const [gameState, setGameState] = useState<
    GameStates.PLACE | GameStates.CHOOSE
  >(GameStates.PLACE)

  return (
    nextTurn &&
    boardData &&
    uid && (
      <>
        {yourTurn(nextTurn, uid) && <TurnStatusMessage />}
        <Points
          columnPoints={boardData.columnPoints}
          rowPoints={boardData.rowPoints}
        />
        <GameBoard
          grid={{
            size: 3,
            values: boardData.board,
          }}
          gameID={gameID}
          userID={uid}
          rowValidWords={boardData.rowValidWords}
          columnValidWords={boardData.columnValidWords}
          selectedLetter={selectedLetter}
          setSelectedLetter={setSelectedLetter}
          gameState={gameState}
          setGameState={setGameState}
        />

        {gameState === GameStates.CHOOSE && (
          <SelectLetter
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
            gameState={gameState}
            setGameState={setGameState}
          />
        )}

        <Link href="/games">
          <Button>Back to games</Button>
        </Link>
      </>
    )
  )
}

export default GameID
