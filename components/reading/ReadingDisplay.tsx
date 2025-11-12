'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useAuth } from '@/context/AuthContext'
import { useHexagramDisplay } from '@/hooks/useHexagramDisplay'
import ReadingInput from './ReadingInput'
import ReadingSession from './ReadingSession'

/**
 * Componente principal da secção de nova leitura
 * Está presente em duas páginas: tutorial (para guests) e dashboard/leituras (para users)
 * - Mostra título, instruções e imagens
 * - Mostra instruções e imagens
 * - Integra ReadingDisplay (nova leitura)
 * - Suporta guest e user logado
 */

export default function ReadingDisplay({ isGuest = false }) {
  // Hook de autenticação para verificar se o user está logado
  const { user } = useAuth()

  const {
    question,
    setQuestion,
    notes,
    setNotes,
    lines,
    hexagrams,
    error,
    handleGenerate,
    handleSave,
    clearReading,
  } = useHexagramDisplay()

  const [isGenerating, setIsGenerating] = useState(false)

  // Botão de geração de nova leitura
  const onGenerate = async () => {
    // Se já houver hexagramas e uma pergunta, pede confirmação
    if (hexagrams && question.trim()) {
      const confirm = await Swal.fire({
        title: 'Tens a certeza?',
        text: 'Isto vai substituir a leitura atual.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, continuar',
        cancelButtonText: 'Cancelar',
      })
      if (!confirm.isConfirmed) return
    }

    setIsGenerating(true)
    try {
      await handleGenerate()
    } finally {
      setIsGenerating(false)
    }
  }

  //
  const onGuestSave = () => {
    if (!hexagrams || !question.trim()) {
      Swal.fire({
        title: 'Sem leitura',
        text: 'Não há leitura para guardar.',
        icon: 'warning',
      })
      return
    }
    handleSave(clearReading)
  }

  const handleSaveAndClear = async () => {
    await handleSave(clearReading)
  }

  return (
    <section className="main-split">
      <h2 className="h2-title">Bem-vindo ao nosso oráculo</h2>

      {/* Imagem decorativa apenas para usuários logados */}
      {user && (
        <div className="relative w-full h-70 lg:h-[250px]">
          <Image
            src="/images/used/snake-crop.png"
            alt="Imagem de uma cobra"
            fill
            priority
            className="object-contain w-full h-full p-0 hover:scale-105 dark:invert"
          />
        </div>
      )}

      <div className="flex flex-col md:gap-6">
        {/* Topo: instruções + imagem */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Coluna de instruções */}
          <div className="flex-1 flex flex-col space-y-6 p-2">
            <ol className="list-decimal list-inside space-y-2 tracking-wider font-light text-sm md:text-base">
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

            <p className="tracking-wider leading-relaxed text-sm md:text-base">
              Para mais informações sobre os fundamentos e métodos do I Ching
              visita o{' '}
              <Link href="/blog">
                <u>blog</u>
              </Link>
            </p>
          </div>
          {/* Imagem lateral */}
          <div className="w-48 shrink-0 hidden md:block ">
            <Image
              src="/images/used/old_guy-crop-resize.svg"
              alt="Figura ilustrativa de um ancião"
              width={300}
              height={635}
              className="w-full h-auto object-contain transition-transform duration-300 dark:invert"
              priority
            />
          </div>
        </div>

        {/* ReadingInput + ReadingSession ocupam toda a largura */}
        <div className="w-full pt-6 border-t border-border flex flex-col items-center">
          <ReadingInput
            isGenerating={isGenerating}
            question={question}
            setQuestion={setQuestion}
            onGenerate={onGenerate}
            error={error ?? undefined}
          />
          {hexagrams && (
            <ReadingSession
              hexagrams={hexagrams}
              lines={lines ?? undefined}
              notes={notes}
              setNotes={setNotes}
              layout="horizontal"
              isEditing={true}
              onSave={isGuest ? onGuestSave : handleSaveAndClear}
            />
          )}

          <div className="w-48 shrink-0 block md:hidden">
            <Image
              src="/images/used/old_guy-crop-resize.svg"
              alt="Figura ilustrativa de um ancião"
              width={300}
              height={635}
              className="w-full h-auto object-contain transition-transform duration-300 dark:invert"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
