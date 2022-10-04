/* 
  Validate board against /api/check endpoint
*/
import RequestData from '../pages/api/types/RequestData'
import ResponseData from '../pages/api/types/ResponseData'

const validateBoard = async (validateBoardData: RequestData) => {
  const response = await fetch('http://localhost:3000/api/check', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(validateBoardData),
  })

  const data = await response.json()

  const dataParsed: ResponseData = { ...data }

  return dataParsed
}

export default validateBoard
