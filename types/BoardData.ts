interface BoardData {
  columnPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
  board: string[]
  columnValidWords: {
    [key: number]: string[]
  }
  rowValidWords: {
    [key: number]: string[]
  }
}

export default BoardData
