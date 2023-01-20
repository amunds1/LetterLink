import {
  Button,
  Checkbox,
  Group,
  Input,
  Text,
  TextInput,
  Transition,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { SuccessNotification } from '../components/NotificationBanner'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import fetchUID from '../firebase/fetchUID'
import User from '../types/User'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const uid = await fetchUID(ctx)

    const userData = JSON.parse(JSON.stringify(await fetchUserData(uid)))

    return {
      props: {
        uid,
        userData,
      },
    }
  } catch (err) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }
}

const Settings = ({ uid, userData }: { uid: string; userData: User }) => {
  const [alert, setAlert] = useState(true)

  const [newUsername, setNewUsername] = useState('')

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  // Remove alert after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }, [])

  console.log(form.values)

  return (
    <>
      {/* <Transition
        mounted={alert}
        transition="fade"
        duration={800}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <SuccessNotification
              title="Success"
              contentMessage="Successfully updated profile information"
            />
          </div>
        )}
      </Transition> */}

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Username"
          placeholder={userData.name}
          {...form.getInputProps('username')}
        />

        <TextInput label="Email" {...form.getInputProps('email')} />
        <Text size="sm" color="red">
          Email is not verified
        </Text>

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  )
}

export default Settings
