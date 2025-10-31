'use client'

import { ReactNode } from 'react'
import LayoutContainer from '@/components/ui/layout/LayoutContainer'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import { usePathname } from 'next/navigation'
import NavbarMobileDropdown from '@/components/ui/sidebar/NavbarMobileDropdown'

const tabs = [
  { id: 'history', label: 'História', href: '/blog/history' },
  { id: 'fundamentos', label: 'Fundamentos', href: '/blog/fundamentos' },
  { id: 'metodos', label: 'Métodos', href: '/blog/metodos' },
]

export default function BlogLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <main className="flex flex-col items-center p-3 max-w-6xl mx-auto justify-center w-full">
      <header className="text-center">
        <h1 className="text-4xl font-bold my-4 lg:my-6">Blog do I Ching</h1>
        <p className="max-w-xl">
          Aqui poderás encontrar alguns conteúdos que poderão ajudar-te a
          compreender melhor o I Ching.
        </p>
      </header>
      {children}
    </main>
  )
}
