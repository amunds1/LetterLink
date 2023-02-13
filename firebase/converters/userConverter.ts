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
      games: data.games || null,
      proposedGames: data.proposedGames || null,
      name: data.name,
      experiencePoints: data.experiencePoints || 0,
      achievements: data.achievements || null,
      wins: data.wins || 0,
    }
  },
}

export default usersConverter
