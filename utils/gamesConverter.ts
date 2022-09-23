import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import Game from '../types/Game'

const gamesConverter: FirestoreDataConverter<Game> = {
  toFirestore(game: WithFieldValue<Game>): DocumentData {
    return { boardSize: game.boardSize }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Game {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      boardSize: data.boardSize,
      player1: {
        board: data.player1.board,
        user: data.player1.user,
      },
      player2: {
        board: data.player2.board,
        user: data.player2.user,
      },
    }
  },
}

export default gamesConverter
