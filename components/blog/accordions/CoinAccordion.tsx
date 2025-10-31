// components/methods/CoinAccordion.tsx
'use client'
import { useState } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'
import CoinTutorial from '../tutorials/CoinTutorial'

export default function CoinAccordion() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AccordionItem
      title="Tutorial"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <CoinTutorial />
    </AccordionItem>
  )
}
