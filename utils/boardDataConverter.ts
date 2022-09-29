import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import BoardData from '../types/BoardData'

const boardDataConverter: FirestoreDataConverter<BoardData> = {
  toFirestore(boardData: WithFieldValue<BoardData>): DocumentData {
    return {
      ...boardData,
    }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): BoardData {
    const data = snapshot.data(options)

    return {
      colPoints: data.colPoints,
      rowPoints: data.rowPoints,
      board: data.board,
    }
  },
}

export default boardDataConverter
