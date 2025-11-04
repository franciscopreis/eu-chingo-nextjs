// app/status/error/delete-account/page.tsx
import { AlertTriangle, Settings, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DeleteAccountError() {
  return (
    <div className="text-center space-y-6 px-5">
      <div className="flex justify-center gap-3">
        <h1 className="md:text-3xl text-2xl font-bold ">
          Erro a apagar a conta
        </h1>
        {/* <AlertTriangle className="flex w-8 h-8" /> */}
      </div>
      <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg justify-center items-center mx-auto">
        <Image
          src="/images/new/dog.svg"
          alt="Descrição da imagem"
          fill
          className="object-cover transition duration-300 dark:invert"
          priority
        />
      </div>
      <p className="text-gray-600 text-lg leading-relaxed text-justify">
        Por questões técnicas não foi possível eliminar a sua conta neste
        momento. Por favor, tente novamente mais tarde ou contacte o suporte
        através do formulário nas definições.
      </p>

      <div className="">
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
