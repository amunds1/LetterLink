import { createStyles, Grid, Text, Image, Stack } from '@mantine/core'
import React from 'react'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
import { Player } from './mockData'

const useStyles = createStyles(() => ({
  first: { backgroundColor: 'gold' },
  secondth: { backgroundColor: 'silver' },
  third: { backgroundColor: '#CD7F32' },
  cell: {},
  grid: { width: '' },
  topCell: { borderRadius: '10px 10px 0 0' },
}))

const Podium = ({ players }: { players: Player[] }) => {
  const { classes } = useStyles()
  const ProfileIconsList: IProfileIcon = ProfileIcons

  return (
    <Grid className={classes.grid}>
      <Grid.Col span={4} className={classes.cell}></Grid.Col>
      <Grid.Col span={4}>
        {/* First place - name */}
        <Stack align="center" spacing="xs">
          <Image src={ProfileIconsList[players[0].username]} width={50} />
          <Text align="center" weight="bold">
            1. {players[0].username}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>
        {/* Secondth place - name */}
        <Stack align="center" spacing="xs">
          <Image src={ProfileIconsList[players[1].username]} width={50} />
          <Text align="center" weight="bold">
            2. {players[1].username}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col
        span={4}
        className={`${classes.first} ${classes.topCell}`}
      ></Grid.Col>
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col
        span={4}
        className={`${classes.secondth} ${classes.topCell}`}
      ></Grid.Col>
      <Grid.Col span={4} className={classes.first}>
        {/* First place - points */}
        <Text align="center" weight="bold">
          {players[0].points} XP
        </Text>
      </Grid.Col>
      <Grid.Col span={4}>
        {/* Third place - name */}
        <Stack align="center" spacing="xs">
          <Image src={ProfileIconsList[players[2].username]} width={50} />
          <Text align="center" weight="bold">
            3. {players[2].username}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={4} className={classes.secondth}>
        {/* Secondth place - name */}
        <Text align="center" weight="bold">
          {players[1].points} XP
        </Text>
      </Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col
        span={4}
        className={`${classes.third} ${classes.topCell}`}
      ></Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4} className={classes.third}>
        {/* Third place - points */}
        <Text align="center" weight="bold">
          {players[2].points} XP
        </Text>
      </Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4} className={classes.third}></Grid.Col>
    </Grid>
  )
}

export default Podium
