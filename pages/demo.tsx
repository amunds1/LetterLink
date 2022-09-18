import { Container, Grid } from '@mantine/core'
import { createStyles } from '@mantine/core'
import { GetServerSideProps } from 'next'

interface DatabaseTypes {
  grid: {
    size: number
    values: string[]
  }
}

const database: DatabaseTypes = {
  grid: {
    size: 5,
    values: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
    ],
  },
}

const useStyles = createStyles(() => ({
  container: { height: '100vh' },
  center: { height: '100vh' },
  cell: {
    backgroundColor: 'lightgreen',
    border: '0.5px solid grey',
  },
  grid: {
    border: '1px solid black',
    justify: 'center',
    align: 'center',
  },
}))

export const getServerSideProps: GetServerSideProps = async () => {
  const grid = database.grid

  return {
    props: { grid },
  }
}

const Demo = ({ grid }: DatabaseTypes) => {
  const { classes } = useStyles()

  return (
    <Grid className={classes.grid} columns={grid.size}>
      {grid.values.map((cellValue) => (
        <Grid.Col className={classes.cell} key={cellValue} span={1}>
          {cellValue}
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default Demo
