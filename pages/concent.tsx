import { useState } from 'react'
import { Button, Checkbox, Stack } from '@mantine/core'

const Concent = () => {
  const [checked, setChecked] = useState(false)

  const agreeToParticipate = () => {
    console.log('Agreed')
  }

  return (
    <>
      <p>Letterlink is a ...</p>
      <Stack justify={'center'} align={'center'}>
        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label={'I agree to participate'}
        />
        <Button
          color={'green'}
          disabled={!checked}
          onClick={() => agreeToParticipate()}
        >
          Continue
        </Button>
      </Stack>
    </>
  )
}

export default Concent
