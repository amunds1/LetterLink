import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import User from '../../types/User'

const usersConverter: FirestoreDataConverter<User> = {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return { name: user.name }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      games: data.games,
      proposedGames: data.proposedGames,
      name: data.name,
    }
  },
}

export default usersConverter
