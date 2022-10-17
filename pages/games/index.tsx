import { Button, createStyles, Stack } from '@mantine/core'
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import ActiveGames from '../../components/games/ActiveGames'
import firebase, { db } from '../../firebase/clientApp'
import gamesConverter from '../../firebase/converters/gamesConverter'
import usersConverter from '../../firebase/converters/userConverter'
import fetchUID from '../../firebase/fetchUID'
import Game from '../../types/Game'
import User from '../../types/User'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

const parseGames = async (games: QuerySnapshot<Game>) => {
  const gamesParsed: Game[] = []

  await games.docs.forEach(async (game) => {
    console.log('Iteration:', game.id)

    // Retrieve game data
    const gameData = game.data()

    const playerOneDocRef = doc(
      db,
      `users/${game.data().playerOne.id}`
    ).withConverter(usersConverter)
    const playerOneData = (await getDoc(playerOneDocRef)).data() as User

    // Fetch playerTwo data
    const playerTwoDocRef = doc(
      db,
      `users/${game.data().playerTwo.id}`
    ).withConverter(usersConverter)
    const playerTwoData = (await getDoc(playerTwoDocRef)).data() as User

    const gameObject: Game = {
      isActive: gameData.isActive,
      boardSize: gameData.boardSize,
      playerOne: playerOneData,
      playerTwo: playerTwoData,
      proposedAt: gameData.proposedAt,
      proposedBy: playerOneData,
    }

    // Return Game object
    gamesParsed.push(gameObject)
  })

  console.log('Array', gamesParsed)
  console.log('Len', gamesParsed.length)

  return gamesParsed
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    let activeGames: Game[] | null = null
    let proposedGames: Game[] | null = null

    const uid = await fetchUID(ctx)

    const userDocRef = doc(db, `users/${uid}`).withConverter(usersConverter)
    const userData = (await getDoc(userDocRef)).data()

    // Fetch active games
    const hasActiveGames = userData?.games || null

    if (hasActiveGames && userData) {
      const q = query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', userData.games)
      ).withConverter(gamesConverter)

      const games = await getDocs(q)
      activeGames = games.docs.map((game) => game.data())
    }

    // Fetch proposed games
    const hasProposedGames = userData?.proposedGames || null

    if (hasProposedGames && userData) {
      const q = query(
        collection(getFirestore(firebase), 'games'),
        where(documentId(), 'in', userData.proposedGames)
      ).withConverter(gamesConverter)

      const games = await getDocs(q)

      proposedGames = await parseGames(games)

      console.log('parseGames', proposedGames)
    }

    return {
      props: {
        uid: uid,
        activeGames: null,
        proposedGames: null,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

interface IGames {
  uid: string
  activeGames: QuerySnapshot<Game> | any
  proposedGames: QuerySnapshot<Game> | any
}

const Games = (props: IGames) => {
  const { classes } = useStyles()
  const { uid, activeGames, proposedGames } = props

  console.log('Prop', proposedGames)

  return (
    <>
      <Stack style={{ width: '100%' }}>
        <Stack className={classes.center} style={{ width: '100%' }}>
          {/* <ProposedGames userUID={uid} games={proposedGames} /> */}
          <ActiveGames games={activeGames} userUID={uid} />
        </Stack>

        <Link href="/game/new">
          <Button>Start a new game</Button>
        </Link>
      </Stack>
    </>
  )
}

export default Games
