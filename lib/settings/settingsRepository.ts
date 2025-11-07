import db from '@/data/db/db'

export type DBUser = {
  id: number
  email: string
  password: string
  name?: string | null
  createdAt: string

  emailVerified?: boolean
}

export async function getUserById(id: number) {
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id])

  if (!user) return null

  return {
    ...user,
    emailVerified: Boolean(user.emailVerified),
  }
}

export async function getUserByEmail(email: string) {
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email])

  if (!user) return null

  return {
    ...user,
    emailVerified: Boolean(user.emailVerified),
  }
}

export async function updateEmail(userId: number, email: string) {
  return await db.run('UPDATE users SET email = ? WHERE id = ?', [
    email,
    userId,
  ])
}

export async function updatePassword(userId: number, hash: string) {
  return await db.run('UPDATE users SET password = ? WHERE id = ?', [
    hash,
    userId,
  ])
}

export async function updateName(userId: number, name: string) {
  return await db.run('UPDATE users SET name = ? WHERE id = ?', [name, userId])
}

export async function insertContactMessage(
  userId: number,
  email: string,
  subject: string,
  message: string,
  topic?: string,
  sequence?: string
) {
  return await db.run(
    `INSERT INTO contacts (user_id, email, subject, message, topic)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, email, subject, message, topic || null]
  )
}

export async function deleteUser(userId: number) {
  return await db.run('DELETE FROM users WHERE id = ?', [userId])
}

export async function setVerificationToken(
  userId: number,
  token: string,
  expires: string
) {
  return await db.run(
    'UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?',
    [token, expires, userId]
  )
}

export async function findUserByVerificationToken(token: string) {
  const user = await db.get('SELECT * FROM users WHERE verificationToken = ?', [
    token,
  ])

  if (!user) return null

  return {
    ...user,
    emailVerified: Boolean(user.emailVerified),
  }
}

export async function verifyUserEmail(userId: number) {
  return await db.run(
    `UPDATE users
       SET emailVerified = 1,
           verification_token = NULL,
           verification_token_expires = NULL
     WHERE id = ?`,
    [userId]
  )
}
