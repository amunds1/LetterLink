import { Button, Text } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { doc, getFirestore } from 'firebase/firestore'
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
import firebase from '../../firebase/clientApp'
import boardDataConverter from '../../firebase/converters/boardDataConverter'
import gamesConverter from '../../firebase/converters/gamesConverter'
import Game from '../../types/Game'
import GameStates from '../../components/game/types/gameStates'

const GameID = () => {
  const router = useRouter()
  const [gameID, setgameID] = useState<string>()

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const [gameState, setGameState] = useState<
    GameStates.PLACE | GameStates.CHOOSE
  >(GameStates.PLACE)

  const [userAuthData, loadingUserAuthData, userAuthDataError] = useAuthState(
    getAuth(firebase)
  )

  useEffect(() => {
    if (!router.isReady) return

    const { gameID } = router.query
    setgameID(gameID as string)
  }, [gameID, router.isReady, router.query])

  const [value, loading, error] = useDocument(
    doc(
      getFirestore(firebase),
      `games/${gameID}/${userAuthData?.uid}/boardData`
    ).withConverter(boardDataConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const [game, gameLoading, gameError] = useDocument(
    doc(getFirestore(firebase), `games/${gameID}`).withConverter(
      gamesConverter
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  console.log('State is:', gameState)

  const data = value?.data()
  const gameData = game?.data()

  useEffect(() => {
    if (gameData) {
      if (gameState === GameStates.PLACE) {
        // Hent bokstav fra Firebase
        setSelectedLetter(gameData.selectedLetter)
      } else {
        setSelectedLetter(null)
      }
    }
  }, [gameState])

  return (
    data &&
    gameID &&
    gameData &&
    userAuthData && (
      <>
        {yourTurn(gameData, userAuthData.uid) && <TurnStatusMessage />}
        <Points columnPoints={data.columnPoints} rowPoints={data.rowPoints} />
        <GameBoard
          grid={{
            size: 3,
            values: data.board,
          }}
          gameID={gameID}
          userID={userAuthData.uid}
          rowValidWords={data.rowValidWords}
          columnValidWords={data.columnValidWords}
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
