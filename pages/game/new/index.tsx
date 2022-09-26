import { Button } from '@mantine/core'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from 'firebase/firestore'
import React from 'react'
import { db } from '../../../firebase/clientApp'
import gamesConverter from '../../../utils/gamesConverter'

const addGameToCollection = async (userDocID: string, oponentDocID: string) => {
  // Generate document refrences to document in users collection, of player and oponent
  const userDocRef = doc(db, `users/${userDocID}`)
  const oponentDocRef = doc(db, `users/${oponentDocID}`)

  const docRef = await addDoc(
    collection(db, 'games').withConverter(gamesConverter),
    {
      boardSize: 5,
      player1: {
        board: ['A', 'B', 'C'],
        user: userDocRef,
      },
      player2: {
        board: ['A', 'B', 'C'],
        user: oponentDocRef,
      },
    }
  )

  console.log('Created new game with id:', docRef.id)

  updateUserGamesList(docRef.id, userDocID)
  updateUserGamesList(docRef.id, oponentDocID)
}

const updateUserGamesList = async (gameID: string, userDocID: string) => {
  const usersRef = doc(db, `users/${userDocID}`)

  console.log(usersRef.id)

  await updateDoc(usersRef, {
    games: arrayUnion(gameID),
  })
}

const NewGame = () => {
  return (
    <Button
      onClick={() => {
        addGameToCollection(
          '5B7aHn9nPMbGj0RvapSacncvdDl1',
          'sGIx9y9A59NsDw726vKd0HXEDaJ3'
        )
      }}
    >
      Add new game
    </Button>
  )
}

export default NewGame
