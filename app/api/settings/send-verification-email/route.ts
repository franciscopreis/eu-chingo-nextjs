import { NextRequest } from 'next/server'
import { getUserById } from '@/lib/settings/settingsRepository'

import { successResponse, errorResponse } from '@/lib/utils/responses'
import { sendEmailVerification } from '@/lib/settings/settingsServices'

// No seu endpoint
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()

    if (!userId) return errorResponse('UserId obrigatório', 400)

    const user = await getUserById(userId)
    if (!user) return errorResponse('Utilizador não encontrado', 404)

    if (user.emailVerified) {
      return errorResponse('Email já verificado', 400)
    }

    // Converte null para undefined
    await sendEmailVerification(user.id, user.email, user.name ?? undefined)

    return successResponse({ message: 'Email de verificação enviado' })
  } catch (err) {
    console.error('Erro ao enviar email de verificação:', err)
    return errorResponse('Erro ao enviar email de verificação', 500)
  }
}
