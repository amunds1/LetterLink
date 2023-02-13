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
import Game from '../../../types/Game'
import { fetchUserData } from '../../profile/firebase/fetchUserData'
import selectUserID from '../utils/selectUserID'

const chunkArray = (list: any[], chunk: number): any[][] => {
  const result = []

  for (let i = 0; i < list.length; i += chunk) {
    result.push(list.slice(i, i + chunk))
  }

  return result
}

const fetchGames = async (
  gamesIDs: DocumentReference<DocumentData>[],
  uid: string
) => {
  const tempGames: Game[] = []

  // Split gamesIDs array into chunks of 10, because Firebase does not allow more than
  // 10 items in a 'in' query
  const gamesIDsChunks = chunkArray(gamesIDs, 10)

  for (const gameIDs of gamesIDsChunks) {
    // Query games from Firestore
    const q = query(
      collection(getFirestore(firebase), 'games'),
      where(documentId(), 'in', gameIDs)
    ).withConverter(gamesConverter)

    // Fetch and parse games
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

    tempGames.concat(gamesParsed)
  }

  return tempGames
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
