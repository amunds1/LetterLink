import {
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { deleteDoc, doc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import { db } from '../firebase/clientApp'
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
  const [deleteProfileModalOpen, setDeleteProfileModalOpen] = useState(false)

  const router = useRouter()

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

  const deleteProfile = async () => {
    console.log('Deleting profile')

    // Delete user document stored in Firebase
    // await deleteDoc(doc(db, 'users', userData.id))

    // Redirect to /signin
    router.push('/signin')
  }

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
      <Modal
        title="Delete profile and data"
        opened={deleteProfileModalOpen}
        onClose={() => setDeleteProfileModalOpen(false)}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        <Text>
          All information stored about you will be deleted and you will no
          longer parttake in the research project
        </Text>

        <Text mt="lg">This operation is not reversible</Text>

        <Text mt="lg">
          Are you sure you want to delete your profile and all data associated?
        </Text>
        <Group mt="xl">
          <Button
            color="green"
            variant="light"
            onClick={() => setDeleteProfileModalOpen(false)}
          >
            No, keep my profile and data
          </Button>
          <Button color="red" variant="light" onClick={deleteProfile}>
            Yes
          </Button>
        </Group>
      </Modal>

      <Stack>
        <Text size="lg" weight="bold">
          Update profile information
        </Text>

        {/* Update profile form */}
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <TextInput
              label="Username"
              placeholder={userData.name}
              {...form.getInputProps('username')}
            />

            <TextInput
              label="Email"
              {...form.getInputProps('email')}
              error="Email is not verified"
              placeholder="placeholder@gmail.com"
            />

            <Group position="left">
              <Button type="submit">Update profile</Button>
            </Group>
          </Stack>
        </form>

        <Divider my="sm" />

        {/* Danger zone */}
        <Text size="lg" weight="bold">
          Danger zone
        </Text>

        <Button
          color="red"
          variant="outline"
          type="submit"
          onClick={() => setDeleteProfileModalOpen(true)}
        >
          Delete all my profile and data
        </Button>
        <Text>This involves ...</Text>
      </Stack>
    </>
  )
}

export default Settings
