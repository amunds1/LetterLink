type CheckBoardRequestData = {
  gameID: string
  userID: string
  board: string[]
  row: {
    data: string[]
    positionIndex: number
    differentIndex: number
  }
  column: {
    data: string[]
    positionIndex: number
    differentIndex: number
  }
}

export default CheckBoardRequestData
