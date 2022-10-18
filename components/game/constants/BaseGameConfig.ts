interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  columnPoints: {}
}

const generateGameConfig = (boardSize: number): IBaseGameConfig => {
  return {
    board: Array(boardSize ^ 2).fill(''),
    rowPoints: {},
    columnPoints: {},
  }
}

export default generateGameConfig
