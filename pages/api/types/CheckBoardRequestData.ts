type CheckBoardRequestData = {
  gameID: string
  userID: string
  board: string[]
  row: AffectedRow
  column: AffectedColumn
}

export type AffectedRow = {
  data: string[]
  positionIndex: number
  differentIndex: number
}

export type AffectedColumn = {
  data: string[]
  positionIndex: number
  differentIndex: number
}

export default CheckBoardRequestData
