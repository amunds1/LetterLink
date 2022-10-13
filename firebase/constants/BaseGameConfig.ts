interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  colPoints: {}
}

const generateBoardList = (size: number) => Array(size).fill('')

const generateGameConfig = (boardSize: number): IBaseGameConfig => {
  return {
    board: generateBoardList(boardSize),
    rowPoints: {},
    colPoints: {},
  }
}

export default generateGameConfig
