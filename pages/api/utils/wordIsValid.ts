import { BASE_PARAMS, BASE_URL } from '../constants/OrdbokAPI'

// Checks if a word is valid against the Ordbok-API
const wordIsValid = async (word: string) => {
  // Add word as query param to params object
  const params = new URLSearchParams({
    ...BASE_PARAMS,
    q: word,
  })

  // Fetch from API
  const response = await fetch(BASE_URL + params)
  const data = await response.json()

  // Return true if word is valid, false otherwise
  return data['cmatch'] == 1
}

export default wordIsValid
