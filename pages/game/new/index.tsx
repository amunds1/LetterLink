import { Button, Radio, Select, SelectItem, Stack } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { db } from '../../../firebase/clientApp'
import usersConverter from '../../../firebase/converters/userConverter'
import addGameToCollection from '../../../firebase/fetch/addToGameCollection'

export const getServerSideProps: GetServerSideProps = async () => {
  /*
   Generate array of name and id to be used as Select options
   Authenticated users is filtered out
  */
  const options: (string | SelectItem)[] = []

  const q = query(
    collection(db, 'users'),
    // FIXME Replace hardcoded id
    where(documentId(), '!=', '5B7aHn9nPMbGj0RvapSacncvdDl1')
  ).withConverter(usersConverter)

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((user) => {
    options.push({ value: user.data().id, label: user.data().name })
  })

  return {
    props: { oponentOptions: options },
  }
}

interface INewGame {
  oponentOptions: (string | SelectItem)[]
}

const NewGame = ({ oponentOptions }: INewGame) => {
  const [oponent, setOponent] = useState<string | null>(null)
  const [boardSize, setBoardSize] = useState<string>()

  const [userAuthData, loading, error] = useAuthState(getAuth(firebase))

  return (
    <Stack>
      {/* SELECT OPONENT */}
      <Select
        label="Select oponent"
        placeholder="Pick one oponent"
        value={oponent}
        onChange={setOponent}
        data={oponentOptions}
        searchable
        clearable
        withAsterisk
      />

      <Radio.Group
        value={boardSize}
        onChange={setBoardSize}
        name="desiredBoardSize"
        label="Select a board size"
        description=""
        withAsterisk
      >
        <Radio value={'3'} label="3 x 3" />
        <Radio value={'6'} label="6 x 6" />
        <Radio value={'9'} label="9 x 9" />
      </Radio.Group>

      <Button
        disabled={!oponent}
        onClick={() => {
          oponent &&
            userAuthData &&
            boardSize &&
            addGameToCollection(userAuthData.uid, oponent, boardSize)
        }}
      >
        Propose game
      </Button>
      <Link href="/games">
        <Button>Back to games list</Button>
      </Link>
    </Stack>
  )
}

export default NewGame
