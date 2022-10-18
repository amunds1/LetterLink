import { Select, Button } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import updateSelectedLetter from '../../pages/api/utils/updateSelectedLetter'
import GameStates from './types/gameStates'

interface ISelectLetter {
  selectedLetter: string | null
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
  gameState: GameStates.PLACE | GameStates.CHOOSE
  setGameState: Dispatch<SetStateAction<GameStates.PLACE | GameStates.CHOOSE>>
  gameID: string
}

const SelectLetter = ({
  selectedLetter,
  setSelectedLetter,
  gameState,
  setGameState,
  gameID,
}: ISelectLetter) => {
  return (
    <>
      <Select
        label="Select letter"
        placeholder=""
        value={selectedLetter}
        onChange={setSelectedLetter}
        data={[
          { value: 'P', label: 'P' },
          { value: 'A', label: 'A' },
          { value: 'I', label: 'I' },
        ]}
      />
      <Button
        onClick={() => {
          // Set game state to 'PLACE'
          setGameState(GameStates.PLACE)

          // Update selectedLetter
          updateSelectedLetter(gameID, selectedLetter as string)
        }}
      >
        Choose letter
      </Button>
    </>
  )
}

export default SelectLetter
