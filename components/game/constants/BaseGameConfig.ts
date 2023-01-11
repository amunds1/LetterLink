interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  columnPoints: {}
  columnValidWords: {
    [key: number]: number[]
  }
  rowValidWords: {
    [key: number]: number[]
  }
}

const generateGameConfig = (boardSize: number): IBaseGameConfig => {
  return {
    board: Array(boardSize * boardSize).fill(''),
    rowPoints: {},
    columnPoints: {},
    columnValidWords: {
      0: Array(boardSize).fill(0),
      1: Array(boardSize).fill(0),
      2: Array(boardSize).fill(0),
      3: Array(boardSize).fill(0),
      4: Array(boardSize).fill(0),
      5: Array(boardSize).fill(0),
    },
    rowValidWords: {
      0: Array(boardSize).fill(0),
      1: Array(boardSize).fill(0),
      2: Array(boardSize).fill(0),
      3: Array(boardSize).fill(0),
      4: Array(boardSize).fill(0),
      5: Array(boardSize).fill(0),
    },
  }
}

export default generateGameConfig
