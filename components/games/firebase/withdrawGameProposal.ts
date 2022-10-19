import rejectProposedGame from './rejectProposedGame'

interface IWidthdrawGameProposal {
  userUID: string
  gameID: string
}

const withdrawGameProposal = ({ userUID, gameID }: IWidthdrawGameProposal) => {
  rejectProposedGame({
    gameID,
    userUID,
  })
}

export default withdrawGameProposal
