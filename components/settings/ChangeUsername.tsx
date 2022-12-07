import { Button, Text, Input, Stack } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import React, { useState } from 'react'
import updateUsername from './firebase/updateUsername'

const ChangeUsername = ({ uid }: { uid: string }) => {
  const [newUsername, setNewUsername] = useDebouncedState('', 200)
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)

    const res = await updateUsername(uid, newUsername)

    if (res) {
      setIsLoading(false)
    }
  }

  console.log(newUsername)

  return (
    <Stack>
      <Text>Update username</Text>
      <Input
        placeholder="New username"
        defaultValue={newUsername}
        onChange={(event: { currentTarget: { value: string } }) =>
          setNewUsername(event.currentTarget.value)
        }
      />

      <Button loading={isLoading} onClick={() => onClick()}>
        Update
      </Button>
    </Stack>
  )
}

export default ChangeUsername
