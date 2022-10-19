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

const fetchGames = async (gamesIDs: DocumentReference<DocumentData>[]) => {
  const q = query(
    collection(getFirestore(firebase), 'games'),
    where(documentId(), 'in', gamesIDs)
  ).withConverter(gamesConverter)

  const games = await getDocs(q)
  const gamesParsed = games.docs.map((game) => game.data())

  return gamesParsed
}

export const fetchProposedGames = async (
  proposedGamesIDs: DocumentReference<DocumentData>[]
) => {
  const proposedGames = await fetchGames(proposedGamesIDs)

  return proposedGames
}

export const fetchActiveGames = async (
  activeGamesIDs: DocumentReference<DocumentData>[]
) => {
  const activeGames = await fetchGames(activeGamesIDs)

  return activeGames
}
