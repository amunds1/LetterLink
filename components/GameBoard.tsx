import { useState } from 'react'
import { Container, Grid, Box } from '@mantine/core'
import { createStyles } from '@mantine/core'
import LetterBox from '../components/LetterBox'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { DatabaseTypes } from '../interfaces/DatabaseTypes'

const useStyles = createStyles(() => ({
  grid: {
    border: '2px solid black',
  },
  col: {
    backgroundColor: 'white',
    border: '1px solid grey',
    textAlign: 'center',
  },
  cell: {
    padding: '10px',
  },
  container: {
    padding: '50px',
  },
}))

const GameBoard = ({ grid }: DatabaseTypes) => {
  const { classes } = useStyles()
  const [gridItems, setGridItems] = useState<string[]>(grid.values)
  const [chosenLetter, setChosenLetter] = useState<string>('B')

  const addLetter = (list: string[], endIndex: string) => {
    const result = Array.from(list)
    result[Number(endIndex)] = chosenLetter
    setChosenLetter('')
    return result
  }

  // TODO: send update gamebord to Firebase
  // TODO: either choose a new letter or get a message to wait for the other player to do a move
  const onDragEnd = (result: any) => {
    if (
      !result.destination ||
      result.destination.droppableId === 'letterStartBox'
    ) {
      return
    }
    const items: string[] = addLetter(gridItems, result.destination.droppableId)
    setGridItems(items)
  }

  return (
    <Container className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ padding: '0 0 20px 0' }}>
          <Grid className={classes.grid} columns={grid.size}>
            {gridItems.map((cellValue, index) => (
              <Grid.Col className={classes.col} key={index} span={1}>
                <>
                  {cellValue.length === 0 && (
                    <Droppable droppableId={index.toString()}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ backgroundColor: 'blue' }}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                  <Box className={classes.cell}>{cellValue}</Box>
                </>
              </Grid.Col>
            ))}
          </Grid>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Droppable droppableId="letterStartBox">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  padding: '10px',
                  width: 'fit-content',
                }}
              >
                {chosenLetter.length > 0 && (
                  <LetterBox letter={chosenLetter} index={-1}></LetterBox>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </Container>
  )
}

export default GameBoard
