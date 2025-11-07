'use server'

import crypto from 'crypto'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export type CurrentUser = {
  id: number
  email: string
  name: string
  emailVerified: boolean
} | null

type SessionPayload = {
  userId: number
  email: string
  name?: string
  emailVerified?: boolean
}

const SESSION_DURATION = '7d'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 dias

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET não definida')

const encodedKey = new TextEncoder().encode(secretKey)

// 🧩 Tipagem do payload que vai dentro do JWT

// Criar token JWT
export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(encodedKey)
}

// Verificar e decodificar token JWT
export async function decrypt(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as SessionPayload
  } catch {
    return null
  }
}

// Criar ou remover cookie de sessão
export async function setSession(token?: string) {
  const store = await cookies()
  if (!token) {
    store.delete('session')
  } else {
    store.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === 'true',
      path: '/',
      sameSite: 'lax',
      maxAge: MAX_AGE,
    })
  }
}

// Obter utilizador atual a partir do cookie
export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const store = await cookies()
    const token = store.get('session')?.value

    if (!token) {
      console.log('[getCurrentUser] No session token found')
      return null
    }

    const payload = await decrypt(token)
    if (!payload) {
      console.log('[getCurrentUser] Token could not be decrypted')
      return null
    }

    // Garantir consistência de tipos
    if (typeof payload.userId !== 'number' || !payload.email || !payload.name) {
      console.log('[getCurrentUser] Invalid payload', payload)
      return null
    }

    const user = {
      id: payload.userId,
      email: payload.email,
      name: payload.name,
      emailVerified: Boolean(payload.emailVerified),
    }

    console.log('[getCurrentUser] returning user', user)
    return user
  } catch (err) {
    console.error('[getCurrentUser] Error fetching user', err)
    return null
  }
}
