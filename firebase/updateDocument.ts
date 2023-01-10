import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore'

/**
 *
 * General all purpose function for updating documents in Firestore.
 *
 * @param docRef
 * @param data
 * @returns true
 */
const updateDocument = async (
  docRef: DocumentReference<DocumentData>,
  data: {
    [field: string]: string | number
  }
) => {
  await updateDoc(docRef, data)

  return true
}

export default updateDocument
