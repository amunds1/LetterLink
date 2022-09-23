interface Game {
  boardSize: number
  player1: {
    board: string[]
    user: string
  }
  player2: {
    board: string[]
    user: string
  }
}

export default Game
