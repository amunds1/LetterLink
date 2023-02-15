import { Button, Radio, Select, SelectItem, Stack, Text } from '@mantine/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import addGameToCollection from '../../../components/game/firebase/addToGameCollection'
import { fetchUsersAsSelectOptions } from '../../../components/game/firebase/fetchUsersAsSelectOptions'
import fetchUID from '../../../firebase/fetchUID'
import BackToGamesButton from '../../../components/games/BackToGamesButton'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const uid = await fetchUID(ctx)
  const options = await fetchUsersAsSelectOptions(uid)

  return {
    props: { oponentOptions: options, uid: uid },
  }
}

interface INewGame {
  oponentOptions: (string | SelectItem)[]
  uid: string
}

const NewGame = (props: INewGame) => {
  const { oponentOptions, uid } = props

  const [oponent, setOponent] = useState<string | null>(null)
  const [boardSize, setBoardSize] = useState<string | undefined>(undefined)

  const router = useRouter()

  const onClick = async () => {
    addGameToCollection(uid, oponent as string, boardSize as string).then(
      () => {
        router.push('/')
      }
    )
  }

  return (
    <Stack>
      {/* Back to games button */}
      <BackToGamesButton />
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
        <Radio value="2" label="2 x 2" color="cyan" />
        <Radio value="3" label="3 x 3" color="cyan" />
        <Radio value="4" label="4 x 4" color="cyan" />
        <Radio value="4" label="5 x 5" color="cyan" />
        <Radio value="6" label="6 x 6" color="cyan" />
      </Radio.Group>

      <Button
        color="cyan"
        variant="light"
        disabled={!oponent || !boardSize?.length}
        onClick={() => onClick()}
        style={
          oponent && boardSize?.length
            ? { border: '1px solid #99E9F2' }
            : { border: '1px solid #CED4DA' }
        }
      >
        <Text color={oponent && boardSize?.length ? 'cyan.8' : 'gray.5'}>
          Propose game
        </Text>
      </Button>
    </Stack>
  )
}

export default NewGame
