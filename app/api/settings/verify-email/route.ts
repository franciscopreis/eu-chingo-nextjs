import { verifyEmailService } from '@/lib/settings/settingsServices'
import { errorResponse } from '@/lib/utils/responses'
import { NextRequest, NextResponse } from 'next/server'
<<<<<<< HEAD

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token')
    if (!token) {
      return errorResponse('Token em falta', 400)
    }

    await verifyEmailService(token)

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/status/success/verify-email`
    )
  } catch (err: any) {
    console.error('Erro na verificação de email:', err)

    // Redireciona para página de erro em vez de JSON
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/status/error/verify-email`
=======
import db from '@/data/db/db'
import { encrypt, setSession } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token)
    return NextResponse.json({ error: 'Token em falta' }, { status: 400 })

  const user = await db.get(
    `SELECT * FROM users
     WHERE verification_token = ?
       AND verification_token_expires > datetime('now')`,
    [token]
  )

  if (!user)
    return NextResponse.json(
      { error: 'Token inválido ou expirado' },
      { status: 400 }
>>>>>>> 9d197d3 (Mais mudanças nos endpoints)
    )

  await db.run(
    `UPDATE users
       SET emailVerified = 1,
           verification_token = NULL,
           verification_token_expires = NULL
     WHERE id = ?`,
    [user.id]
  )

  const newSession = await encrypt({
    userId: user.id,
    email: user.email,
    name: user.name,
    emailVerified: true,
  })
  await setSession(newSession)

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verificado`)
}
