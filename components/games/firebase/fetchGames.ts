import {
  collection,
  DocumentData,
  documentId,
  DocumentReference,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import firebase from '../../../firebase/clientApp'
import gamesConverter from '../../../firebase/converters/gamesConverter'
import { fetchUserData } from '../../profile/firebase/fetchUserData'
import selectUserID from '../utils/selectUserID'

const fetchGames = async (
  gamesIDs: DocumentReference<DocumentData>[],
  uid: string
) => {
  const q = query(
    collection(getFirestore(firebase), 'games'),
    where(documentId(), 'in', gamesIDs)
  ).withConverter(gamesConverter)

  const games = await getDocs(q)
  const gamesParsed = games.docs.map((game) => game.data())

  // Populate Game object with opponent name
  for (const game of gamesParsed) {
    const oponentID = selectUserID(
      uid,
      game.playerOne as string,
      game.playerTwo as string
    )

    const userData = await fetchUserData(oponentID)

    game.opponentName = userData?.name
  }

  return gamesParsed
}

export const fetchProposedGames = async (
  proposedGamesIDs: DocumentReference<DocumentData>[],
  uid: string
) => {
  const proposedGames = await fetchGames(proposedGamesIDs, uid)

  return proposedGames
}

export const fetchActiveGames = async (
  activeGamesIDs: DocumentReference<DocumentData>[],
  uid: string
) => {
  const activeGames = await fetchGames(activeGamesIDs, uid)

  return activeGames
}
