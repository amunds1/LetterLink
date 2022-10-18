interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  columnPoints: {}
}

const generateGameConfig = (boardSize: number): IBaseGameConfig => {
  return {
    board: Array(boardSize * boardSize).fill(''),
    rowPoints: {},
    columnPoints: {},
  }
}

export default generateGameConfig
