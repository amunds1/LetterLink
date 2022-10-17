import { Button } from '@mantine/core'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import GameBoard from '../../components/game/GameBoard'
import { db } from '../../firebase/clientApp'
import Points from '../../components/game/Points'
import firebase from '../../firebase/clientApp'
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

  return (
    boardData &&
    uid && (
      <div>
        <p>Gameboard {data.board}</p>
        <Points
          columnPoints={data.columnPoints}
          rowPoints={data.rowPoints}
        ></Points>
        <GameBoard
          grid={{
            size: 3,
            values: boardData.board,
          }}
          gameID={gameID}
          userID={userAuthData.uid}
          rowValidWords={data.rowValidWords}
          columnValidWords={data.columnValidWords}
        />

        <Link href="/games">
          <Button>Back to games</Button>
        </Link>
      </div>
    )
  )
}

export default GameID
