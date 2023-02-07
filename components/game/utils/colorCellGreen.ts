import { findRowPosition, findColumnPosition } from './findRoworColumnPosition'
import isPartOfValidWord from './isPartOfValidWord'

const colorCellGreen = (
  index: number,
  boardSize: number,
  rowValidWords: {
    [key: number]: number[]
  },
  columnValidWords: {
    [key: number]: number[]
  }
) => {
  if (rowValidWords) {
    // rowPosition = { positionIndex, differenceIndex }
    // positionIndex -> rownumber
    // differenceIndex -> position in row
    const rowPosition = findRowPosition({ index, boardSize })
    if (isPartOfValidWord(rowPosition, rowValidWords)) {
      return '#D8F5A2'
    }
  }

  if (columnValidWords) {
    // colPosition = { positionIndex, differenceIndex }
    // positionIndex -> colnumber
    // differenceIndex -> position in col
    const colPosition = findColumnPosition({ index, boardSize })
    if (isPartOfValidWord(colPosition, columnValidWords)) {
      return '#D8F5A2'
    }
  }

  return 'white'
}

export default colorCellGreen
