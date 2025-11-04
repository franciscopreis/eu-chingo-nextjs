import { verifyEmailService } from '@/lib/settings/settingsServices'
import { errorResponse } from '@/lib/utils/responses'
import { NextRequest, NextResponse } from 'next/server'

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
    )
  }
}
