interface IGameBoard {
  grid: {
    size: number
    values: string[]
  }
  gameID: string
  userID: string
  colPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
  columnValidWords: {
    [key: number]: string[]
  }
  rowValidWords: {
    [key: number]: string[]
  }
}

export default IGameBoard
