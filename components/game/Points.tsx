import { useContext } from 'react'
import { GameContext } from './utils/gameContext'
import { Box, Center, Avatar, Text, createStyles } from '@mantine/core'

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

  const gameContext = useContext(GameContext)

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
            <Text size="md">{gameContext?.userData.name}</Text>
          </Center>
        </Box>
        <Text className={classes.pointsText}>{gameContext?.userPoints}</Text>

        {/* Seperator*/}
        <Box className={classes.seperatorBox}>
          <Text size="xl">vs</Text>
        </Box>

        {/* Opponents points */}
        <Text className={classes.pointsText}>
          {gameContext?.opponentPoints}
        </Text>
        <Box className={classes.playerBox}>
          <Center>
            <Avatar variant="filled" color="indigo" radius="xl"></Avatar>
          </Center>
          <Center>
            <Text size="md">{gameContext?.opponentData.name}</Text>
          </Center>
        </Box>
      </Center>
    </Box>
  )
}

export default Points
