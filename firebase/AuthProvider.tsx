import { User } from '@firebase/auth'
import { getAuth } from 'firebase/auth'
import nookies from 'nookies'
import { createContext, useContext, useEffect, useState } from 'react'
import firebase from './clientApp'

const AuthContext = createContext<{ user: User | null }>({ user: null })

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null)

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    return getAuth(firebase).onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth(firebase).currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
