import { Button, Select } from '@mantine/core'
import { useContext, useState } from 'react'
import { updateGameState } from '../../pages/api/utils/updateGameState'
import updateSelectedLetter from '../../pages/api/utils/updateSelectedLetter'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'

const SelectLetter = () => {
  const gameContext = useContext(GameContext)

  const [selectedLetter, setSelectedLetter] = useState('')

  return (
    <>
      {gameContext?.yourTurn && (
        <>
          <Select
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
          <Button
            onClick={() => {
              // Set game state to PLACE_OWN
              gameContext.setGameState(GameStates.PLACE_OWN)

              // Update gameState param in Firebase
              updateGameState(gameContext.gameID, GameStates.PLACE_OWN)

              // Update selectedLetter param in Firebase
              updateSelectedLetter(gameContext.gameID, selectedLetter)
            }}
          >
            Choose letter
          </Button>
        </>
      )}
    </>
  )
}

export default SelectLetter
