import { Box, Button, Container, createStyles, Grid } from '@mantine/core'
import { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import LetterBox from './LetterBox'
import CheckBoardRequestData, {
  AffectedRowOrColumn,
} from '../../pages/api/types/CheckBoardRequestData'
import {
  findAffectedColumn,
  findAffectedRow,
} from './utils/findAffectedRowOrColumn'
import {
  findColumnPosition,
  findRowPosition,
} from './utils/findRoworColumnPosition'

import validateBoard from './utils/validateBoard'

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
  cellValid: {
    backgroundColor: 'green',
    padding: '10px',
    overflow: 'auto',
  },
  container: {
    padding: '50px',
  },
}))

type rowOrColPosition = {
  positionIndex: Number
  differenceIndex: Number
}

const isPartOfValidWord = (position: rowOrColPosition, validWords: Object) => {
  for (const [key, value] of Object.entries(validWords)) {
    if (Number(key) === position.positionIndex) {
      if (
        position.differenceIndex >= value[0] &&
        position.differenceIndex < value[1]
      ) {
        return true
      }
    }
  }
  return false
}

const colorCellGreen = (
  index: number,
  boardSize: number,
  rowValidWords: object,
  columnValidWords: object
) => {
  if (rowValidWords) {
    // rowPosition = { positionIndex, differenceIndex }
    // positionIndex -> rownumber
    // differenceIndex -> position in row
    const rowPosition = findRowPosition({ index, boardSize })
    if (isPartOfValidWord(rowPosition, rowValidWords)) {
      return 'green'
    }
  }

  if (columnValidWords) {
    // colPosition = { positionIndex, differenceIndex }
    // positionIndex -> colnumber
    // differenceIndex -> position in col
    const colPosition = findColumnPosition({ index, boardSize })
    if (isPartOfValidWord(colPosition, columnValidWords)) {
      return 'green'
    }
  }

  return 'white'
}

const submitMove = async ({
  gameID,
  userID,
  board,
  row,
  column,
}: CheckBoardRequestData) => {
  console.log('Board')
  console.log(board)
  const boardData: CheckBoardRequestData = {
    gameID: gameID,
    userID: userID,
    board: board,
    row: {
      data: row.data,
      positionIndex: row.positionIndex,
      differentIndex: row.differentIndex,
    },
    column: {
      data: column.data,
      positionIndex: column.positionIndex,
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
  colPoints: {
    [key: number]: number
  }
  rowPoints: {
    [key: number]: number
  }
  columnValidWords: {
    [key: number]: string[]
  }
  rowValidWords: {
    [key: number]: string[]
  }
}

const GameBoard = ({
  grid,
  gameID,
  userID,
  colPoints,
  rowPoints,
  columnValidWords,
  rowValidWords,
}: IGameBoard) => {
  const { classes } = useStyles()
  const [boardSize, setBoardSize] = useState<number>(grid.size)
  const [board, setBoard] = useState<string[]>(grid.values)
  const [affectedRow, setAffectedRow] = useState<AffectedRowOrColumn>()
  const [affectedColumn, setAffectedColumn] = useState<AffectedRowOrColumn>()
  const [chosenLetter, setChosenLetter] = useState<string>('I')

  // Regret move
  const [dropID, setDropID] = useState<number>()
  const [prevLetter, setPrevLetter] = useState<string>('')
  const [tempBoard, setTempBoard] = useState<string[]>([''])

  const addLetter = (
    board: string[],
    endIndex: number,
    chosenLetter: string
  ) => {
    chosenLetter.length === 0 ? (chosenLetter = prevLetter) : null
    const newBoard = Array.from(board)
    newBoard[endIndex] = chosenLetter
    setPrevLetter(chosenLetter)
    setChosenLetter('')
    return newBoard
  }

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.droppableId === 'letterStartBox'
    ) {
      return
    }
    const index = Number(result.destination.droppableId)
    // Used to place the letterbox inside the cell its dropped into
    setDropID(index)

    const newBoard: string[] = addLetter(board, index, chosenLetter)
    setTempBoard(newBoard)

    const row: AffectedRowOrColumn = findAffectedRow({
      boardSize,
      index: index,
      newBoard,
    })

    const column: AffectedRowOrColumn = findAffectedColumn({
      boardSize,
      index: index,
      newBoard,
    })

    setAffectedRow(row)
    setAffectedColumn(column)
  }

  const submit = () => {
    if (tempBoard.length === boardSize ** 2) {
      affectedRow &&
        affectedColumn &&
        submitMove({
          gameID,
          userID,
          board: tempBoard,
          row: affectedRow,
          column: affectedColumn,
        })
      setBoard(tempBoard)
      setTempBoard([''])
    } else {
      // TODO: add as feeback messeage
      console.log('You have to place the letter')
    }
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
                          {dropID === index && (
                            <LetterBox
                              letter={prevLetter}
                              index={1}
                            ></LetterBox>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )}
                  {cellValue.length !== 0 && (
                    <Box
                      className={classes.cell}
                      style={{
                        backgroundColor: colorCellGreen(
                          index,
                          boardSize,
                          rowValidWords,
                          columnValidWords
                        ),
                      }}
                    >
                      {cellValue}
                    </Box>
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

      <Button onClick={() => submit()}>Submit</Button>
    </Container>
  )
}

export default GameBoard
