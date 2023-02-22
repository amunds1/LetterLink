import {
  Button,
  Center,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core'
import { updateDoc, doc } from 'firebase/firestore'
import { ChangeEvent, useContext, useState } from 'react'
import { db } from '../../firebase/clientApp'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'

const SelectLetter = () => {
  // Darkmode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const gameContext = useContext(GameContext)

  const [selectedLetter, setSelectedLetter] = useState('')
  const [error, setError] = useState<boolean>(false)

  const isValidChar = (char: string) => {
    if (char.length === 1) {
      return char.toLowerCase() != char.toUpperCase()
    }
    return false
  }

  return (
    <>
      {gameContext?.yourTurn && (
        <>
          <Center>
            <TextInput
              style={{
                width: '100%',
                margin: '10px 10px 0px 10px',
              }}
              placeholder="Type a letter"
              error={error ? 'Not valid! You have to type a letter' : false}
              maxLength={1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // Force input to uppercase
                e.currentTarget.value = e.currentTarget.value.toUpperCase()
                const char = e.currentTarget.value
                // Checks if input is valid (not number or symbols)
                if (isValidChar(char)) {
                  setSelectedLetter(char)
                  setError(false)
                } else {
                  setSelectedLetter('')
                  // If input is empty -> no error message
                  if (char.length == 0) {
                    setError(false)
                  } else {
                    setError(true)
                  }
                }
              }}
            />
          </Center>
          <Center>
            <Button
              color="lime"
              disabled={!selectedLetter}
              fullWidth
              variant="light"
              style={
                selectedLetter
                  ? { border: '1px solid #D8F5A2', margin: '10px' }
                  : { border: '1px solid #CED4DA', margin: '10px' }
              }
              onClick={async () => {
                // Set new gameState and selectedLetter in game document
                await updateDoc(doc(db, 'games', gameContext.gameID), {
                  gameState: GameStates.PLACE_OWN,
                  selectedLetter: selectedLetter,
                })
              }}
            >
              <Text
                color={
                  selectedLetter
                    ? dark
                      ? '#D8F5A2'
                      : '#82C91E'
                    : dark
                    ? '#868E9670'
                    : '#ADB5BD'
                }
              >
                Choose letter
              </Text>
            </Button>
          </Center>
        </>
      )}
    </>
  )
}

export default SelectLetter
