import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Header,
  Popover,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import PageLinks from '../constants/PageLinks'

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

  leftSigninButton: {
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

  const [authenticated, setAuthenticated] = useState(true)

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
          {authenticated && (
            <>
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
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <ActionIcon>
                    <Avatar color="cyan" radius="xl">
                      AA
                    </Avatar>
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  {/* PROFILE LINK */}
                  <Link
                    href={PageLinks.PROFILE.link}
                    key={PageLinks.PROFILE.label}
                  >
                    <Button variant="white" style={{ width: '100%' }}>
                      Profile
                    </Button>
                  </Link>

                  <Divider my="sm" />

                  {/* SIGN OUT LINK */}
                  <Link
                    href={PageLinks.SIGNOUT.link}
                    key={PageLinks.SIGNOUT.label}
                  >
                    <Button
                      variant="white"
                      color={'red'}
                      style={{ width: '100%' }}
                    >
                      Sign out
                    </Button>
                  </Link>
                </Popover.Dropdown>
              </Popover>
            </>
          )}

          {!authenticated && (
            <>
              {/* SIGN IN LINK */}
              <Link
                href={PageLinks.SIGNIN.link}
                key={PageLinks.SIGNIN.label}
                className={`${classes.link}`}
              >
                <Button variant="outline" color={'green'}>
                  {PageLinks.SIGNIN.label}
                </Button>
              </Link>
            </>
          )}

          {/* <ColorSchemeToggle /> */}
        </Group>

        {/* SIGN IN LINK */}
        <Link
          href={PageLinks.SIGNIN.link}
          key={PageLinks.SIGNIN.label}
          className={`${classes.leftSigninButton} ${
            router.pathname === '/signin' && classes.linkActive
          }`}
        >
          <Button variant="outline" color={'green'}>
            {PageLinks.SIGNIN.label}
          </Button>
        </Link>

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
