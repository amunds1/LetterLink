interface IFindRowOrColumPosition {
  boardSize: number
  index: number
}

export const findRowPosition = ({
  index,
  boardSize,
}: IFindRowOrColumPosition) => {
  // Store affected row (0 is first row)
  const positionIndex = Math.floor(index / boardSize)
  // Store position of changed cell
  const differenceIndex = index % boardSize
  return { positionIndex, differenceIndex }
}

export const findColumnPosition = ({
  index,
  boardSize,
}: IFindRowOrColumPosition) => {
  // Store affected column (0 is first column)
  const positionIndex = index % boardSize
  // Store position of changed cell
  const differenceIndex = Math.floor(index / boardSize)
  return { positionIndex, differenceIndex }
}
