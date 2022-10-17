import Game from '../../../types/Game'

const yourTurn = (game: Game, uid: string) => game.nextTurn.id === uid

export default yourTurn
