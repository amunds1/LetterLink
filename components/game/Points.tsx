import { useEffect, useState, useContext } from 'react'
import { GameContext } from './utils/gameContext'

const Points = () => {
  const [points, setPoints] = useState<number>(0)

  const gameContext = useContext(GameContext)

  useEffect(() => {
    let sumPoints = 0
    if (gameContext) {
      for (const [key, value] of Object.entries(gameContext.columnPoints)) {
        sumPoints += value
      }
      for (const [key, value] of Object.entries(gameContext.rowPoints)) {
        sumPoints += value
      }
    }

    setPoints(sumPoints)
  }, [gameContext])

  return (
    <div>
      <p>Your points: {points}</p>
    </div>
  )
}

export default Points
