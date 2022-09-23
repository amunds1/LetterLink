import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import User from '../types/User'

const usersConverter: FirestoreDataConverter<User> = {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return { name: user.name }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    console.log('Userid', snapshot.id)

    return {
      id: snapshot.id,
      games: data.games,
      name: data.name,
    }
  },
}

export default usersConverter
