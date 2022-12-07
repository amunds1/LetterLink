import { Button, Text, Input, Stack } from '@mantine/core'
import React, { useState } from 'react'
import updateUsername from './firebase/updateUsername'

const ChangeUsername = ({ uid }: { uid: string }) => {
  const [newUsername, setNewUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)

    const res = await updateUsername(uid, newUsername)

    if (res) {
      setIsLoading(false)
    }
  }

  return (
    <Stack>
      <Text>Update username</Text>
      <Input
        placeholder="New username"
        value={newUsername}
        onChange={(event: {
          currentTarget: { value: React.SetStateAction<string> }
        }) => setNewUsername(event.currentTarget.value)}
      />

      <Button loading={isLoading} onClick={() => onClick()}>
        Update
      </Button>
    </Stack>
  )
}

export default ChangeUsername
