'use client'

import ReadingDisplay from '@/components/reading/ReadingDisplay'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider'

export default function Reading() {
  const { user } = useAuth() // hook para user

  return (
    <section className="main-split">
      <h2 className="h2-title">Bem-vindo ao nosso oráculo</h2>
      {user ? (
        <div className="relative left-10 w-full h-50 lg:h-[250px] ">
          <Image
            src="/images/svg/snake-crop.svg"
            alt="Descrição da imagem"
            fill
            priority
            className="object-contain w-full h-full p-0 hover:scale-105 dark:invert"
          />
        </div>
      ) : (
        ''
      )}

      <div className="flex md:flex-row flex-col justify-center">
        <div className="space-y-6 justify-text md:w-2/3 p-2">
          <div>
            <ol className="list-decimal list-inside space-y-2 tracking-wider font-light text-sm md:text-base px-8 mx-auto md:mt-10">
              <li>
                Concentra-te em silêncio e formula uma pergunta simples e clara.
              </li>
              <li>
                Clica no botão "Leitura" para veres os hexagramas tirados.
              </li>
              <li>
                Consulta os logs para veres a lógica por detrás da tua leitura.
              </li>
              <li>
                Explora os textos associados ao Julgamento, Imagem e Linhas dos
                hexagramas. Foca-te particularmente nas linhas mutáveis.
              </li>
              <li>Escreve a tua interpretação e reflexão acerca da leitura.</li>
              <li>Guarda a leitura para consulta futura.</li>
            </ol>
          </div>
          <p className="tracking-wider leading-relaxed text-sm md:text-base px-8">
            Para mais informações sobre os fundamentos e métodos do I Ching
            visita o{' '}
            <Link href="/blog">
              <u>blogue</u>
            </Link>
          </p>

          {/* Apenas em small screens */}
          <div className="pt-6 border-t border-border w-full block md:hidden">
            <ReadingDisplay isGuest={!user} />
          </div>
        </div>

        <div className="md:w-1/3 max-w-[300px] mx-auto">
          <Image
            src="/images/svg/old_guy-crop-resize.svg"
            alt="Figura ilustrativa de um ancião"
            width={300}
            height={635}
            className="w-full h-auto object-contain transition-transform duration-300 dark:invert"
            priority
          />
        </div>
      </div>

      {/* Apenas em medium e acima */}
      <div className="pt-6 border-t border-border w-full hidden md:block">
        <ReadingDisplay isGuest={!user} />
      </div>
    </section>
  )
}
