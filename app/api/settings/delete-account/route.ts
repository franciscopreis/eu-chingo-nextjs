import { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import db from '@/data/db/db'
import { errorResponse, successResponse } from '@/lib/utils/responses'

import bcrypt from 'bcryptjs'

// Versão mais robusta
export async function POST(req: NextRequest) {
  try {
    const cookie = req.cookies.get('session')?.value
    const user = await decrypt(cookie)
    if (!user?.userId) return errorResponse('Não autenticado', 401)

    const { password } = await req.json()
    if (!password) return errorResponse('Password obrigatória', 400)

    // PRIMEIRO busca o usuário pelo ID
    const dbUser = await db.get('SELECT * FROM users WHERE id = ?', [
      user.userId,
    ])
    if (!dbUser) return errorResponse('Utilizador não encontrado', 404)

    // DEPOIS valida a password
    const match = await bcrypt.compare(password, dbUser.password)
    if (!match) return errorResponse('Password incorreta', 403)

    // Se passou, apaga o user
    await db.run('DELETE FROM users WHERE id = ?', [user.userId])

    const res = successResponse({ success: true })
    res.cookies.set({
      name: 'session',
      value: '',
      maxAge: 0,
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    })
    return res
  } catch (err) {
    console.error(err)
    return errorResponse((err as Error).message, 500)
  }
}
