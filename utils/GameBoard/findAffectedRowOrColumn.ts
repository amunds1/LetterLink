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
  // Store affected row (0 is first row)
  const positionIndex = Math.floor(index / boardSize)
  // Store position of changed cell
  const differenceIndex = index % boardSize
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
  const positionIndex = index % boardSize
  const differenceIndex = Math.floor(index / boardSize)
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
