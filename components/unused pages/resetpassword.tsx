import { Stack, Button, TextInput } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { SuccessNotification } from '../NotificationBanner'
import firebase from '../../firebase/clientApp'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    getAuth(firebase)
  )

  const resetPassword = async () => {
    const success = await sendPasswordResetEmail(email)
    console.log(sending, error, success)

    if (success) {
      setEmailSent(true)
    }
  }

  return (
    <Stack style={{ height: '100vh' }}>
      {emailSent && (
        <SuccessNotification contentMessage="Email with password reset instructions sent" />
      )}
      <TextInput
        value={email}
        label="Enter your email"
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Button onClick={() => resetPassword()}>Reset password</Button>
    </Stack>
  )
}

export default ResetPassword
