import { IValidWords } from '../interface/IvalidWords'
import { findRowPosition, findColumnPosition } from './findRoworColumnPosition'

const colorValidWordBorder = (
  index: number,
  boardSize: number,
  validWords: IValidWords[],
  dark: boolean
) => {
  const rowPosition = findRowPosition({ index, boardSize })
  const colPosition = findColumnPosition({ index, boardSize })

  for (let i: number = 0; i < validWords.length; i++) {
    // Red border is returned if:
    //    1. The cell has the same row number as the valid word
    //    2. The cell´s position in the row is inside the valid wordPosition interval
    if (
      validWords[i].direction == 'ROW' &&
      rowPosition.positionIndex == validWords[i].positionIndex &&
      rowPosition.differenceIndex >= validWords[i].wordPosition[0] &&
      rowPosition.differenceIndex <= validWords[i].wordPosition[1]
    ) {
      // Darkmode - red 4
      // Lightmode - red 6
      return dark ? 'darkValidWordBorder' : 'validWordBorder'
    }
    // Same (as above) for columns:
    if (
      validWords[i].direction == 'COLUMN' &&
      colPosition.positionIndex == validWords[i].positionIndex &&
      colPosition.differenceIndex >= validWords[i].wordPosition[0] &&
      colPosition.differenceIndex <= validWords[i].wordPosition[1]
    ) {
      // Darkmode - red 4
      // Lightmode - red 6
      return dark ? 'darkValidWordBorder' : 'validWordBorder'
    }
  }
  return ''
}

export default colorValidWordBorder
