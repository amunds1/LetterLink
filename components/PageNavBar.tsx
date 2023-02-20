import { ActionIcon, createStyles, Header } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHome, IconSettings } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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

export function PageNavBar() {
  const { classes } = useStyles()

  const router = useRouter()

  return (
    <Header height={60} mb={0}>
      <div className={classes.container}>
        <Link
          href="/"
          className={router.pathname === '/' ? classes.linkActive : ''}
          style={{
            marginRight: '2rem',
          }}
        >
          <ActionIcon size="xl">
            <IconHome />
          </ActionIcon>
        </Link>

        <Link
          href="/settings"
          className={router.pathname === '/settings' ? classes.linkActive : ''}
          style={{
            marginLeft: '2rem',
          }}
        >
          <ActionIcon size="xl">
            <IconSettings />
          </ActionIcon>
        </Link>
      </div>
    </Header>
  )
}
