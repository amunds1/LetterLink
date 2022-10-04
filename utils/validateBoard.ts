/* 
  Validate board against /api/check endpoint
*/

export interface IValidateBoardRequestData {
  gameID: string
  userID: string
  board: string[]
  row: RequestData
  column: RequestData
}

interface RequestData {
  data: string[]
  positionIndex: number
  differentIndex: number
}

export interface IValidateBoardResponseData {
  row: ResponseData
  column: ResponseData
}

interface ResponseData {
  positionIndex: number
  points: number
  wordPosition: number[]
  word: string
}

const validateBoard = async (validateBoardData: IValidateBoardRequestData) => {
  const response = await fetch('http://localhost:3000/api/check', {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(validateBoardData),
  })

  const data = await response.json()

  const dataParsed: IValidateBoardResponseData = { ...data }

  return dataParsed
}

export default validateBoard
