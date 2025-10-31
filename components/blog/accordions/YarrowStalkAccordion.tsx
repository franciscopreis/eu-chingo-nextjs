'use client'
import { useState } from 'react'
import AccordionItem from '@/components/ui/AccordionItem'

import YarrowStalkTutorial from '../tutorials/YarrowStalkTutorial'

export default function YarroStalkAccordion() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AccordionItem
      title="Tutorial"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <YarrowStalkTutorial />
    </AccordionItem>
  )
}
