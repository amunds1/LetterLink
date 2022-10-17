interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  columnPoints: {}
}

const generateGameConfig = (boardSize: number): IBaseGameConfig => {
  return {
    board: Array(boardSize).fill(''),
    rowPoints: {},
    columnPoints: {},
  }
}

export default generateGameConfig
