import { Center, createStyles, Text } from '@mantine/core'
import { doc, getDoc } from 'firebase/firestore'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import nookies from 'nookies'
import Statistics from '../components/profile/Statistics'
import { firebaseAdmin } from '../firebase/admin'
import { db } from '../firebase/clientApp'
import usersConverter from '../firebase/converters/userConverter'
import User from '../types/User'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx)
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

    // User is authenticated
    const { uid } = token

    const userDocRef = doc(db, `users/${uid}`).withConverter(usersConverter)
    const userData = (await getDoc(userDocRef)).data()

    return {
      props: {
        userData: userData,
      },
    }
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // ctx.res.writeHead(302, { Location: '/signin' })
    // ctx.res.end()

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never }
  }
}

const Profile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { classes } = useStyles()

  return (
    <>
      {!props.userData && (
        <Center className={classes.center}>
          <Text size={'xl'}>
            To view your profile you need to{' '}
            <Link href={'/signin'}>
              <a>Sign In</a>
            </Link>
          </Text>
        </Center>
      )}

      {props.userData && (
        <>
          <Center>
            <Text size="lg">{props.userData.name}</Text>
          </Center>
          <Statistics />
        </>
      )}
    </>
  )
}

export default Profile
