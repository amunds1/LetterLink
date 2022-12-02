export interface IPageLinks {
  [key: string]: { label: string; link: string }
}

const PageLinks: IPageLinks = {
  SIGNIN: { label: 'Sign in', link: '/signin' },
  GAMES: { label: 'Games', link: '/games' },
  SIGNOUT: { label: 'Sign out', link: '/signout' },
  PROFILE: { label: 'Profile', link: '/profile' },
  LEADERBOARD: { label: 'Leaderboard', link: '/leaderboard' },
}

export default PageLinks
