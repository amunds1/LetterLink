import { Button, Select, SelectItem } from '@mantine/core'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { db } from '../../../firebase/clientApp'
import addGameToCollection from '../../../firebase/fetch/addToGameCollection'
import usersConverter from '../../../utils/userConverter'

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

  return (
    <>
      <Select
        label="Select oponent"
        placeholder="Pick one oponent"
        value={oponent}
        onChange={setOponent}
        data={oponentOptions}
        searchable
        clearable
      />
      <Button
        disabled={!oponent}
        onClick={() => {
          oponent &&
            // FIXME Replace hardcoded user UID
            addGameToCollection('5B7aHn9nPMbGj0RvapSacncvdDl1', oponent)
        }}
      >
        Add new game
      </Button>
    </>
  )
}

export default NewGame
