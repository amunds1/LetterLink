import { Box, Button, Container, createStyles, Grid } from '@mantine/core'
import { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import LetterBox from '../components/LetterBox'
import CheckBoardRequestData, {
  AffectedColumn,
  AffectedRow,
} from '../pages/api/types/CheckBoardRequestData'
import validateBoard from '../utils/validateBoard'

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
    overflow: 'auto',
  },
  container: {
    padding: '50px',
  },
}))

const submitMove = async ({
  gameID,
  userID,
  board,
  row,
  column,
}: CheckBoardRequestData) => {
  const boardData: CheckBoardRequestData = {
    // Hent GameID
    gameID: gameID,
    // Hent userID
    userID: userID,
    // Hent hele brettet
    board: board,
    row: {
      // Hentet påvirket rad
      data: row.data,
      // Hent hvilken rad det var
      positionIndex: row.positionIndex,
      // Hent hvor i raden endringen skjedde
      differentIndex: row.differentIndex,
    },
    column: {
      // Hentet påvirket kolonne
      data: column.data,
      // Hent hvilken kolonne det var
      positionIndex: column.positionIndex,
      // Hen hvor i kolonnen endringen skjedde
      differentIndex: column.differentIndex,
    },
  }

  const r = await validateBoard(boardData)
  console.log(r)
}

interface IGameBoard {
  grid: {
    size: number
    values: string[]
  }
  gameID: string
  userID: string
}

const GameBoard = ({ grid, gameID, userID }: IGameBoard) => {
  const { classes } = useStyles()
  const [boardSize, setBoardSize] = useState<number>(grid.size)
  const [board, setBoard] = useState<string[]>(grid.values)
  const [affectedRow, setAffectedRow] = useState<AffectedRow>()
  const [affectedColumn, setAffectedColumn] = useState<AffectedColumn>()

  const [chosenLetter, setChosenLetter] = useState<string>('I')

  const addLetter = (list: string[], endIndex: number) => {
    const result = Array.from(list)
    result[endIndex] = chosenLetter
    setChosenLetter('')
    return result
  }

  const findAffectedRow = (
    boardSize: number,
    droppableID: number,
    newBoard: string[]
  ) => {
    // Hvilken rad
    const positionIndex = Math.floor(droppableID / boardSize)
    // Hvilken celle
    const differenceIndex = droppableID % boardSize
    // Dataen i raden
    const data = newBoard.slice(
      positionIndex * boardSize,
      positionIndex * boardSize + boardSize
    )

    const row = {
      data: data,
      positionIndex: positionIndex,
      differentIndex: differenceIndex,
    }
    return row
  }

  const findAffectedColumn = (
    boardSize: number,
    droppableID: number,
    newBoard: string[]
  ) => {
    const positionIndex = droppableID % boardSize
    const differenceIndex = Math.floor(droppableID / boardSize)
    const data: string[] = []

    for (let i = positionIndex; i < newBoard.length; i += boardSize) {
      data.push(newBoard[i])
    }

    const column = {
      data: data,
      positionIndex: positionIndex,
      differentIndex: differenceIndex,
    }
    return column
  }

  // TODO: send update gameboard to Firebase
  // TODO: either choose a new letter or get a message to wait for the other player to do a move
  const onDragEnd = (result: any) => {
    if (
      !result.destination ||
      result.destination.droppableId === 'letterStartBox'
    ) {
      return
    }
    console.log(result)
    const droppableID = Number(result.destination.droppableId)
    const newBoard: string[] = addLetter(board, droppableID)

    const row: AffectedRow = findAffectedRow(boardSize, droppableID, newBoard)
    const column: AffectedColumn = findAffectedColumn(
      boardSize,
      droppableID,
      newBoard
    )

    setAffectedRow(row)
    setAffectedColumn(column)
    setBoard(newBoard)
  }

  return (
    <Container className={classes.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ padding: '0 0 20px 0' }}>
          <Grid className={classes.grid} columns={grid.size}>
            {board.map((cellValue, index) => (
              <Grid.Col className={classes.col} key={index} span={1}>
                <>
                  {cellValue.length === 0 && (
                    <Droppable droppableId={index.toString()}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? 'MediumSeaGreen'
                              : 'white',
                            maxHeight: '40px',
                          }}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                  {cellValue.length !== 0 && (
                    <Box className={classes.cell}>{cellValue}</Box>
                  )}
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

      <Button
        onClick={() =>
          affectedRow &&
          affectedColumn &&
          submitMove({
            gameID,
            userID,
            board,
            row: affectedRow,
            column: affectedColumn,
          })
        }
      >
        Submit
      </Button>
    </Container>
  )
}

export default GameBoard
