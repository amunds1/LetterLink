import { Button } from '@mantine/core'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import GameBoard from '../../components/game/GameBoard'
import Points from '../../components/game/Points'
import SelectLetter from '../../components/game/SelectLetter'
import GameStates from '../../components/game/types/gameStates'
import { db } from '../../firebase/clientApp'
import boardDataConverter from '../../firebase/converters/boardDataConverter'
import fetchUID from '../../firebase/fetchUID'
import BoardData from '../../types/BoardData'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const uid = await fetchUID(ctx)
  const gameID = ctx.query.gameID

  const boardDocRef = doc(db, `games/${gameID}/${uid}/boardData`).withConverter(
    boardDataConverter
  )

  const boardData = (await getDoc(boardDocRef)).data()

  return {
    props: { uid: uid, gameID: gameID, boardData: boardData },
  }
}

interface IGameID {
  uid: string
  gameID: string
  boardData: BoardData
}

const GameID = (props: IGameID) => {
  const { uid, gameID, boardData } = props

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const [gameState, setGameState] = useState<
    GameStates.PLACE | GameStates.CHOOSE
  >(GameStates.PLACE)

  return (
    boardData &&
    uid && (
      <>
        <p>Gameboard {boardData.board}</p>
        <Points
          columnPoints={boardData.columnPoints}
          rowPoints={boardData.rowPoints}
        ></Points>
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
