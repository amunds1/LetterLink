import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore'
import BoardData from '../../types/BoardData'

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
      columnPoints: data.colPoints,
      rowPoints: data.rowPoints,
      board: data.board,
      rowValidWords: data.rowValidWords || null,
      columnValidWords: data.columnValidWords || null,
    }
  },
}

export default boardDataConverter
