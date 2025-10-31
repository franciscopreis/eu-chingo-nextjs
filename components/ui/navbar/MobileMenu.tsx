import { useEffect, useRef } from 'react'
import NavbarLinks from './NavbarLinks'

type MobileMenuProps = {
  isOpen: boolean
  closeMenu: () => void
}

export default function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu() // ← Mesma lógica do seu componente Name!
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, closeMenu])

  if (!isOpen) return null

  return (
    <nav
      ref={menuRef}
      className="absolute top-full left-0 w-full bg-white dark:bg-stone-900 shadow-md md:hidden z-[999]"
    >
      <div className="flex flex-col p-4 gap-2">
        <NavbarLinks onLinkClick={closeMenu} />
      </div>
    </nav>
  )
}
