'use client'

import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { AuthContextType, SafeUser } from '@/lib/auth/authTypes'

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  refreshAuth: async () => {},
})

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SafeUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const refreshAuth = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store' })
      if (response.ok) {
        const { data } = await response.json()
        setUser(data) // ← aqui está a diferença
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (err) {
      console.error('Erro ao obter utilizador:', err)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshAuth()
  }, [])

  const contextValue = useMemo(
    () => ({ isAuthenticated, user, loading, refreshAuth }),
    [isAuthenticated, user, loading]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
