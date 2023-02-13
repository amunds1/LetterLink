import { Button, Modal, Stack, Text, TextInput } from '@mantine/core'
import { doc, updateDoc } from 'firebase/firestore'
import { Dispatch, SetStateAction, useState } from 'react'
import { db } from '../../firebase/clientApp'

const SetUsernameModal = ({
  showModalSetUsername,
  setShowModalSetUsername,
  uid,
}: {
  showModalSetUsername: boolean
  setShowModalSetUsername: Dispatch<SetStateAction<boolean>>
  uid: string
}) => {
  const [newUsername, setNewUsername] = useState('')
  const [usernameUpdated, setUsernameUpdated] = useState(false)

  const updateUsername = async () => {
    // Update user document stored in Firebase
    await updateDoc(doc(db, 'users', uid), {
      name: newUsername,
      hasDefaultUsername: false,
    })

    setUsernameUpdated(true)
  }

  return (
    <Modal
      centered
      title="Set your new username"
      opened={showModalSetUsername}
      onClose={() => setShowModalSetUsername(false)}
    >
      {!usernameUpdated && (
        <>
          <TextInput
            value={newUsername}
            onChange={(e) => setNewUsername(e.currentTarget.value)}
          ></TextInput>

          <Stack>
            <Button color="green" mt="lg" onClick={() => updateUsername()}>
              Update username
            </Button>
            <Button variant="subtle">No thanks, I will do it later</Button>
          </Stack>
        </>
      )}

      {usernameUpdated && (
        <Stack>
          <Text>Username updated successfully to {newUsername}</Text>

          <Button onClick={() => setShowModalSetUsername(false)}>Okay!</Button>
        </Stack>
      )}
    </Modal>
  )
}

export default SetUsernameModal
