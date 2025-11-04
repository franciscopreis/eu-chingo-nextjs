// app/status/success/verify-email/page.tsx
import { MailCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function VerifyEmailSuccess() {
  return (
    <div className="text-center space-y-6 px-5">
      <div className="flex justify-center gap-3">
        <h1 className="md:text-3xl text-2xl font-bold ">Email Verificado</h1>
        {/* <MailCheck className="flex w-8 h-8" /> */}
      </div>

      <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg justify-center items-center mx-auto">
        <Image
          src="/images/new/trigram-dragon-horse.svg"
          alt="Descrição da imagem"
          fill
          className="object-container transition duration-300 dark:invert"
          priority
        />
      </div>

      <p className="text-gray-600 text-lg leading-relaxed">
        A tua conta foi verificada com successo.
      </p>

      <div className="">
        <Link
          href="/dashboard"
          className="inline-block hover:text-amber-500 border font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Ir para o Dashboard
        </Link>
      </div>
    </div>
  )
}
