'use client'

import { useState } from 'react'
import Swal from 'sweetalert2'
import Button from '@/components/ui/button/Button'

type Props = {
  userId: number
  emailVerified?: boolean
}
// Reenvia email de verificação
// POST /api/settings/resend-verification
export default function ResendVerificationButton({
  userId,
  emailVerified,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleClick = async () => {
    if (!userId) return
    setLoading(true)

    try {
      const res = await fetch('/api/settings/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()

      if (!res.ok) {
        Swal.fire('Erro', data.error || 'Erro ao reenviar email', 'error')
      } else {
        Swal.fire(
          'Email reenviado!',
          'Verifica novamente a tua caixa de entrada.',
          'success'
        )
        setSent(true)
      }
    } catch (err: any) {
      Swal.fire('Erro', err.message || 'Erro ao reenviar email', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center mt-4 mx-auto gap-2 text-sm">
      <Button
        text={
          emailVerified
            ? 'Email já verificado'
            : sent
              ? 'Email reenviado'
              : 'Reenviar email'
        }
        type="button"
        onClick={handleClick}
        disabled={emailVerified || sent || loading}
      />
      <p className="text-xs text-gray-500 tracking-wide">
        Por favor verifique o spam
      </p>
    </div>
  )
}
