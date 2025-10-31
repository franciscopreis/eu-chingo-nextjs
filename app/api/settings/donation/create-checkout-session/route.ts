import { successResponse, errorResponse } from '@/lib/utils/responses'
import Stripe from 'stripe'

// Lazy-load do Stripe
let StripeSDK: Stripe | null = null
function getStripe() {
  if (!StripeSDK) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('Stripe key não definida')
    StripeSDK = new Stripe(key, { apiVersion: '2025-10-29.clover' })
  }
  return StripeSDK
}

export async function POST(req: Request) {
  try {
    const stripe = getStripe()
    const { amount } = await req.json()

    // Validação do amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return errorResponse('Valor de doação inválido', 400)
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Doação para o Eu-Chingo' },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/status/success/donation`,
      cancel_url: `${baseUrl}/status/error/donation`,
    })

    return successResponse({ url: session.url })
  } catch (err) {
    console.error('Erro ao criar sessão Stripe:', err)
    return errorResponse('Erro interno do servidor', 500)
  }
}
