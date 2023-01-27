import { Alert, Center } from '@mantine/core'

export const YourTurnStatusMessage = () => {
  return (
    <Center>
      <Alert
        mt="sm"
        title="It is your turn!"
        radius="md"
        color="lime"
        style={{ width: '100%', border: '1px solid #A9E34B' }}
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
        title="It is your opponents turn!"
        radius="md"
        color="orange"
        style={{ width: '100%', border: '1px solid #FFA94D' }}
      >
        Sit back and relax or plan your next move!
      </Alert>
    </Center>
  )
}
