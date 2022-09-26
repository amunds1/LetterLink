import { Button, Select, SelectItem } from '@mantine/core'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { db } from '../../../firebase/clientApp'
import gamesConverter from '../../../utils/gamesConverter'
import usersConverter from '../../../utils/userConverter'

const addGameToCollection = async (userDocID: string, oponentDocID: string) => {
  // Generate document refrences to document in users collection, of player and oponent
  const userDocRef = doc(db, `users/${userDocID}`)
  const oponentDocRef = doc(db, `users/${oponentDocID}`)

  const docRef = await addDoc(
    collection(db, 'games').withConverter(gamesConverter),
    {
      boardSize: 6,
      player1: {
        board: ['', '', '', '', '', '', '', '', ''],
        user: userDocRef,
      },
      player2: {
        board: ['', '', '', '', '', '', '', '', ''],
        user: oponentDocRef,
      },
    }
  )

  updateUserGamesList(docRef.id, userDocID)
  updateUserGamesList(docRef.id, oponentDocID)
}

const updateUserGamesList = async (gameID: string, userDocID: string) => {
  const usersRef = doc(db, `users/${userDocID}`)

  await updateDoc(usersRef, {
    games: arrayUnion(gameID),
  })
}

export const getServerSideProps: GetServerSideProps = async () => {
  const options: (string | SelectItem)[] = []

  const q = query(
    collection(db, 'users'),
    where('name', '!=', 'Andreas')
  ).withConverter(usersConverter)

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((user) => {
    options.push({ value: user.data().id, label: user.data().name })
  })

  return {
    props: { oponentOptions: options },
  }
}

const NewGame = ({
  oponentOptions,
}: {
  oponentOptions: (string | SelectItem)[]
}) => {
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
            addGameToCollection('5B7aHn9nPMbGj0RvapSacncvdDl1', oponent)
        }}
      >
        Add new game
      </Button>
    </>
  )
}

export default NewGame
