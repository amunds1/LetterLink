import type { NextPage } from "next";
import { Button, Grid, Container } from "@mantine/core";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  button: {
    backgroundColor: "teal",
  },
  cell: {
    backgroundColor: "blue",
  },
}));

const Demo: NextPage = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Button className={classes.button}>Click me</Button>

      <Container size="sm" px="xs">
        <Grid>
          <Grid.Col className={classes.cell} span={4}>
            A
          </Grid.Col>
          <Grid.Col span={4}>B</Grid.Col>
          <Grid.Col span={4}>C</Grid.Col>
          <Grid.Col span={4}>D</Grid.Col>
          <Grid.Col span={4}>E</Grid.Col>
          <Grid.Col span={4}>F</Grid.Col>
          <Grid.Col span={4}>G</Grid.Col>
          <Grid.Col span={4}>H</Grid.Col>
          <Grid.Col span={4}>I</Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Demo;
