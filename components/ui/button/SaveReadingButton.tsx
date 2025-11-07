'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import Button from '@/components/ui/button/Button'
import Swal from 'sweetalert2'
import { useReading } from '@/context/ReadingContext'

export default function SaveReadingButton({ onSave }: { onSave: () => void }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null)
  const router = useRouter()
  const { saveToLocalStorageNow } = useReading()

  useEffect(() => {
    async function fetchUser() {
      const u = await getCurrentUser()
      setUser(u)
    }
    fetchUser()
  }, [])

  const handleClick = async () => {
    if (!user) {
      // Atualiza o estado da leitura
      onSave()

      // Delay para garantir que o estado React atualizou
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Forçar a gravação no localStorage
      saveToLocalStorageNow()

      // Pergunta ao user
      const res = await Swal.fire({
        title: 'A tua sessão não está iniciada',
        text: 'Para guardar a leitura precisas de criar conta ou fazer login.',
        icon: 'warning',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Registo',
        denyButtonText: 'Login',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: 'gray',
        denyButtonColor: 'gray',
        cancelButtonColor: '#DC2626',
      })

      if (res.isConfirmed) router.push('/registo')
      else if (res.isDenied) router.push('/login')
      return
    }

    // ✅ User autenticado: grava direto
    onSave()
  }

  return <Button text="Guardar" type="button" onClick={handleClick} />
}
