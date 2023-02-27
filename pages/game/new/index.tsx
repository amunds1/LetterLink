import {
  Avatar,
  Button,
  Group,
  Radio,
  Select,
  SelectItem,
  Stack,
  Text,
} from '@mantine/core'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { forwardRef, useState } from 'react'
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

interface INewGame {
  oponentOptions: (string | SelectItem)[]
  uid: string
}

const NewGame = (props: INewGame) => {
  const { oponentOptions, uid } = props

  const [oponent, setOponent] = useState<string | null>(null)
  const [boardSize, setBoardSize] = useState<string | undefined>(undefined)

  const [buttonLoadingSpinner, setButtonLoadingSpinner] = useState(false)

  const router = useRouter()

  const onClick = async () => {
    setButtonLoadingSpinner(true)
    addGameToCollection(uid, oponent as string, boardSize as string).then(
      () => {
        router.push('/')
        setButtonLoadingSpinner(false)
      }
    )
  }

  interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string
    label: string
    description: string
  }

  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  )

  return (
    <Stack>
      {/* SELECT OPONENT */}
      <Select
        label="Select an opponent"
        required
        placeholder=""
        itemComponent={SelectItem}
        data={oponentOptions}
        onChange={setOponent}
        searchable
        maxDropdownHeight={400}
        nothingFound="Could not find any users matching your search"
        filter={(value, item) =>
          item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
          item?.description?.toLowerCase().includes(value.toLowerCase().trim())
        }
      />

      <Radio.Group
        value={boardSize}
        onChange={setBoardSize}
        name="desiredBoardSize"
        label="Select a board size"
        description=""
        withAsterisk
      >
        <Radio value="3" label="3 x 3" color="cyan" />
        <Radio value="4" label="4 x 4" color="cyan" />
        <Radio value="5" label="5 x 5" color="cyan" />
        <Radio value="6" label="6 x 6" color="cyan" />
      </Radio.Group>

      <Button
        color="cyan"
        variant="light"
        disabled={!oponent || !boardSize?.length}
        loading={buttonLoadingSpinner}
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
