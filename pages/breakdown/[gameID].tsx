import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import fetchGameData from '../../components/game/firebase/fetchGameData'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const gameID = ctx.query.gameID as string

  const gameData = await fetchGameData(gameID)

  console.log(gameData)

  return {
    props: {
      gameID,
    },
  }
}

interface IBreakdown {
  gameID: string
}

const Breakdown = (props: IBreakdown) => {
  const { gameID } = props

  console.log(gameID)

  return <div>breakdown</div>
}

export default Breakdown
