import db from '@/data/db/db'

export type DBUser = {
  id: number
  email: string
  password: string
  name?: string | null
  createdAt: string
  welcomeEmailSent?: boolean
  emailVerified?: boolean
}

export async function getUserById(userId: number): Promise<DBUser | undefined> {
  return await db.get<DBUser>(
    'SELECT id, email, password, name, createdAt, welcomeEmailSent, emailVerified FROM users WHERE id = ?',
    [userId]
  )
}

export async function markWelcomeEmailSent(userId: number) {
  return await db.run('UPDATE users SET welcomeEmailSent = 1 WHERE id = ?', [
    userId,
  ])
}

export async function getUserByEmail(
  email: string
): Promise<DBUser | undefined> {
  return await db.get<DBUser>(
    'SELECT id, email, password, name, createdAt, emailVerified FROM users WHERE email = ?',
    [email]
  )
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
  return await db.get(
    `SELECT * FROM users
     WHERE verification_token = ?
       AND verification_token_expires > datetime('now')`,
    [token]
  )
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
