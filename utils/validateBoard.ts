/* 
  Validate board against /api/check endpoint
*/
import CheckBoardRequestData from '../pages/api/types/CheckBoardRequestData'
import CheckBoardResponseData from '../pages/api/types/CheckBoardResponseData'

const validateBoard = async (validateBoardData: CheckBoardRequestData) => {
  const response = await fetch('http://localhost:3000/api/check', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(validateBoardData),
  })

  const data = await response.json()

  const dataParsed: CheckBoardResponseData = { ...data }

  return dataParsed
}

export default validateBoard
