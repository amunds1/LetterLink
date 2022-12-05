import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PageLinks from '../constants/PageLinks'
import ColorSchemeToggle from './ColorSchemeToggle'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}))

export function PageHeader() {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes, cx } = useStyles()

  const router = useRouter()

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Link
          href={'/'}
          className={classes.link}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Text>5x5 game</Text>
        </Link>
        <Group spacing={5} className={classes.links}>
          {/* GAMES LINK */}
          <Link
            href={PageLinks.GAMES.link}
            key={PageLinks.GAMES.label}
            className={`${classes.link} ${
              router.pathname === '/games' && classes.linkActive
            }`}
          >
            {PageLinks.GAMES.label}
          </Link>
          {/* PROFILE LINK */}
          <Link
            href={PageLinks.PROFILE.link}
            key={PageLinks.PROFILE.label}
            className={`${classes.link} ${
              router.pathname === '/profile' && classes.linkActive
            }`}
          >
            {PageLinks.PROFILE.label}
          </Link>
          {/* ACHIEVEMENTS LINK */}
          <Link
            href={PageLinks.ACHIEVEMENTS.link}
            key={PageLinks.ACHIEVEMENTS.label}
            className={`${classes.link} ${
              router.pathname === '/achievements' && classes.linkActive
            }`}
          >
            {PageLinks.ACHIEVEMENTS.label}
          </Link>
          {/* LEADERBOARD LINK */}
          <Link
            href={PageLinks.LEADERBOARD.link}
            key={PageLinks.LEADERBOARD.label}
            className={`${classes.link} ${
              router.pathname === '/leaderboard' && classes.linkActive
            }`}
          >
            {PageLinks.LEADERBOARD.label}
          </Link>
          {/* SIGN IN LINK */}
          <Link
            href={PageLinks.SIGNIN.link}
            key={PageLinks.SIGNIN.label}
            className={`${classes.link} ${
              router.pathname === '/signin' && classes.linkActive
            }`}
          >
            {PageLinks.SIGNIN.label}
          </Link>
          {/* SIGN OUT LINK */}
          <Link
            href={PageLinks.SIGNOUT.link}
            key={PageLinks.SIGNOUT.label}
            className={`${classes.link} ${
              router.pathname === '/signout' && classes.linkActive
            }`}
          >
            {PageLinks.SIGNOUT.label}
          </Link>
          <ColorSchemeToggle />
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  )
}
