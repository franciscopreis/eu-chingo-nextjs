import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="page-content mt-5 lg:mt-0">
      <section className="space-y-5 max-w-2xl mx-auto">
        <div className="text-center space-y-3">
          <div className="mt-3 mb-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
              Eu-Chingo, e tu? Chingas?{' '}
            </h1>
          </div>

          <p className="md:text-xl text-base font-semibold">
            O I Ching, ou Livro das Mutações, é um antigo texto chinês usado
            como oráculo e guia filosófico há pelo menos três milénios.
          </p>
        </div>
        <div className="text-center">
          <div className="flex justify-center items-center">
            <Link href="tutorial">
              <div className="flex w-32 h-85 lg:w-50 lg:h-137 relative overflow-hidden rounded-lg">
                <Image
                  src="/images/svg/human.svg"
                  alt="Descrição da imagem"
                  fill
                  priority
                  className="filter object-cover object-[10%_70%] dark:invert w-full h-auto"
                />
              </div>
            </Link>
            <Link href="tutorial">
              <div className="flex w-32 h-85 lg:w-50 lg:h-137 relative overflow-hidden rounded-lg  -scale-x-100">
                <Image
                  src="/images/svg/human.svg"
                  alt="Descrição da imagem"
                  fill
                  priority
                  className="filter object-cover object-[10%_70%] dark:invert w-full h-auto"
                />
              </div>
            </Link>
          </div>
          <div className="relative -top-50 lg:-top-75">
            <Link href="tutorial">
              <button
                type="button"
                aria-label="Testar uma consulta de I Ching"
                className="text-xs lg:text-sm p-2 border rounded-sm cursor-pointer  shadow-lg
   hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500
   dark:bg-stone-900/85 bg-white/85 font-bold"
              >
                Consulta o I Ching
              </button>
            </Link>
          </div>
          <div className="space-y-3">
            <h2 className="lg:text-2xl md:text-xl text-base text-center px-0 mb-6">
              Através da interpretação dos hexagramas, podemos aprender mais
              sobre nós e sobre o fluxo que conduz o mundo.
            </h2>
          </div>
        </div>
      </section>
    </main>
  )
}
