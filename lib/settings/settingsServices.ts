import {
  getUserByEmail,
  updateEmail,
  updatePassword,
  insertContactMessage,
  deleteUser,
  updateName,
  setVerificationToken,
  findUserByVerificationToken,
  verifyUserEmail,
} from './settingsRepository'
import {
  validate,
  verifyPassword,
  hashPassword,
  getUserOrFail,
} from './settingsHelpers'
import {
  emailSchema,
  passwordSchema,
  contactSchema,
  nameSchema,
} from './settingsSchemas'

import sendgrid from '@sendgrid/mail'
import { generateVerificationToken } from '../auth/authHelpers'
import { encrypt, setSession } from '../auth/session'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)

// Serviço para mudar email
export async function changeEmailService(
  userId: number,
  newEmail: string,
  password: string
) {
  validate(emailSchema, newEmail)

  const existing = await getUserByEmail(newEmail)
  if (existing) throw new Error('Já existe uma conta com esse email')

  const user = await getUserOrFail(userId)
  await verifyPassword(password, user.password)

  await updateEmail(userId, newEmail)
  return { success: true }
}

// Serviço para mudar password
export async function changePasswordService(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  validate(passwordSchema, newPassword)

  const user = await getUserOrFail(userId)
  await verifyPassword(currentPassword, user.password)

  const newHash = await hashPassword(newPassword)
  await updatePassword(userId, newHash)

  return { success: true }
}

// Serviço para enviar mensagem de contacto
export async function sendContactMessageService(
  userId: number,
  email: string,
  subject: string,
  message: string,
  topic?: string,
  sequence?: string
) {
  validate(contactSchema, { subject, message })

  await insertContactMessage(userId, email, subject, message, topic)
  return { success: true }
}

// Serviço para apagar conta
export async function deleteAccountService(userId: number) {
  if (!userId) throw new Error('Não autenticado')

  await deleteUser(userId)
  return { success: true }
}

/**
 * Novo serviço: alterar nome
 * Requer confirmação de password (igual ao comportamento de changeEmailService)
 */
export async function changeNameService(
  userId: number,
  newName: string,
  password: string
) {
  validate(nameSchema, newName)

  const user = await getUserOrFail(userId)
  await verifyPassword(password, user.password)

  await updateName(userId, newName)
  return { success: true }
}
// Gera token único para verificação de email
// Guarda o token na DB
// Envia email de verificação

export async function sendEmailVerification(
  userId: number,
  email: string,
  name?: string
) {
  console.log('🚀 Enviando verificação de email para:', email)

  // Gera token
  const { token, expires } = generateVerificationToken()
  console.log('🔑 Token gerado')

  // Guarda na DB
  await setVerificationToken(userId, token, expires)
  console.log('💾 Token guardado na DB')

  // Envia email
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/verify-email?token=${token}`
  console.log('🔗 URL:', verificationUrl)

  await sendgrid.send({
    to: email,
    from: 'franciscopereirareis@proton.me',
    subject: 'Eu-Chingo: Verificação de email',
    html: `
      <p>Olá ${name || 'utilizador'},</p>
      <p>Obrigado por te registares no <strong>Eu-Chingo</strong>.</p>
      <p>Por favor confirma o teu email clicando no link abaixo:</p>
      <p><a href="${verificationUrl}" style="color: #2563eb;">Verificar Email</a></p>
      <p>Este link expira em 1 hora.</p>
    `,
  })

  console.log('📧 Email enviado com sucesso')
}

export async function verifyEmailService(token: string) {
  const user = await findUserByVerificationToken(token)
  if (!user) {
    throw new Error('Token inválido ou expirado')
  }

  await verifyUserEmail(user.id)

  const newSession = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name,
    emailVerified: true,
  })

  await setSession(newSession)

  return user
}
