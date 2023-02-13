import CheckBoardResponseData from '../../../pages/api/types/CheckBoardResponseData'
import { IValidWords } from '../interface/IvalidWords'

const getValidWordsList = (res: CheckBoardResponseData) => {
  if (res.row && res.column) {
    return [
      { ...res.row, direction: 'ROW' },
      { ...res.column, direction: 'COLUMN' },
    ]
  }
  if (res.row) {
    return [{ ...res.row, direction: 'ROW' }]
  }
  if (res.column) {
    return [{ ...res.column, direction: 'COLUMN' }]
  }
  return null
}

export default getValidWordsList
