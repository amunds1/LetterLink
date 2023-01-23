import { fetchUserData } from '../../profile/firebase/fetchUserData'

const getName = async (uid: string) => {
  const userData = await fetchUserData(uid)

  return userData?.name
}

export default getName
