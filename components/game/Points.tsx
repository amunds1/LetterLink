import { useEffect, useState } from 'react'

interface pointsData {
  columnPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
}

const Points = ({ columnPoints, rowPoints }: pointsData) => {
  const [points, setPoints] = useState<number>(0)

  useEffect(() => {
    let sumPoints = 0
    if (columnPoints) {
      for (const [key, value] of Object.entries(columnPoints)) {
        sumPoints += value
      }
    }
    if (rowPoints) {
      for (const [key, value] of Object.entries(rowPoints)) {
        sumPoints += value
      }
    }
    setPoints(sumPoints)
  })

  return (
    <div>
      <p>Your points: {points}</p>
    </div>
  )
}

export default Points
