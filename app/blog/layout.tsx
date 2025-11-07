// Revisto 07/11/2025
// Estilos revistos

'use client'

import { ReactNode } from 'react'

const tabs = [
  { id: 'history', label: 'História', href: '/blog/history' },
  { id: 'fundamentos', label: 'Fundamentos', href: '/blog/fundamentos' },
  { id: 'metodos', label: 'Métodos', href: '/blog/metodos' },
]

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col items-center p-3   justify-center w-full">
      <header className="text-center">
        <h1 className="text-4xl font-bold my-4 lg:my-6">Blogue do I Ching</h1>
        <p className="lg:max-w-lg max-w-85 leading-relaxed tracking-wide">
          Aqui poderás encontrar alguns conteúdos que ajudar-te-ão a compreender
          melhor o I Ching.
        </p>
      </header>
      {children}
    </main>
  )
}
