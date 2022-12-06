import { Center, createStyles, Grid, Text, Stack } from '@mantine/core'
import React from 'react'

const useStyles = createStyles(() => ({
  first: { backgroundColor: 'gold' },
  secondth: { backgroundColor: 'silver' },
  third: { backgroundColor: '#CD7F32' },
  cell: {},
  grid: { width: '' },
}))

const Podium = () => {
  const { classes } = useStyles()

  return (
    <Grid className={classes.grid}>
      <Grid.Col span={4} className={classes.cell}></Grid.Col>
      <Grid.Col span={4}>
        <Text align="center">Player 1</Text>
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>
        <Text align="center">Player 2</Text>
      </Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4}>
        <Text align="center">Player 3</Text>
      </Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4} className={classes.third}></Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4} className={classes.third}></Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4} className={classes.third}></Grid.Col>
    </Grid>
  )
}

export default Podium
