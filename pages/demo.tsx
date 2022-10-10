import GameBoard from '../components/GameBoard'
import { GetServerSideProps } from 'next'
import { resetServerContext } from 'react-beautiful-dnd'
import { DatabaseTypes } from '../interfaces/DatabaseTypes'

// TODO: get data from FireBase instead
const database: DatabaseTypes = {
  grid: {
    size: 5,
    values: [
      'D',
      '',
      'C',
      '',
      'E',
      'F',
      'G',
      '',
      'I',
      'J',
      'K',
      'L',
      'M',
      '',
      'O',
      'P',
      'Q',
      'R',
      '',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
    ],
  },
}

export const getServerSideProps: GetServerSideProps = async () => {
  resetServerContext()
  const grid = database.grid
  return {
    props: { grid },
  }
}

const Demo = () => {
  return <></>
}

export default Demo
