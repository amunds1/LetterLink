import { Button, Select, Center, Text } from '@mantine/core'
import { updateDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { db } from '../../firebase/clientApp'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'
import useSound from 'use-sound'

const SelectLetter = () => {
  const gameContext = useContext(GameContext)

  const [selectedLetter, setSelectedLetter] = useState('')

  // TODO: Add suitable sounds
  const [playSubmit] = useSound('/sounds/confirm.wav')
  const [playSelect] = useSound('/sounds/click.wav')

  return (
    <>
      {gameContext?.yourTurn && (
        <>
          <Center>
            <Select
              style={{ margin: '10px', width: '100%' }}
              label="Select letter"
              placeholder=""
              onChange={(e: string) => {
                setSelectedLetter(e)
                playSelect()
              }}
              data={[
                { value: 'P', label: 'P' },
                { value: 'A', label: 'A' },
                { value: 'I', label: 'I' },
                { value: 'O', label: 'O' },
                { value: 'L', label: 'L' },
                { value: 'E', label: 'E' },
                { value: 'R', label: 'R' },
              ]}
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
                playSubmit()
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
