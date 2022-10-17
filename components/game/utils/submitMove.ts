import CheckBoardRequestData from '../../../pages/api/types/CheckBoardRequestData'
import validateBoard from './validateBoard'

const submitMove = async ({
  gameID,
  userID,
  board,
  row,
  column,
}: CheckBoardRequestData) => {
  const boardData: CheckBoardRequestData = {
    gameID: gameID,
    userID: userID,
    board: board,
    row: {
      data: row.data,
      positionIndex: row.positionIndex,
      differentIndex: row.differentIndex,
    },
    column: {
      data: column.data,
      positionIndex: column.positionIndex,
      differentIndex: column.differentIndex,
    },
  }

  await validateBoard(boardData)
}

export default submitMove
