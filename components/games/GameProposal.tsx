import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { IconBan, IconCircleCheck, IconCircleX } from '@tabler/icons'
import { doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
import { db } from '../../firebase/clientApp'
import usersConverter from '../../firebase/converters/userConverter'
import Game from '../../types/Game'
import acceptProposedGame from './firebase/acceptProposedGame'
import rejectProposedGame from './firebase/rejectProposedGame'
import withdrawGameProposal from './firebase/withdrawGameProposal'
import selectUserID from './utils/selectUserID'
import formatDistance from 'date-fns/formatDistance'

interface IGameProposal {
  game: Game
  userUID: string
}

const GameProposal = ({ game, userUID }: IGameProposal) => {
  // Darkmode
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  // Fetch opponent data to get name
  const [opponent, loading, error] = useDocumentDataOnce(
    doc(
      db,
      'users',
      selectUserID(userUID, game.playerOne as string, game.playerTwo as string)
    ).withConverter(usersConverter)
  )
  const ProfileIconsList: IProfileIcon = ProfileIcons

  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <Group position="apart" mt="xs" ml="xs">
        <Group position="left">
          {opponent?.name && <Avatar src={ProfileIconsList[opponent?.name]} />}
          {!opponent?.name && <Avatar src={ProfileIconsList['Unknown']} />}
          <Text weight="bold"> {opponent?.name}</Text>
          <Text>
            {game.boardSize}x{game.boardSize}
          </Text>
        </Group>
        <Badge color="orange" variant="light">
          {formatDistance(new Date(game.proposedAt as Date), new Date())} ago
        </Badge>
      </Group>

      {userUID != (game.proposedBy as string) && (
        <>
          {/* ACCEPT PROPOSAL BUTTON */}
          <Grid>
            <Grid.Col span="auto">
              <Button
                onClick={async () => {
                  await acceptProposedGame({
                    gameID: game.id!,
                    userUID: game.playerOne as string,
                  })
                  await acceptProposedGame({
                    gameID: game.id!,
                    userUID: game.playerTwo as string,
                  })
                }}
                variant="light"
                fullWidth
                color="lime"
                mt="md"
                radius="md"
                leftIcon={
                  <IconCircleCheck color={dark ? '#D8F5A2' : '#82C91E'} />
                }
                style={{ border: '1px solid #D8F5A2' }}
              >
                Accept
              </Button>
            </Grid.Col>
            <Grid.Col span="auto">
              {/* REJECT PROPOSAL BUTTON */}
              <Button
                variant="light"
                fullWidth
                color="red"
                mt="md"
                radius="md"
                leftIcon={<IconBan color={dark ? '#FFC9C9' : '#FA5252'} />}
                style={{ border: '1px solid #FFC9C9' }}
                onClick={async () => {
                  await rejectProposedGame({
                    gameID: game.id!,
                    userUID: game.playerOne as string,
                  })
                  await rejectProposedGame({
                    gameID: game.id!,
                    userUID: game.playerTwo as string,
                  })
                }}
              >
                Reject
              </Button>
            </Grid.Col>
          </Grid>
        </>
      )}

      {userUID === game.proposedBy && (
        <Button
          onClick={async () => {
            await withdrawGameProposal({
              gameID: game.id!,
              userUID: game.playerOne as string,
            })
            await withdrawGameProposal({
              gameID: game.id!,
              userUID: game.playerTwo as string,
            })
          }}
          variant="light"
          color="red"
          fullWidth
          mt="md"
          radius="md"
          leftIcon={<IconCircleX color={dark ? '#FFC9C9' : '#FA5252'} />}
          style={{ border: '1px solid #FFC9C9' }}
        >
          Withdraw proposal
        </Button>
      )}
    </Card>
  )
}

export default GameProposal
