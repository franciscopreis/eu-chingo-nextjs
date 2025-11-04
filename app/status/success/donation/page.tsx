// app/status/success/donation/page.tsx
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DonationSuccess() {
  return (
    <div className="text-center space-y-6 px-5">
      <div className="flex justify-center gap-3">
        <h1 className="md:text-3xl text-2xl font-bold ">Doação processada</h1>

        {/* <div className="flex justify-center">
          <Heart className="w-8 h-8" />
        </div> */}
      </div>
      <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-lg justify-center items-center mx-auto">
        <Image
          src="/images/new/naked-lady.svg"
          alt="Descrição da imagem"
          fill
          className="object-container transition duration-300 dark:invert"
          priority
        />
      </div>
      <p className="text-gray-600 text-lg leading-relaxed">
        Muito obrigado pela tua doação. Enviámos o comprovativo da mesma para o
        teu email.
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
