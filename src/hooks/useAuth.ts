// src/hooks/useAuth.ts
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'

type SignInCredentials = {
  email: string
  password: string
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!(lumi.auth && lumi.auth.isAuthenticated))
  const [user, setUser] = useState<any>(lumi.auth?.user ?? null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // registra listener (se existir)
    const unsubscribe = typeof lumi.auth?.onAuthChange === 'function'
      ? lumi.auth.onAuthChange(({ isAuthenticated, user }: any) => {
          setIsAuthenticated(Boolean(isAuthenticated))
          setUser(user ?? null)
          setLoading(false)
        })
      : undefined

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  // signIn — aceita {email,password} e chama lumi.auth.signIn
  const signIn = async ({ email, password }: SignInCredentials) => {
    setLoading(true)
    try {
      // acessamos a função e tipamos como any para evitar conflito de assinatura em tempo de compilação
      const signFn: any = (lumi.auth as any)?.signIn

      if (typeof signFn !== 'function') {
        throw new Error('lumi.auth.signIn não está disponível')
      }

      // se a função aceita 1 argumento (objeto), chamamos com o objeto
      // caso contrário (ex: função espera 2 args), chamamos com email, password
      if (signFn.length === 1) {
        await signFn.call(lumi.auth, { email, password })
      } else {
        await signFn.call(lumi.auth, email, password)
      }

      // atualiza estado após login
      setIsAuthenticated(true)
      setUser((lumi.auth as any)?.user ?? null)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const signOutFn: any = (lumi.auth as any)?.signOut
      if (typeof signOutFn === 'function') {
        await signOutFn.call(lumi.auth)
      } else {
        // fallback: tenta chamar diretamente
        await (lumi.auth as any).signOut?.()
      }

      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut
  }
}
