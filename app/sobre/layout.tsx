import { ReactNode } from 'react'
import LayoutContainer from '@/components/ui/layout/LayoutContainer'
import SidebarWrapper from '@/components/ui/sidebar/SidebarWrapper'

const menuLinks = [
  { href: '/sobre/i-ching', label: 'I Ching' },
  { href: '/sobre/projecto', label: 'Projecto' },
  { href: '/sobre/faq', label: 'FAQ' },
]

export default function SobreLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutContainer>
      {/* Client-only - Este Wrapper foi utilizado de modo a que o layout não tenha de ser 'use client'*/}
      <SidebarWrapper links={menuLinks} />

      <div className="flex-1 flex flex-col gap-6 mt-3 md:pt-0 max-w-2xl lg:relative left-10 overflow-hidden text-justify">
        {children}
      </div>
    </LayoutContainer>
  )
}
