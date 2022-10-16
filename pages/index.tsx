import { Center, createStyles, Text } from '@mantine/core'

const useStyles = createStyles(() => ({
  center: { height: '100%' },
}))

export default function Home() {
  const { classes } = useStyles()

  return (
    <Center className={classes.center}>
      <Text size={'xl'}>Welcome to the 5x5 game!</Text>
    </Center>
  )
}
