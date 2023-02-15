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
  Paper,
  Popover,
  Text,
  Transition,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { getAuth } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PageLinks from '../constants/PageLinks'
import firebase from '../firebase/clientApp'

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
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

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
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

function onAuthStateChange(callback: Dispatch<SetStateAction<boolean>>) {
  return getAuth(firebase).onAuthStateChanged((user) => {
    if (user) {
      callback(true)
    } else {
      callback(false)
    }
  })
}

export function PageHeader() {
  // Toggle Burger menu
  const [opened, { toggle }] = useDisclosure(false)

  const { classes } = useStyles()

  const router = useRouter()

  // Change style of PageHeader depending on wether user is authenticated or not
  // https://johnwcassidy.medium.com/firebase-authentication-hooks-and-context-d0e47395f402
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setAuthenticated)
    return () => {
      unsubscribe()
    }
  }, [])

  // Renders Link-components for routes which does not require authentication
  const baseLinks = [PageLinks.LEADERBOARD].map((link) => (
    <Link
      href={link.link}
      key={link.label}
      className={`${classes.link} ${
        router.pathname === link.link && classes.linkActive
      }`}
      onClick={(event) => {
        toggle()
      }}
    >
      {link.label}
    </Link>
  ))

  // Renders Link-components for routes which require authentication
  const authenticatedLinks = [PageLinks.ACHIEVEMENTS].map((link) => (
    <Link
      href={link.link}
      key={link.label}
      className={`${classes.link} ${
        router.pathname === link.link && classes.linkActive
      }`}
      onClick={(event) => {
        toggle()
      }}
    >
      {link.label}
    </Link>
  ))

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Link
          href="/"
          className={classes.link}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Text>LetterLink</Text>
        </Link>

        <Group spacing={5} className={classes.links}>
          {baseLinks}

          {!authenticated && (
            <>
              {/* SIGN IN LINK */}
              <Link href={PageLinks.SIGNIN.link} key={PageLinks.SIGNIN.label}>
                <Button variant="outline" color="green">
                  {PageLinks.SIGNIN.label}
                </Button>
              </Link>
            </>
          )}

          {authenticated && (
            <>
              {authenticatedLinks}

              {/* AVATAR BUTTON */}
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <ActionIcon>
                    <Avatar color="cyan" radius="xl" />
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
                      color="red"
                      style={{ width: '100%' }}
                    >
                      Sign out
                    </Button>
                  </Link>
                </Popover.Dropdown>
              </Popover>
            </>
          )}

          {/* <ColorSchemeToggle /> */}
        </Group>

        <>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Transition transition="pop-top-right" duration={50} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {authenticated && authenticatedLinks}

                {baseLinks}

                <Link
                  href={PageLinks.PROFILE.link}
                  key={PageLinks.PROFILE.label}
                  className={`${classes.link} ${
                    router.pathname === '/profile' && classes.linkActive
                  }`}
                  onClick={() => {
                    toggle()
                  }}
                >
                  {PageLinks.PROFILE.label}
                </Link>

                <Divider my="sm" style={{ margin: 0 }} />

                {/* SIGN OUT LINK */}
                {authenticated && (
                  <Link
                    href={PageLinks.SIGNOUT.link}
                    key={PageLinks.SIGNOUT.label}
                    className={`${classes.link} ${
                      router.pathname === '/profile' && classes.linkActive
                    }`}
                    style={{
                      color: 'red',
                    }}
                    onClick={() => setAuthenticated(false)}
                  >
                    {PageLinks.SIGNOUT.label}
                  </Link>
                )}

                {!authenticated && (
                  <>
                    {/* SIGN IN LINK */}
                    <Link
                      href={PageLinks.SIGNIN.link}
                      key={PageLinks.SIGNIN.label}
                      style={{
                        color: 'green',
                      }}
                      className={`${classes.link} ${
                        router.pathname === '/signin' && classes.linkActive
                      }`}
                      onClick={() => {
                        toggle()
                      }}
                    >
                      {PageLinks.SIGNIN.label}
                    </Link>
                  </>
                )}
              </Paper>
            )}
          </Transition>
        </>
      </Container>
    </Header>
  )
}
