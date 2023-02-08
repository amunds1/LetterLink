import { Button, Center, Input, Text } from '@mantine/core'
import { updateDoc, doc } from 'firebase/firestore'
import { ChangeEvent, useContext, useState } from 'react'
import { db } from '../../firebase/clientApp'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'

const SelectLetter = () => {
  const gameContext = useContext(GameContext)

  const [selectedLetter, setSelectedLetter] = useState('')

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
            <Input
              style={{
                width: '100%',
                margin: '10px',
              }}
              type="text"
              placeholder="Type a letter"
              maxLength={1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const char = e.currentTarget.value.toUpperCase()
                if (isValidChar(char)) {
                  setSelectedLetter(char)
                } else {
                  setSelectedLetter('')
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
              <Text color={selectedLetter ? '#66A80F' : '#ADB5BD'}>
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
