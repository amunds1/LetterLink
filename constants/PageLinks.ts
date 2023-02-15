export interface IPageLinks {
  [key: string]: { label: string; link: string }
}

const PageLinks: IPageLinks = {
  SIGNIN: { label: 'Sign in', link: '/signin' },
  GAMES: { label: 'Games', link: '/games' },
  PROFILE: { label: 'Profile', link: '/profile' },
  LEADERBOARD: { label: 'Leaderboard', link: '/leaderboard' },
  ACHIEVEMENTS: { label: 'Achievements', link: '/achievements' },
}

export default PageLinks
