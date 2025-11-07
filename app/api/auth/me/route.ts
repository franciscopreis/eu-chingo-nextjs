import { getCurrentUserFromDB } from '@/lib/auth/authServices'
import { successResponse, errorResponse } from '@/lib/utils/responses'

export async function GET() {
  try {
    const user = await getCurrentUserFromDB()

    if (!user) {
      return errorResponse('Não autenticado', 401)
    }

    return successResponse(user, 200)
  } catch (err) {
    console.error('[api/auth/me] Erro:', err)
    return errorResponse('Erro de servidor', 500)
  }
}
