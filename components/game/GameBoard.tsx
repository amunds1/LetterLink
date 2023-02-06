import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Center,
} from '@mantine/core'
import { useContext, useEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { AffectedRowOrColumn } from '../../pages/api/types/CheckBoardRequestData'
import DraggableLetterBox from './DraggableLetterBox'
import GameStates from './types/gameStates'
import colorCellGreen from './utils/colorCellGreen'
import {
  findAffectedColumn,
  findAffectedRow,
} from './utils/findAffectedRowOrColumn'
import { GameContext } from './utils/gameContext'
import updateGameState from './utils/updateGameState'
import submitMove from './utils/submitMove'
import useSound from 'use-sound'

const useStyles = createStyles(() => ({
  grid: {
    border: '2px solid black',
  },
  col: {
    border: '1px solid grey',
    padding: '0px',
    fontSize: '30px',
  },
  container: {
    width: '80%',
  },
}))

const GameBoard = () => {
  const gameContext = useContext(GameContext)

  const { classes } = useStyles()
  const [boardSize, setBoardSize] = useState<number>(
    gameContext?.grid.size || 0
  )
  const [board, setBoard] = useState<string[]>(
    gameContext?.grid.values as string[]
  )
  const [affectedRow, setAffectedRow] = useState<AffectedRowOrColumn>()
  const [affectedColumn, setAffectedColumn] = useState<AffectedRowOrColumn>()

  // Regret move
  const [dropID, setDropID] = useState<number>()
  const [prevLetter, setPrevLetter] = useState<string>('')
  const [tempBoard, setTempBoard] = useState<string[]>([''])
  const [isLetterPlaced, setisLetterPlaced] = useState<boolean>(false)

  // Sound played when a letter is placed
  const [playPlaced] = useSound('/sounds/placeLetter.mp3')

  // Sound played when a move is submited
  const [playSubmit] = useSound('/sounds/select.wav', { volume: 0.1 })

  const addLetter = (
    board: string[],
    endIndex: number,
    selectedLetter: string | null
  ) => {
    selectedLetter ? selectedLetter : (selectedLetter = prevLetter)
    const newBoard = Array.from(board)
    newBoard[endIndex] = selectedLetter
    setPrevLetter(selectedLetter)
    setisLetterPlaced(true)
    gameContext!.setSelectedLetter(null)
    return newBoard
  }

  const onDragStart = () => {
    setisLetterPlaced(false)
  }

  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.droppableId === 'letterStartBox' ||
      !gameContext
    ) {
      return
    }
    playPlaced()
    const index = Number(result.destination.droppableId)
    // Used to place the letterbox inside the cell its dropped into
    setDropID(index)

    const newBoard: string[] = addLetter(
      board,
      index,
      gameContext.selectedLetter
    )
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
    playSubmit()
    setisLetterPlaced(false)
    if (tempBoard.length === boardSize ** 2 && gameContext) {
      affectedRow &&
        affectedColumn &&
        submitMove({
          gameID: gameContext.gameID,
          userID: gameContext.userUID,
          board: tempBoard,
          row: affectedRow,
          column: affectedColumn,
          userPoints: gameContext.userPoints,
        })
      setBoard(tempBoard)
      setTempBoard([''])

      updateGameState(gameContext)
    } else {
      // TODO: add as feeback messeage
      console.log('You have to place the letter')
    }
  }

  // Re-render board after response from /api/check
  useEffect(() => {}, [board])

  return (
    <>
      {gameContext && (
        <Container
          className={classes.container}
          style={{ padding: '0 0 20px 0' }}
        >
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <div>
              <Grid className={classes.grid} columns={gameContext.grid.size}>
                {board.map((cellValue, index) => (
                  <Grid.Col className={classes.col} key={index} span={1}>
                    <>
                      {/* Empty cells */}
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
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {/* DraggableLetterBox when its placed on the board */}
                              {dropID === index && (
                                <DraggableLetterBox
                                  letter={prevLetter}
                                  index={1}
                                ></DraggableLetterBox>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}

                      {/* Cells containing letters */}
                      {cellValue.length !== 0 && (
                        <Box
                          style={{
                            aspectRatio: '1',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: colorCellGreen(
                              index,
                              boardSize,
                              gameContext.rowValidWords,
                              gameContext.columnValidWords
                            ),
                          }}
                        >
                          <div
                            style={{
                              textAlign: 'center',
                              width: '100%',
                            }}
                          >
                            {cellValue}
                          </div>
                        </Box>
                      )}
                    </>
                  </Grid.Col>
                ))}
              </Grid>
            </div>
            {(gameContext.gameState === GameStates.PLACE_OWN ||
              gameContext.gameState === GameStates.PLACE_OPPONENTS) &&
              gameContext.yourTurn && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {}
                  <Droppable droppableId="letterStartBox">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          padding: '10px',
                          fontSize: '30px',
                        }}
                      >
                        {/* DraggableLetterBox that is not placed at the board */}
                        {gameContext.selectedLetter &&
                          gameContext.selectedLetter.length > 0 &&
                          !isLetterPlaced && (
                            <DraggableLetterBox
                              letter={gameContext.selectedLetter}
                              index={-1}
                            ></DraggableLetterBox>
                          )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )}
          </DragDropContext>

          {(gameContext.gameState === GameStates.PLACE_OWN ||
            gameContext.gameState === GameStates.PLACE_OPPONENTS) &&
            gameContext.yourTurn && (
              <Center>
                <Button
                  color="green"
                  disabled={!isLetterPlaced}
                  onClick={() => submit()}
                >
                  Submit
                </Button>
              </Center>
            )}
        </Container>
      )}
    </>
  )
}

export default GameBoard
