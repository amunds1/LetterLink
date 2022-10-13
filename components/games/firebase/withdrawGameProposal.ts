import { DocumentData, DocumentReference } from 'firebase/firestore'
import rejectProposedGame from './rejectProposedGame'

interface IWidthdrawGameProposal {
  userRef: DocumentReference<DocumentData>
  gameID: string
}

const withdrawGameProposal = ({ userRef, gameID }: IWidthdrawGameProposal) => {
  rejectProposedGame({
    gameID,
    userRef,
  })
}

export default withdrawGameProposal
