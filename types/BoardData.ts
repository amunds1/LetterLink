interface BoardData {
  columnPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
  board: string[]
  columnValidWords: {
    [key: number]: number[]
  }
  rowValidWords: {
    [key: number]: number[]
  }
}

export default BoardData
