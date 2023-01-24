import Router from 'next/router'
import { useEffect, useState } from 'react'

// https://stackoverflow.com/questions/60755316/nextjs-getserversideprops-show-loading/60756105#60756105
export const usePageLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    const routeEventStart = () => {
      setPathname(Router.pathname)
      setIsPageLoading(true)
    }
    const routeEventEnd = () => {
      setIsPageLoading(false)
    }

    Router.events.on('routeChangeStart', routeEventStart)
    Router.events.on('routeChangeComplete', routeEventEnd)
    Router.events.on('routeChangeError', routeEventEnd)
    return () => {
      Router.events.off('routeChangeStart', routeEventStart)
      Router.events.off('routeChangeComplete', routeEventEnd)
      Router.events.off('routeChangeError', routeEventEnd)
    }
  }, [])

  return { isPageLoading, pathname }
}
