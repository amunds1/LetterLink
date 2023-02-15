import { useContext } from 'react'
import { GameContext } from './utils/gameContext'
import { Box, Center, Avatar, Text, createStyles } from '@mantine/core'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'

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

  const ProfileIconsList: IProfileIcon = ProfileIcons

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
            {gameContext?.userName && (
              <Avatar src={ProfileIconsList[gameContext?.userName]} />
            )}
            {!gameContext?.userName && <Avatar color="cyan" radius="xl" />}
          </Center>
          <Center>
            <Text size="md">{gameContext?.userName}</Text>
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
            {gameContext?.opponentName && (
              <Avatar src={ProfileIconsList[gameContext?.opponentName]} />
            )}
            {!gameContext?.opponentName && <Avatar color="cyan" radius="xl" />}
          </Center>
          <Center>
            <Text size="md">{gameContext?.opponentName}</Text>
          </Center>
        </Box>
      </Center>
    </Box>
  )
}

export default Points
