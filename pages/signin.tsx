import { Center, Container, createStyles } from '@mantine/core'
import React from 'react'
import { AuthenticationForm } from '../components/SignIn/AuthenticationForm'

const useStyles = createStyles(() => ({
  container: { height: '100%' },
}))

const SignIn = () => {
  const { classes } = useStyles()

  return (
    <Center className={classes.container}>
      <AuthenticationForm />
    </Center>
  )
}

export default SignIn
