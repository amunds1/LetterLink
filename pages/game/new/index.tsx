import { Button, Radio, Select, Stack } from '@mantine/core'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Link from 'next/link'
import { useState } from 'react'
import addGameToCollection from '../../../components/game/firebase/addToGameCollection'
import { fetchUsersAsSelectOptions } from '../../../components/game/firebase/fetchUsersAsSelectOptions'
import fetchUID from '../../../firebase/fetchUID'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const uid = await fetchUID(ctx)
  const options = await fetchUsersAsSelectOptions(uid)

  return {
    props: { oponentOptions: options, uid: uid },
  }
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
