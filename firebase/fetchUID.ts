import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import { firebaseAdmin } from './admin'

const fetchUID = async (ctx: GetServerSidePropsContext) => {
  // Retrieve uid of authenticated user
  const cookies = nookies.get(ctx)
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
  const { uid } = token

  return uid
}

export default fetchUID
