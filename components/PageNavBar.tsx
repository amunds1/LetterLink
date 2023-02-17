import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Center,
  Container,
  createStyles,
  Divider,
  Group,
  Header,
  Paper,
  Popover,
  Stack,
  Text,
  Transition,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHome, IconSettings } from '@tabler/icons'
import { getAuth } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PageLinks from '../constants/PageLinks'
import firebase from '../firebase/clientApp'
import signOutUser from '../firebase/signOutUser'

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

export function PageNavBar() {
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

  return (
    <Header height={60} mb={0}>
      <Group position="center">
        <Link href="/">
          <ActionIcon size="xl">
            <IconHome />
          </ActionIcon>
        </Link>

        <Link href="/settings">
          <ActionIcon size="xl">
            <IconSettings />
          </ActionIcon>
        </Link>
      </Group>
    </Header>
  )
}
