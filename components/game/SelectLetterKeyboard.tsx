import { Button, Group } from '@mantine/core'
import { useState } from 'react'

const SelectLetterKeyboard = () => {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'æ',
    'ø',
    'å',
  ]

  const [selectedLetter, setSelectedLetter] = useState()

  return (
    <>
      <Group
        spacing="xs"
        position="center"
        pt="lg"
        style={{ position: 'relative' }}
      >
        {alphabet.map((letter) => (
          <Button size="xs" key={letter} color="gray" style={{}}>
            {letter}
          </Button>
        ))}
      </Group>
    </>
  )
}

export default SelectLetterKeyboard
