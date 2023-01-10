import { Button, Input, Stack, Text } from '@mantine/core'
import { doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../firebase/clientApp'
import updateDocument from '../../firebase/updateDocument'

const ChangeUsername = ({ uid }: { uid: string }) => {
  const [newUsername, setNewUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)

    const res = await updateDocument(doc(db, 'users', uid), {
      name: newUsername,
    })

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
