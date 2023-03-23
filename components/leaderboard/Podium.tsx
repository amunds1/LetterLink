import { createStyles, Grid, Text, Image, Stack } from '@mantine/core'
import React from 'react'
import { LevelTreshold } from '../../constants/Levels'
import ProfileIcons, { IProfileIcon } from '../../constants/ProfileIcons'
import User from '../../types/User'

const useStyles = createStyles((theme) => ({
  first: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(255,215,0,0.2)' : 'gold',
  },
  secondth: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(192,192,192,0.2)' : 'silver',
  },
  third: {
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(205,127,50,0.2)' : '#CD7F32',
  },
  cell: {},
  grid: { width: '' },
  topCell: { borderRadius: '10px 10px 0 0' },
}))

const Podium = ({ players }: { players: Partial<User>[] }) => {
  const { classes } = useStyles()
  const ProfileIconsList: IProfileIcon = ProfileIcons

  return (
    <Grid className={classes.grid}>
      <Grid.Col span={4} className={classes.cell}></Grid.Col>
      <Grid.Col span={4}>
        {/* First place - name */}
        <Stack align="center" spacing="xs">
          <Image src={ProfileIconsList[players[0].name!]} width={50} />
          <Text align="center" weight="bold">
            1. {players[0].name}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}></Grid.Col>
      <Grid.Col span={4}>
        {/* Secondth place - name */}
        <Stack align="center" spacing="xs">
          <Image src={ProfileIconsList[players[1].name!]} width={50} />
          <Text align="center" weight="bold">
            2. {players[1].name}
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
          {players[0].experiencePoints} XP
        </Text>
        <Text align="center">
          Level {Math.floor(players[0].experiencePoints! / LevelTreshold + 1)}
        </Text>
      </Grid.Col>
      <Grid.Col span={4}>
        {/* Third place - name */}
        <Stack align="center" spacing="xs">
          <Image src={ProfileIconsList[players[2].name!]} width={50} />
          <Text align="center" weight="bold">
            3. {players[2].name}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={4} className={classes.secondth}>
        {/* Secondth place - points */}
        <Text align="center" weight="bold">
          {players[1].experiencePoints} XP
        </Text>
        <Text align="center">
          Level {Math.floor(players[1].experiencePoints! / LevelTreshold + 1)}
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
          {players[2].experiencePoints} XP
        </Text>

        <Text align="center">
          Level {Math.floor(players[2].experiencePoints! / LevelTreshold + 1)}
        </Text>
      </Grid.Col>
      <Grid.Col span={4} className={classes.secondth}></Grid.Col>
      <Grid.Col span={4} className={classes.first}></Grid.Col>
      <Grid.Col span={4} className={classes.third}></Grid.Col>
    </Grid>
  )
}

export default Podium
