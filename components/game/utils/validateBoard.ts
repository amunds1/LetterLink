/* 
  Validate board against /api/check endpoint
*/
import CheckBoardRequestData from '../../../pages/api/types/CheckBoardRequestData'
import CheckBoardResponseData from '../../../pages/api/types/CheckBoardResponseData'

const validateBoard = async (validateBoardData: CheckBoardRequestData) => {
  let apiURL = ''

  // Use different API URL depending on environment
  if (process.env.NODE_ENV === 'development') {
    apiURL = 'http://localhost:3000/api/check'
  } else {
    apiURL = 'https://www.letterlink.no/api/check'
  }

  const response = await fetch(apiURL, {
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
