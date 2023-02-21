import { Box } from '@mantine/core'
import { createStyles } from '@mantine/core'
import { Draggable } from 'react-beautiful-dnd'

const useStyles = createStyles(() => ({
  cell: {
    textAlign: 'center',
    width: '100%',
    aspectRatio: '1',
  },
}))

const DraggableLetterBox = (props: { letter: String; index: number }) => {
  const { classes } = useStyles()

  return (
    <Draggable draggableId="draggable-1" index={props.index}>
      {(provided, snapshot) => (
        <>
          {/* Box outside board */}
          {props.index === -1 && (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={classes.cell}
              style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '50px',
                border: snapshot.isDragging
                  ? '2px solid black'
                  : '2px solid grey',
                ...provided.draggableProps.style,
              }}
            >
              <div>{props.letter}</div>
            </Box>
          )}
          {/* Box placed at the board */}
          {props.index >= 0 && (
            <Box
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={classes.cell}
              style={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: snapshot.isDragging
                  ? '2px solid black'
                  : '3px solid #74B816',
                ...provided.draggableProps.style,
              }}
            >
              <div>{props.letter}</div>
            </Box>
          )}
        </>
      )}
    </Draggable>
  )
}

export default DraggableLetterBox
