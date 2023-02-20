import { Center, Container } from '@mantine/core'
import { doc, updateDoc } from 'firebase/firestore'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { resetServerContext } from 'react-beautiful-dnd'
import ConfettiExplosion from 'react-confetti-explosion'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import AchievementsModal from '../../components/game/AchievementsModal'
import { fetchBoardData } from '../../components/game/firebase/fetchBoardData'
import fetchGameData from '../../components/game/firebase/fetchGameData'
import yourTurn from '../../components/game/firebase/yourTurn'
import GameBoard from '../../components/game/GameBoard'
import { IValidWords } from '../../components/game/interface/IvalidWords'
import LeveledUpModal from '../../components/game/LeveldUpModal'
import Points from '../../components/game/Points'
import SelectLetter from '../../components/game/SelectLetter'
import {
  EndTurnStatusMessage,
  OpponentTurnStatusMessage,
  PointsStatusMessage,
  YourTurnStatusMessage,
} from '../../components/game/StatusMessage'
import GameStates from '../../components/game/types/gameStates'
import {
  GameContext,
  IGameContext,
} from '../../components/game/utils/gameContext'
import BackToGamesButton from '../../components/games/BackToGamesButton'
import selectUserID from '../../components/games/utils/selectUserID'
import { fetchUserData } from '../../components/profile/firebase/fetchUserData'
import { db } from '../../firebase/clientApp'
import boardDataConverter from '../../firebase/converters/boardDataConverter'
import userConverter from '../../firebase/converters/userConverter'
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
  let userData = await fetchUserData(uid)
  userData = JSON.parse(JSON.stringify(userData))

  const opponentID = selectUserID(
    uid,
    gameData?.playerOne as string,
    gameData?.playerTwo as string
  )
  let opponentData = await fetchUserData(opponentID)
  opponentData = JSON.parse(JSON.stringify(opponentData))

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
  const [winner, setWinner] = useState<string>(gameData.winner as string)

  // Modal for level up
  const [openLeveldUpModal, setOpenLeveldUpModal] = useState<boolean>(false)

  // Modal for Achievements
  const [openPlay10GamesModal, setOpenPlay10GamesModal] =
    useState<boolean>(false)
  const [openWin3GamesModal, setOpenWin3GamesModal] = useState<boolean>(false)
  const [openPlay3Opponents, setOpenPlay3Opponents] = useState<boolean>(false)

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

  /* 
    Listen for changes in user data, in order to update openLeveldUpModal
    in GameContextValues

    This allows LeveledUpModal to be shown when the user has leveld up
  */

  console.log(userData.achievements)

  const [userDoc] = useDocumentData(
    doc(db, 'users', uid as string).withConverter(userConverter)
  )

  useEffect(() => {
    // If openLeveldUpModal has been changed to true in firebase -> set to true localy to show the modal
    if (userDoc?.openLeveldUpModal == true) {
      setOpenLeveldUpModal(true)
    }
    if (
      userDoc?.achievements &&
      userDoc?.achievements['play-10-games'].openAchievementModal == true
    ) {
      setOpenPlay10GamesModal(true)
    }
    if (
      userDoc?.achievements &&
      userDoc?.achievements['win-3-games'].openAchievementModal == true
    ) {
      setOpenWin3GamesModal(true)
    }
    if (
      userDoc?.achievements &&
      userDoc?.achievements['play-3-different-opponents']
        .openAchievementModal == true
    ) {
      setOpenPlay3Opponents(true)
    }
  }, [userDoc])

  const closeLeveldUpModal = async () => {
    // When closing the OpenLeveldUpModal, openLeveldUpModal is set to false both localy and in firebase
    setOpenLeveldUpModal(false)
    await updateDoc(doc(db, 'users', uid), {
      openLeveldUpModal: false,
    })
  }

  const closeAchievementsModal = async (achievement: string) => {
    // Set local state to false
    if (achievement == 'play-10-games') {
      setOpenPlay10GamesModal(false)
    } else if (achievement == 'win-3-games') {
      setOpenWin3GamesModal(false)
    } else if (achievement == 'play-3-different-opponents') {
      setOpenPlay3Opponents(false)
    }
    // Set firebase state to false
    await updateDoc(doc(db, 'users', uid), {
      [`achievements.${achievement}.openAchievementModal`]: false,
    })
  }

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
    opponentName: opponentData.name,
    userName: userData.name,
    userPoints: userPoints,
    setUserPoints: setUserPoints,
    opponentPoints: opponentPoints,
    setOpponentPoints: setOpponentPoints,
    roundsLeft: roundsLeft,
    setRoundsLeft: setRoundsLeft,
    validWords: validWords,
    setValidWords: setValidWords,
    winner: winner,
    setWinner: setWinner,
    experiencePoints: userData.experiencePoints,
    opponentExperiencePoints: opponentData.experiencePoints,
  }

  gameDataListener(GameContextValues)

  return (
    <Container>
      {/* Back to games button */}
      <BackToGamesButton />

      <GameContext.Provider value={GameContextValues}>
        {/* Display who turn it is */}

        {gameState === GameStates.END && <EndTurnStatusMessage />}

        {gameState === GameStates.END && winner === uid && (
          <Center style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <ConfettiExplosion
              force={0.6}
              duration={8000}
              particleCount={100}
              height={1600}
              width={1600}
            />
          </Center>
        )}

        {!validWords.length && gameState !== GameStates.END && yourTurn && (
          <YourTurnStatusMessage />
        )}

        {!validWords.length && gameState !== GameStates.END && !yourTurn && (
          <OpponentTurnStatusMessage />
        )}

        {validWords.length >= 1 && (
          <PointsStatusMessage validWordList={validWords} />
        )}

        <Points />
        <GameBoard />
        {gameState === GameStates.CHOOSE && <SelectLetter />}
        <LeveledUpModal
          openLeveldUpModal={openLeveldUpModal}
          closeLeveldUpModal={closeLeveldUpModal}
          experiencePoints={GameContextValues.experiencePoints}
        />
        <AchievementsModal
          acheievement="win-3-games"
          openModal={openWin3GamesModal}
          closeAchievementsModal={closeAchievementsModal}
        />
        <AchievementsModal
          acheievement="play-3-different-opponents"
          openModal={openPlay3Opponents}
          closeAchievementsModal={closeAchievementsModal}
        />
        <AchievementsModal
          acheievement="play-10-games"
          openModal={openPlay10GamesModal}
          closeAchievementsModal={closeAchievementsModal}
        />
      </GameContext.Provider>
    </Container>
  )
}

export default GameID
