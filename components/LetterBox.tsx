import { Box } from '@mantine/core'
import { createStyles } from '@mantine/core'
import { Draggable } from 'react-beautiful-dnd'

const useStyles = createStyles(() => ({
  cell: {
    textAlign: 'center',
    width: 'fit-content',
    padding: '10px 20px 10px 20px',
  },
}))

const LetterBox = (props: { letter: String; index: number }) => {
  const { classes } = useStyles()

  return (
    <Draggable draggableId="draggable-1" index={props.index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.cell}
          style={{
            backgroundColor: 'white',
            border: snapshot.isDragging ? '2px solid black' : '2px solid grey',
            ...provided.draggableProps.style,
          }}
        >
          {props.letter}
        </Box>
      )}
    </Draggable>
  )
}

export default LetterBox
