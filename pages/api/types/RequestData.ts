type RequestData = {
  gameID: string
  userID: string
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

export default RequestData
