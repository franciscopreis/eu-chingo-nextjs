import bcrypt from 'bcryptjs'
import { ZodType } from 'zod'
import {
  findUserByVerificationToken,
  getUserById,
  verifyUserEmail,
} from './settingsRepository'
import { updateSessionWithVerified } from '../auth/authServices'

// Função validate genérica
export function validate<T>(schema: ZodType<T>, data: unknown): T {
  if (!schema) {
    console.error('Schema está undefined!')
    throw new Error('Schema inválido')
  }

  const result = schema.safeParse(data)
  if (!result.success) {
    const messages = result.error.issues.map((issue) => issue.message)
    throw new Error(messages.join('\n'))
  }
  return result.data
}

// Função auxiliar para obter o utilizador ou lançar erro
export async function getUserOrFail(userId: number) {
  const user = await getUserById(userId)
  if (!user) throw new Error('Utilizador não encontrado')
  return user
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function verifyEmailService(token: string) {
  const user = await findUserByVerificationToken(token)
  if (!user) {
    throw new Error('Token inválido ou expirado')
  }

  await verifyUserEmail(user.id)

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    emailVerified: true,
  }

  await updateSessionWithVerified(safeUser)
  return safeUser
}
