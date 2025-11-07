import YinYangSymbol from '@/public/yin-yang.svg'
import Link from 'next/link'
import SequentialHexagram from '../logo/SequentialHexagram'

export default function Logo() {
  return (
    <div className="flex items-center gap-1 font-bold lg:text-xl md:text-lg leading-none ">
      <Link href="/" className="flex items-center">
        <div className="flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7">
          <SequentialHexagram />
        </div>
        <span className="ml-1">Eu-Chingo</span>
      </Link>
    </div>
  )
}
