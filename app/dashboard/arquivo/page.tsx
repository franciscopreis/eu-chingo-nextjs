import ArchiveDisplay from '@/components/archive/ArchiveDisplay'
import Image from 'next/image'

export default function ArquivoPage() {
  return (
    <main className="main-dashboard max-w-full">
      <section className="main-split w-full">
        <h2 className="h2-title">Histórico</h2>

        <div className="relative w-full -top-10 h-100 lg:h-[350px]">
          <Image
            src="/images/svg/tiger-chop.svg"
            alt="Ilustração de um tigre"
            fill
            className="object-contain w-full h-full p-0 transform transition-transform duration-300 hover:scale-105 dark:invert"
          />
        </div>

        <ArchiveDisplay />
      </section>
    </main>
  )
}
