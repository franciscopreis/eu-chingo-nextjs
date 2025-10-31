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
      <SidebarWrapper links={menuLinks} />
      <div className="flex-1 flex flex-col gap-6 mt-3 md:pt-0 max-w-3xl lg:relative lg:left-13 overflow-hidden">
        {children}
      </div>
    </LayoutContainer>
  )
}
