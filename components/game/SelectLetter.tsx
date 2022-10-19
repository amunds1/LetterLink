import { Button, Select } from '@mantine/core'
import { useContext } from 'react'
import updateSelectedLetter from '../../pages/api/utils/updateSelectedLetter'
import GameStates from './types/gameStates'
import { GameContext } from './utils/gameContext'

const SelectLetter = () => {
  const gameContext = useContext(GameContext)

  return (
    <>
      {gameContext?.yourTurn && (
        <>
          <Select
            label="Select letter"
            placeholder=""
            value={gameContext.selectedLetter}
            onChange={gameContext.setSelectedLetter}
            data={[
              { value: 'P', label: 'P' },
              { value: 'A', label: 'A' },
              { value: 'I', label: 'I' },
            ]}
          />
          <Button
            onClick={() => {
              // Set game state to 'PLACE'
              gameContext.setGameState(GameStates.PLACE)

              // Update selectedLetter
              updateSelectedLetter(
                gameContext.gameID,
                gameContext.selectedLetter as string
              )
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
