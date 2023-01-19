import { Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import Game from '../../types/Game'
import { fetchUserData } from '../profile/firebase/fetchUserData'
import selectUserID from './utils/selectUserID'

interface IOponent {
  userUID: string
  game: Game
}

const Oponent = ({ userUID, game }: IOponent) => {
  const [opponentName, setOpponentName] = useState('')

  useEffect(() => {
    async function fetchData() {
      const oponentID = selectUserID(
        userUID,
        game.playerOne as string,
        game.playerTwo as string
      )

      const userData = await fetchUserData(oponentID)
      setOpponentName(userData?.name as string)
    }

    fetchData()
  }, [game.playerOne, game.playerTwo, userUID])

  return <Text>Against {opponentName}</Text>
}

export default Oponent
