// app/status/error/verify-email/page.tsx
import { XCircle, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function VerifyEmailError() {
  return (
    <div className="text-center space-y-6 px-5">
      <div className="flex justify-center gap-3">
        <h1 className="md:text-3xl text-2xl font-bold ">
          Falha na Verificação do Email
        </h1>
      </div>
      <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg justify-center items-center mx-auto">
        <Image
          src="/images/new/chicken.svg"
          alt="Descrição da imagem"
          fill
          className="object-cover transition duration-300 dark:invert"
          priority
        />
      </div>
      <p className="text-gray-600 text-lg leading-relaxed text-justify">
        O link de verificação é inválido ou expirou. Por favor, solicite um novo
        email de verificação para continuar.
      </p>

      <div className="pt-4 space-y-3">
        <Link
          href="/dashboard/settings"
          className="inline-block hover:text-amber-500 border font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Voltar às Definições
        </Link>
      </div>
    </div>
  )
}
