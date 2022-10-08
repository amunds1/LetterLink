interface IBaseGameConfig {
  board: string[]
  rowPoints: {}
  colPoints: {}
}

const generateBoardList = (size: number) => Array(size).fill('')

const BASE_GAME_CONFIG: IBaseGameConfig = {
  board: generateBoardList(9),
  rowPoints: {},
  colPoints: {},
}

export default BASE_GAME_CONFIG
