// authServices.ts
'use server'
import bcrypt from 'bcryptjs'
import type { LoginState, RegisterState, SafeUser } from './authTypes'
import { loginSchema, registerSchema } from './authSchemas'
import { hashPassword, sanitizeEmailPasswordName } from './authHelpers'
import { decrypt, encrypt, setSession } from './session'
import { findUserByEmail, findUserById, insertUser } from './authRepository'
import { sendEmailVerification } from '../settings/settingsServices'
import { cookies } from 'next/headers'

const SALT_ROUNDS = 10

export async function loginUser(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const body = Object.fromEntries(formData) as {
    email: string
    password: string
  }
  const result = loginSchema.safeParse(body)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors, success: false }
  }

  const { email, password } = result.data
  const user = await findUserByEmail(email)

  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    return {
      errors: { email: ['Email ou palavra-passe inválidos'], password: [] },
      success: false,
    }
  }

  const token = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name,
    emailVerified: user.emailVerified ?? false, // ✅ adiciona este campo
  })

  await setSession(token)

  return { errors: {}, success: true, userId: user.id }
}

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const body = Object.fromEntries(formData) as {
    email: string
    password: string
    name?: string
  }

  const result = registerSchema.safeParse(body)
  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    return { errors: fieldErrors, success: false }
  }

  const { sanitizedEmail, sanitizedPassword, sanitizedName } =
    sanitizeEmailPasswordName(
      result.data.email,
      result.data.password,
      result.data.name
    )

  const existing = await findUserByEmail(sanitizedEmail)
  if (existing) {
    return {
      errors: { email: ['Este email já está registado'], password: [] },
      success: false,
    }
  }

  const hashed = await hashPassword(sanitizedPassword, SALT_ROUNDS)
  const newUserId = await insertUser(sanitizedEmail, hashed, sanitizedName)

  // 🚀 Envia email de verificação logo após o registo
  await sendEmailVerification(newUserId, sanitizedEmail, sanitizedName)

  // Cria sessão, se quiseres manter login imediato
  const token = await encrypt({
    userId: newUserId,
    email: sanitizedEmail,
    name: sanitizedName,
    emailVerified: false, // 👈 inicia como não verificado
  })
  await setSession(token)

  return { errors: {}, success: true, userId: newUserId }
}

export async function getCurrentUserFromDB(): Promise<SafeUser | null> {
  const store = await cookies()
  const token = store.get('session')?.value
  if (!token) return null

  const payload = await decrypt(token)
  if (!payload?.userId) return null

  const user = await findUserById(payload.userId)
  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: Boolean(user.emailVerified),
  }
}

// Atualiza cookie após mudar emailVerified
export async function updateSessionWithVerified(user: SafeUser) {
  const token = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name,
    emailVerified: Boolean(user.emailVerified),
  })
  await setSession(token)
}
