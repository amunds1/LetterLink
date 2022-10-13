import { findColumnPosition, findRowPosition } from './findRoworColumnPosition'

interface IfindAffectedRowOrColumn {
  boardSize: number
  index: number
  newBoard: string[]
}

export const findAffectedRow = ({
  boardSize,
  index,
  newBoard,
}: IfindAffectedRowOrColumn) => {
  // Find row position
  const { positionIndex, differenceIndex } = findRowPosition({
    index,
    boardSize,
  })

  // Extract data
  const data = newBoard.slice(
    positionIndex * boardSize,
    positionIndex * boardSize + boardSize
  )

  return {
    data: data,
    positionIndex: positionIndex,
    differentIndex: differenceIndex,
  }
}

export const findAffectedColumn = ({
  boardSize,
  index,
  newBoard,
}: IfindAffectedRowOrColumn) => {
  // Find col position
  const { positionIndex, differenceIndex } = findColumnPosition({
    index,
    boardSize,
  })

  // Extract data
  const data: string[] = []
  for (let i = positionIndex; i < newBoard.length; i += boardSize) {
    data.push(newBoard[i])
  }

  return {
    data: data,
    positionIndex: positionIndex,
    differentIndex: differenceIndex,
  }
}
