import { Select, Button } from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import GameStates from './types/gameStates'

interface ISelectLetter {
  selectedLetter: string | null
  setSelectedLetter: Dispatch<SetStateAction<string | null>>
  gameState: GameStates.PLACE | GameStates.CHOOSE
  setGameState: Dispatch<SetStateAction<GameStates.PLACE | GameStates.CHOOSE>>
}

const SelectLetter = ({
  selectedLetter,
  setSelectedLetter,
  gameState,
  setGameState,
}: ISelectLetter) => {
  return (
    <>
      <Select
        label="Select letter"
        placeholder=""
        value={selectedLetter}
        onChange={setSelectedLetter}
        data={[
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
        ]}
      />
      <Button onClick={() => setGameState(GameStates.PLACE)}>
        Chose letter
      </Button>
    </>
  )
}

export default SelectLetter
