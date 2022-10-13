interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  colPoints: {}
}

const generateGameConfig = (boardSize: number): IBaseGameConfig => {
  return {
    board: Array(boardSize).fill(''),
    rowPoints: {},
    colPoints: {},
  }
}

export default generateGameConfig
