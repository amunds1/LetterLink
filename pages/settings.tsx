import {
  Button,
  Card,
  Container,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Transition,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { deleteUser, getAuth } from 'firebase/auth'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ColorSchemeToggle from '../components/ColorSchemeToggle'
import { SuccessNotification } from '../components/NotificationBanner'
import { fetchUserData } from '../components/profile/firebase/fetchUserData'
import { db } from '../firebase/clientApp'
import fetchUID from '../firebase/fetchUID'
import signOutUser from '../firebase/signOutUser'
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
  const [alert, setAlert] = useState(false)

  const [deleteProfileModalOpen, setDeleteProfileModalOpen] = useState(false)

  const router = useRouter()

  const form = useForm({
    initialValues: {
      username: userData.name,
    },

    validate: {},
  })

  // Remove alert after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }, [])

  const updateProfileInformation = async () => {
    // Update user document stored in Firebase
    await updateDoc(doc(db, 'users', userData.id), {
      name: form.values.username,
    })

    // Set alert to true
    setAlert(true)
  }

  const deleteProfile = async () => {
    // Delete user document stored in Firebase
    await deleteDoc(doc(db, 'users', userData.id))

    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      deleteUser(user)
        .then(() => {
          // User deleted, redirect to /signin
          console.log('Deleted profile')
          router.push('/signin')
        })
        .catch((error) => {
          console.log('An error occured when deleting the user')
        })
    }
  }

  return (
    <Container>
      <Text align="center" size="xl" weight="bold" mt="sm" mb="xl">
        Settings
      </Text>
      <Transition
        mounted={alert}
        transition="fade"
        duration={2000}
        timingFunction="ease"
        onExited={() => setAlert(false)}
      >
        {(styles) => (
          <div style={styles}>
            <SuccessNotification
              title="Success"
              contentMessage="Successfully updated profile information"
            />
          </div>
        )}
      </Transition>

      <Modal
        title="Delete profile and data"
        opened={deleteProfileModalOpen}
        onClose={() => setDeleteProfileModalOpen(false)}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        {/* <Text>
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
        </Group> */}
        To delete profile and withdraw from the study, contact
        <br />
        <a href="mailto:andramu@stud.ntnu.no?subject=Ønske om å trekke seg fra studien">
          andramu@stud.ntnu.no
        </a>
      </Modal>

      {/* Update profile form */}

      {/* 
        <Text size="lg" weight="bold">
          Update profile information
        </Text>

        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <TextInput
              label="Username"
              placeholder={userData.name}
              {...form.getInputProps('username')}
            />

            <Group position="left">
              <Button type="submit" onClick={() => updateProfileInformation()}>
                Update profile
              </Button>
            </Group>
          </Stack>
        </form>
        */}

      <Stack>
        <Card shadow="lg">
          <Stack align="center">
            <Text size="lg" weight="bold">
              Change apperance
            </Text>
            <ColorSchemeToggle />
          </Stack>
        </Card>

        <Card shadow="lg">
          <Stack align="center">
            <Text size="lg" weight="bold">
              Log out of LetterLink
            </Text>
            <Button
              onClick={() => signOutUser().then(() => router.push('/signin'))}
              variant="light"
              color="blue"
              style={{ border: '1px solid #A5D8FF' }}
            >
              Log out
            </Button>
          </Stack>
        </Card>

        {/* Danger zone */}
        <Card shadow="lg">
          <Stack align="center">
            <Group spacing="xs">
              <Text size="lg" weight="bold">
                Danger zone
              </Text>
              <Image width={30} src="icons/warning.svg" />
            </Group>

            <Button
              color="red"
              variant="light"
              style={{ border: '1px solid #FFC9C9', width: 'fit-content' }}
              type="submit"
              onClick={() => setDeleteProfileModalOpen(true)}
            >
              Delete profile and withdraw from the study
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
}

export default Settings
