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
import { useState } from 'react'
import PageLinks, { IPageLinks } from '../constants/PageLinks'
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
  const [active, setActive] = useState<string>()
  const { classes, cx } = useStyles()

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <Link href={'/'}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>
            <Text>5x5 game</Text>
          </a>
        </Link>
        <Group spacing={5} className={classes.links}>
          {/* GAMES LINK */}
          <Link href={PageLinks.GAMES.link} key={PageLinks.GAMES.label}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === PageLinks.GAMES.link,
              })}
              onClick={() => {
                setActive(PageLinks.GAMES.link)
              }}
            >
              {PageLinks.GAMES.label}
            </a>
          </Link>
          {/* PROFILE LINK */}
          <Link href={PageLinks.PROFILE.link} key={PageLinks.PROFILE.label}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === PageLinks.PROFILE.link,
              })}
              onClick={() => {
                setActive(PageLinks.PROFILE.link)
              }}
            >
              {PageLinks.PROFILE.label}
            </a>
          </Link>
          {/* SIGN IN LINK */}
          <Link href={PageLinks.SIGNIN.link} key={PageLinks.SIGNIN.label}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === PageLinks.SIGNIN.link,
              })}
              onClick={() => {
                setActive(PageLinks.SIGNIN.link)
              }}
            >
              {PageLinks.SIGNIN.label}
            </a>
          </Link>
          {/* SIGN OUT LINK */}
          <Link href={PageLinks.SIGNOUT.link} key={PageLinks.SIGNOUT.label}>
            <a
              className={cx(classes.link, {
                [classes.linkActive]: active === PageLinks.SIGNOUT.link,
              })}
              onClick={() => {
                setActive(PageLinks.SIGNOUT.link)
              }}
            >
              {PageLinks.SIGNOUT.label}
            </a>
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
