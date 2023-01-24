import { Button, Select, Center } from '@mantine/core'
import { updateDoc, doc } from 'firebase/firestore'
import { useContext, useState } from 'react'
import { db } from '../../firebase/clientApp'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'

const SelectLetter = () => {
  const gameContext = useContext(GameContext)

  const [selectedLetter, setSelectedLetter] = useState('')

  return (
    <>
      {gameContext?.yourTurn && (
        <>
          <Center>
            <Select
              style={{ margin: '10px' }}
              label="Select letter"
              placeholder=""
              onChange={(e: string) => {
                setSelectedLetter(e)
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
              color="green"
              style={{ margin: '10px' }}
              disabled={!selectedLetter}
              onClick={async () => {
                // Set new gameState and selectedLetter in game document
                await updateDoc(doc(db, 'games', gameContext.gameID), {
                  gameState: GameStates.PLACE_OWN,
                  selectedLetter: selectedLetter,
                })
              }}
            >
              Choose letter
            </Button>
          </Center>
        </>
      )}
    </>
  )
}

export default SelectLetter
