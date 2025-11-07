'use client'

import { useState } from 'react'
import Button from '../ui/button/Button'

export default function DonateButton() {
  const [amount, setAmount] = useState(5)
  const [loading, setLoading] = useState(false)

  const handleDonate = async () => {
    if (amount < 1) {
      alert('O valor da doação deve ser pelo menos 1€')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(
        '/api/settings/donation/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        }
      )

      if (!res.ok) {
        const text = await res.text()
        console.error('Erro ao criar sessão:', res.status, text)
        alert('Erro ao iniciar checkout')
        return
      }

      const data = await res.json()

      if (data.success && data.data.url) {
        window.location.href = data.data.url
        return
      }

      console.error('Resposta inesperada:', data.data.url)
      alert('Não foi possível obter a URL de checkout')
    } catch (err) {
      console.error(err)
      alert('Erro ao iniciar checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2 p-4 border rounded-2xl">
      <h2 className="text-lg font-semibold">Paga-me qualquer coisinha</h2>
      <label htmlFor="donation-amount" className="sr-only">
        Valor da doação em euros
      </label>
      <input
        id="donation-amount"
        type="number"
        min={1}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-1 rounded w-24 text-center"
        aria-label="Valor da doação em euros"
      />
      <Button
        text={loading ? 'A carregar...' : 'Doar'}
        onClick={handleDonate}
        disabled={loading}
      />
    </div>
  )
}
