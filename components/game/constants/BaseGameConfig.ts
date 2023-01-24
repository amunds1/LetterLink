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
  const tempColumnValidWords: { [key: number]: number[] } = {}
  const tempRowValidWords: { [key: number]: number[] } = {}

  for (let i = 0; i < boardSize; i++) {
    tempColumnValidWords[i] = Array(boardSize).fill(0)
    tempRowValidWords[i] = Array(boardSize).fill(0)
  }

  return {
    board: Array(boardSize * boardSize).fill(''),
    rowPoints: {},
    columnPoints: {},
    columnValidWords: tempColumnValidWords,
    rowValidWords: tempRowValidWords,
  }
}

export default generateGameConfig
