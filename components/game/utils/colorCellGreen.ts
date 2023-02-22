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
  },
  dark: boolean
) => {
  if (rowValidWords) {
    // rowPosition = { positionIndex, differenceIndex }
    // positionIndex -> rownumber
    // differenceIndex -> position in row
    const rowPosition = findRowPosition({ index, boardSize })
    if (isPartOfValidWord(rowPosition, rowValidWords)) {
      // darkmode - lime 9 50%
      // lightmode - lime 2
      return dark ? '#5C940D50' : '#D8F5A2'
    }
  }

  if (columnValidWords) {
    // colPosition = { positionIndex, differenceIndex }
    // positionIndex -> colnumber
    // differenceIndex -> position in col
    const colPosition = findColumnPosition({ index, boardSize })
    if (isPartOfValidWord(colPosition, columnValidWords)) {
      // darkmode - lime 9 50%
      // lightmode - lime 2
      return dark ? '#5C940D50' : '#D8F5A2'
    }
  }

  // darkmode - gray 8
  // lightmode - white
  return dark ? '#343A40' : 'white'
}

export default colorCellGreen
