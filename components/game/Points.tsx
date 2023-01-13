import { useEffect, useState, useContext } from 'react'
import { GameContext } from './utils/gameContext'
import { Box, Center, Avatar, Text, createStyles } from '@mantine/core'
import { fetchUserData } from '../profile/firebase/fetchUserData'
import { fetchBoardData } from './firebase/fetchBoardData'

const useStyles = createStyles(() => ({
  playerBox: {
    padding: '0 3% 0 3%',
  },
  seperatorBox: {
    padding: '0 6% 0 6%',
  },
  pointsText: {
    fontSize: '30px',
    fontWeight: 'bold',
  },
}))

const Points = () => {
  const { classes } = useStyles()

  const [userName, setUserName] = useState('')
  const [points, setPoints] = useState<number>(0)

  const [opponentPoints, setOpponentPoints] = useState<number>(0)
  const [opponentName, setOpponentName] = useState('')

  const gameContext = useContext(GameContext)

  const calculatePoints = (
    columnPoints: { [key: number]: number },
    rowPoints: { [key: number]: number }
  ) => {
    let sumPoints = 0
    for (const [key, value] of Object.entries(columnPoints)) {
      sumPoints += value
    }
    for (const [key, value] of Object.entries(rowPoints)) {
      sumPoints += value
    }
    return sumPoints
  }

  // Get and set userName and opponentName
  useEffect(() => {
    async function fetchData() {
      const userData = await fetchUserData(gameContext?.userUID as string)
      const opponentData = await fetchUserData(
        gameContext?.opponentID as string
      )
      setUserName(userData?.name as string)
      setOpponentName(opponentData?.name as string)
    }
    fetchData()
  }, [gameContext?.userUID, gameContext?.opponentID])

  // Get and set opponents points
  useEffect(() => {
    async function fetchData() {
      const opponentBoardData = await fetchBoardData(
        gameContext?.gameID as string,
        gameContext?.opponentID as string
      )
      let sumPoints = 0
      if (opponentBoardData) {
        sumPoints = calculatePoints(
          opponentBoardData.columnPoints,
          opponentBoardData.rowPoints
        )
      }
      setOpponentPoints(sumPoints)
    }
    fetchData()
    // TODO - ikke helt optimal løsning her
  }, [gameContext?.yourTurn])

  // Get and set users points
  useEffect(() => {
    let sumPoints = 0
    if (gameContext) {
      sumPoints = calculatePoints(
        gameContext.columnPoints,
        gameContext.rowPoints
      )
    }
    setPoints(sumPoints)
  }, [gameContext?.columnPoints, gameContext?.rowPoints])

  return (
    <Box
      sx={(theme) => ({
        textAlign: 'center',
        padding: theme.spacing.lg,
      })}
    >
      <Center>
        {/* User points */}
        <Box className={classes.playerBox}>
          <Center>
            <Avatar variant="filled" color="teal" radius="xl"></Avatar>
          </Center>
          <Center>
            <Text size="md">{userName}</Text>
          </Center>
        </Box>
        <Text className={classes.pointsText}>{points}</Text>

        {/* Seperator*/}
        <Box className={classes.seperatorBox}>
          <Text size="xl">vs</Text>
        </Box>

        {/* Opponents points */}
        <Text className={classes.pointsText}>{opponentPoints}</Text>
        <Box className={classes.playerBox}>
          <Center>
            <Avatar variant="filled" color="indigo" radius="xl"></Avatar>
          </Center>
          <Center>
            <Text size="md">{opponentName}</Text>
          </Center>
        </Box>
      </Center>
    </Box>
  )
}

export default Points
