type RequestData = {
  gameID: string
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
