import { findUserByEmail } from './authRepository'
import { randomBytes } from 'crypto'
import sendgrid from '@sendgrid/mail'
import { setVerificationToken } from '../settings/settingsRepository'
import bcrypt from 'bcryptjs'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

// Limpa email, password e name
export function sanitizeEmailPasswordName(
  email: string,
  password: string,
  name: string
) {
  return {
    sanitizedEmail: email.trim().toLowerCase(),
    sanitizedPassword: password.trim(),
    sanitizedName: name.trim(),
  }
}

// Verifica se o email existe
// Se existir, retorna true e se não existir, retorna false
export async function checkIfEmailExists(email: string): Promise<boolean> {
  const existingUser = await findUserByEmail(email)
  return Boolean(existingUser)
}

export function generateVerificationToken() {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString()
  return { token, expires }
}

export async function comparePasswords(plain: string, hash: string) {
  const valid = await bcrypt.compare(plain, hash)
  if (!valid) throw new Error('Password incorreta')
}

export async function hashPassword(password: string, saltRounds = 10) {
  return bcrypt.hash(password, saltRounds)
}
