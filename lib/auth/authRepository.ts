import db from '@/data/db/db'
import { userSchema } from './authSchemas'
import type { User } from './authTypes'
import bcrypt from 'bcryptjs'

export async function findUserByEmail(email: string): Promise<User | null> {
  const raw = await db.get<User>('SELECT * FROM users WHERE email = ?', [email])
  if (!raw) return null

  // Converter números → booleanos antes de validar
  const parsed = userSchema.safeParse({
    ...raw,
    emailVerified: Boolean(raw.emailVerified),
  })

  if (!parsed.success) {
    console.error(parsed.error.format())
    return null
  }

  return parsed.data
}

export async function findUserById(id: number): Promise<User | null> {
  const raw = await db.get<User>('SELECT * FROM users WHERE id = ?', [id])
  if (!raw) return null

  const parsed = userSchema.safeParse({
    ...raw,
    emailVerified: Boolean(raw.emailVerified),
  })

  if (!parsed.success) {
    console.error(parsed.error.format())
    return null
  }

  return parsed.data
}

export async function insertUser(
  email: string,
  hashedPassword: string,
  name: string
): Promise<number> {
  const result = await db.run(
    'INSERT INTO users (email, password, name, createdAt) VALUES (?, ?, ?, ?)',
    [email, hashedPassword, name, new Date().toISOString()]
  )
  return Number(result.lastInsertRowid)
}

export async function getUserPassword(userId: string) {
  return await db.get<{ password: string }>(
    'SELECT password FROM users WHERE id = ?',
    [userId]
  )
}

export async function updateEmailVerified(userId: number, verified: boolean) {
  await db.run('UPDATE users SET emailVerified = ? WHERE id = ?', [
    verified ? 1 : 0,
    userId,
  ])
}

export async function setVerificationToken(
  userId: number,
  token: string,
  expires: string
) {
  await db.run(
    'UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?',
    [token, expires, userId]
  )
}

export async function findUserByVerificationToken(token: string) {
  const user = await db.get(
    `SELECT * FROM users
     WHERE verification_token = ?
       AND verification_token_expires > datetime('now')`,
    [token]
  )

  if (!user) return null

  return {
    ...user,
    emailVerified: Boolean(user.emailVerified),
  }
}

export async function verifyUserEmail(userId: number) {
  await db.run(
    `UPDATE users
       SET emailVerified = 1,
           verification_token = NULL,
           verification_token_expires = NULL
     WHERE id = ?`,
    [userId]
  )
}
