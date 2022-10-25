import wordIsValid from './wordIsValid'

const findStartAndEndIndex = (data: string[], differentIndex: number) => {
  let startIndex = differentIndex
  let endIndex = differentIndex

  // differentIndex ->
  for (let i = differentIndex; i < data.length + 1; i++) {
    endIndex = i
    if (data[i] === '') {
      endIndex = i - 1
      break
    }
  }

  // <- differentIndex
  for (let i = differentIndex; i >= 0; i--) {
    startIndex = i
    if (data[i] === '') {
      startIndex = i + 1
      break
    }
  }

  return [startIndex, endIndex]
}

const newCheckRowOrColumn = async (data: string[], differentIndex: number) => {
  // Finn start og end Index
  // inputArray = ['P', '', 'P', 'A', 'I', '']
  // startIndex = 2
  // endIndex = 4
  // differentIndex = 3

  console.log('Data', data)

  const [startIndex, endIndex] = findStartAndEndIndex(data, differentIndex)

  console.log(startIndex, endIndex)

  const tempValidWord = {
    word: '',
    points: 0,
    // Brukes av /api/check
    position: [0, 0],
  }

  let checknum = 0
  // For each cellIndex in input array including up to differentIndex:
  for (let i = startIndex; i <= differentIndex; i++) {
    console.log('\nYtre løkke  i =', i)
    const maxPossiblePoints = endIndex - i + 1
    console.log('MaxPossiblePoints', maxPossiblePoints)

    for (let k = endIndex; k >= differentIndex; k--) {
      console.log('Indre løkke  k =', k)

      checknum++

      console.log('\nCheck:', checknum)

      // Join cells to a word
      const joinedWord = data.slice(i, k + 1).join('')
      const joinedWordLength = joinedWord.length

      if (joinedWordLength == 1) {
        break
      }

      console.log('joinedWord:', joinedWord, 'with length', joinedWordLength)

      const res = await wordIsValid(joinedWord)

      if (res) {
        tempValidWord.word = joinedWord
        tempValidWord.points = joinedWordLength
        tempValidWord.position = [i, k]

        console.log(
          'Valid word:',
          tempValidWord.word,
          ' worth',
          tempValidWord.points,
          ' points'
        )

        if (joinedWordLength >= maxPossiblePoints - 1) {
          return tempValidWord
        }
      }
    }
  }

  if (tempValidWord.word.length >= 1) {
    return tempValidWord
  }

  return null
}

export default newCheckRowOrColumn
