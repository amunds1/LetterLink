import { ActionIcon, Image, createStyles, Header } from '@mantine/core'
import {
  IconHome,
  IconMedal2,
  IconSettings,
  IconTrophy,
  IconUser,
} from '@tabler/icons'
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
          href="/achievements"
          className={
            router.pathname === '/achievements' ? classes.linkActive : ''
          }
          style={{}}
        >
          <ActionIcon size="xl">
            <IconTrophy />
          </ActionIcon>
        </Link>

        <Link
          href="/leaderboard"
          className={
            router.pathname === '/leaderboard' ? classes.linkActive : ''
          }
          style={{
            marginLeft: '2rem',
          }}
        >
          <ActionIcon size="lg">
            <Image
              src="/ranking.svg"
              alt="Leaderboard icon"
              width={24}
              height={24}
            />
          </ActionIcon>
        </Link>

        <Link
          href="/"
          className={router.pathname === '/' ? classes.linkActive : ''}
          style={{ marginLeft: '2rem' }}
        >
          <ActionIcon size="xl">
            <IconHome />
          </ActionIcon>
        </Link>

        <Link
          href="/profile"
          className={router.pathname === '/profile' ? classes.linkActive : ''}
          style={{
            marginLeft: '2rem',
          }}
        >
          <ActionIcon size="xl">
            <IconUser />
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
