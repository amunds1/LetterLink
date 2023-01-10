import { Center, Container } from '@mantine/core'
import { useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'

/* 

  Demo of confetti animation that can be used after winning a game

*/
const Confetti = () => {
  const [isExploding, setIsExploding] = useState(false)
  return (
    <Center style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      {isExploding && (
        <ConfettiExplosion
          force={0.6}
          duration={8000}
          particleCount={100}
          height={1600}
          width={1600}
        />
      )}

      <button onClick={() => setIsExploding(true)}>True</button>
      <button onClick={() => setIsExploding(false)}>False</button>
    </Center>
  )
}

export default Confetti
