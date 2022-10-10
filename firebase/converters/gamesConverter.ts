import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import Game from '../../types/Game'

const gamesConverter: FirestoreDataConverter<Game> = {
  toFirestore(game: WithFieldValue<Game>): DocumentData {
    return {
      ...game,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Game {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      boardSize: data.boardSize,
      playerOne: data.playerOne,
      playerTwo: data.playerTwo,
      isActive: data.isActive,
      proposedAt: data.proposedAt,
    }
  },
}

export default gamesConverter
