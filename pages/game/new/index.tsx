import { Button, Radio, Select, SelectItem, Stack } from '@mantine/core'
import { getAuth } from 'firebase/auth'
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { db } from '../../../firebase/clientApp'
import usersConverter from '../../../firebase/converters/userConverter'
import addGameToCollection from '../../../components/game/firebase/addToGameCollection'
import { firebaseAdmin } from '../../../firebase/admin'
import nookies from 'nookies'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  // Retrieve uid of authenticated user
  const cookies = nookies.get(ctx)
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)
  const { uid } = token

  // Retrieve user documents of all users expect the authenticated one
  const q = query(
    collection(db, 'users'),
    where(documentId(), '!=', uid)
  ).withConverter(usersConverter)

  const querySnapshot = await getDocs(q)

  // Generate array of name and id to be used as Select options
  const options: (string | SelectItem)[] = []

  querySnapshot.forEach((user) => {
    options.push({ value: user.data().id, label: user.data().name })
  })

  return {
    props: { oponentOptions: options, uid: uid },
  }
}

interface INewGame {
  oponentOptions: (string | SelectItem)[]
}

const NewGame = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [oponent, setOponent] = useState<string | null>(null)
  const [boardSize, setBoardSize] = useState<string>()

  return (
    <Stack>
      {/* SELECT OPONENT */}
      <Select
        label="Select oponent"
        placeholder="Pick one oponent"
        value={oponent}
        onChange={setOponent}
        data={props.oponentOptions}
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
            props.uid &&
            boardSize &&
            addGameToCollection(props.uid, oponent, boardSize)
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
