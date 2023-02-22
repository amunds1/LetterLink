import { Alert, Center, Text, useMantineColorScheme } from '@mantine/core'
import { useContext } from 'react'
import { IValidWords } from './interface/IvalidWords'
import { GameContext } from './utils/gameContext'
import GameStates from './types/gameStates'

export const YourTurnStatusMessage = ({
  gameState,
}: {
  gameState:
    | GameStates.PLACE_OWN
    | GameStates.CHOOSE
    | GameStates.PLACE_OPPONENTS
    | GameStates.END
}) => {
  return (
    <Center>
      <Alert
        mt="sm"
        radius="md"
        color="lime"
        style={{
          width: '100%',
          border: '1px solid #D8F5A2',
          textAlign: 'center',
        }}
      >
        {gameState === GameStates.CHOOSE && 'Choose a letter'}

        {gameState === GameStates.PLACE_OWN && 'Drag the letter to the grid'}

        {gameState === GameStates.PLACE_OPPONENTS &&
          'Drag the letter to the grid'}
      </Alert>
    </Center>
  )
}

export const OpponentTurnStatusMessage = () => {
  return (
    <Center>
      <Alert
        mt="sm"
        title=""
        radius="md"
        color="orange"
        style={{
          width: '100%',
          border: '1px solid #FFD8A8',
          textAlign: 'center',
        }}
      >
        It is your opponents turn!
      </Alert>
    </Center>
  )
}

export const EndTurnStatusMessage = () => {
  const gameContext = useContext(GameContext)
  // Dark mode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'
  return (
    <Center>
      <Alert
        mt="sm"
        radius="md"
        color={dark ? 'gray' : 'dark'}
        style={{
          width: '100%',
          border: '1px solid #909296',
          textAlign: 'center',
        }}
      >
        <Text weight="bold">The game is over</Text>
        {gameContext &&
          (gameContext?.winner == gameContext.userUID
            ? 'You won the game'
            : gameContext?.winner == gameContext.opponentID
            ? `${gameContext?.opponentName} won the game`
            : 'The game has no winner')}
      </Alert>
    </Center>
  )
}

export const PointsStatusMessage = ({
  validWordList,
}: {
  validWordList: IValidWords[]
}) => {
  const gameContext = useContext(GameContext)
  return (
    <Center>
      <Alert
        mt="sm"
        radius="md"
        color="teal"
        style={{
          width: '100%',
          border: '1px solid #96F2D7',
          textAlign: 'center',
        }}
      >
        {validWordList.map((validword, index) => (
          <Text key={index}>
            You placed the word{' '}
            <span style={{ fontWeight: 'bold' }}>{validword.word} </span>
            for{' '}
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              {validword.points} points
            </span>
          </Text>
        ))}
      </Alert>
    </Center>
  )
}
