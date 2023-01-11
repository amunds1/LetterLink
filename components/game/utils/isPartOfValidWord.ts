const isPartOfValidWord = (
  position: {
    positionIndex: number
    differenceIndex: number
  },
  validWords: {
    [key: number]: number[]
  }
) => {
  const data = validWords[position.positionIndex]

  if (data[position.differenceIndex] === 1) {
    return true
  }

  return false
}

export default isPartOfValidWord
