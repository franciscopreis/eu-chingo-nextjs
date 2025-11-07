'use client'

import { ReactNode, forwardRef } from 'react'

type AccordionItemProps = {
  title: ReactNode
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ title, isOpen, onToggle, children }, ref) => {
    return (
      <div ref={ref} className="border rounded-md w-full">
        {/* Cabeçalho */}
        <div
          className={`w-full p-2 font-semibold flex justify-between items-center hover:bg-gray-300 dark:hover:bg-stone-800 cursor-pointer min-w-0 overflow-hidden text-center ${
            isOpen ? 'border-b' : ''
          }`}
          onClick={onToggle}
        >
          <div className="flex-1 break-smart min-w-0 text-sm">{title}</div>
        </div>

        {/* Wrapper de animação — SEM margens nem padding dinâmicos */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isOpen ? 'max-h-[3000px]' : 'max-h-0'
          }`}
        >
          {/* Aqui sim o padding interno */}
          <div className="px-5 py-3 text-sm leading-relaxed tracking-wide break-smart min-w-0">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'
export default AccordionItem
