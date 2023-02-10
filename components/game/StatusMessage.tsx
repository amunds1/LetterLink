import { Alert, Center, Text } from '@mantine/core'
import { useContext } from 'react'
import { IValidWords } from './interface/IvalidWords'
import { GameContext } from './utils/gameContext'

export const YourTurnStatusMessage = () => {
  return (
    <Center>
      <Alert
        mt="sm"
        radius="md"
        color="lime"
        style={{
          width: '100%',
          border: '1px solid #A9E34B',
          textAlign: 'center',
        }}
      >
        Drag the letter to the grid
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
          border: '1px solid #FFA94D',
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
  return (
    <Center>
      <Alert
        mt="sm"
        radius="md"
        color="dark"
        style={{
          width: '100%',
          border: '1px solid #909296',
          textAlign: 'center',
        }}
      >
        {gameContext?.userPoints &&
          gameContext.opponentPoints &&
          (gameContext?.userPoints > gameContext?.opponentPoints
            ? 'You won the game'
            : gameContext?.userPoints < gameContext?.opponentPoints
            ? `${gameContext?.opponentName} won the game`
            : 'Draw! The game has no winner')}
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
        You placed the word ... for ... points
        {validWordList.map((validword, index) => (
          <Text key={index}>
            <span style={{ fontWeight: 'bold' }}>{validword.word} </span>
            <span style={{ fontWeight: 'bold' }}>
              + {validword.points} points
            </span>
          </Text>
        ))}
      </Alert>
    </Center>
  )
}
