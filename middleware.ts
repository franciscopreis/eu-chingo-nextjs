// app/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth/session'

const protectedRoutes = ['/dashboard', '/historico', '/tabelas']
const publicRoutes = ['/login', '/registo', '/tutorial']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const token = req.cookies.get('session')?.value
  const payload = token ? await decrypt(token) : null
  const userId = payload?.userId

  console.log('🛡️ Middleware - Path:', pathname, 'UserID:', userId)

  // Rota protegida sem sessão → login
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !userId) {
    console.log('🛡️ Redirecting to login - no session')
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // Rota pública com sessão → dashboard (exceto se vier de registro)
  if (publicRoutes.some((route) => pathname.startsWith(route)) && userId) {
    // Verificar se não é uma resposta de sucesso de registro
    const referer = req.headers.get('referer')
    const isComingFromRegister = referer?.includes('/registo')

    if (!isComingFromRegister) {
      console.log('🛡️ Redirecting to dashboard - already authenticated')
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/registo',
    '/tutorial',
    '/historico/:path*',
    '/tabelas/:path*',
  ],
}
