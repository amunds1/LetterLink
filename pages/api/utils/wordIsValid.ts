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

  // Return true if word is an exact match
  if (data['cmatch'] == 1) {
    return true
  }

  /* 
    Return true if word is an inflected (bøyd) form of a valid word
    "tar" and "tok" returns cmatch = 0, but inflect = ["ta"], which is a valid word
  */
  if (data['inflect'].length > 0) {
    return true
  }

  return false
}

export default wordIsValid
