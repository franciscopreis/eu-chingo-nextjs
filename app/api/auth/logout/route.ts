// Revisto 07/11/2025
// Funcional, runtime em node.js foi removido por não ser preciso

import { successResponse } from '@/lib/utils/responses'
import { setSession } from '@/lib/auth/session'

// POST /api/auth/logout
// O logout é a única parte da autenticação em que foram usados endpoints.
// Em login e registo usam-se as "server actions" do Next JS.

export async function POST() {
  // Remove a sessão do lado do servidor
  await setSession('')
  const response = successResponse({ success: true }, 200)

  return response
}
