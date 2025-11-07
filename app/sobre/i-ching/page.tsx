import Image from 'next/image'
import Link from 'next/link'

export default function IChingPage() {
  interface GridItem {
    title: string
    imageSrc: string
    buttonText: string
    href: string
  }

  const items: GridItem[] = [
    {
      title: '',
      imageSrc: '/images/new/flying-bird-3.svg',
      buttonText: 'Experimenta',
      href: '/tutorial',
    },
    {
      title: '',
      imageSrc: '/images/new/flying-bird-2.svg',
      buttonText: 'Explora',
      href: '/blog',
    },
    {
      title: '',
      imageSrc: '/images/new/flying-bird.svg',
      buttonText: 'Regista-te',
      href: '/registo',
    },
  ]

  return (
    <main className="min-h-[600px]">
      <section className="max-w-4xl mx-auto px-5 py-8">
        {/* Cabeçalho */}
        <div className="border-b  pb-8 mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-center my-2">
            A influência e sabedoria do I Ching
          </h1>

          <div className="space-y-4 leading-relaxed tracking-wide lg:text-lg">
            <p>
              O Livro das Mutações, ou I Ching, é inquestionavelmente um dos
              livros mais importantes e interessantes da literatura mundial. A
              sua origem está associada a mitologia que remonta à antiguidade, e
              ocupou a atenção dos maiores pensadores chineses até aos dias de
              hoje.
            </p>
            <p>
              Deste modo, podemos dizer que o amadurecer desta sabedoria ao
              longo de milhares de anos foi usado para fazer o I Ching. Por
              isso, não surpreende que os dois principais ramos da filosofia
              chinesa, Confucionismo e Taoismo, tenham raízes comuns aqui.
            </p>
            <p>
              Experimenta o oráculo, explora os nossos conteúdos sobre o I Ching
              e junta-te a nós. Não te vais arrepender.
            </p>
          </div>
        </div>

        {/* Grid - sem max-width extra */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative group rounded-2xl p-4 hover:shadow-lg transition-all"
            >
              {/* Container da imagem com aspect ratio fixo */}
              <div className="aspect-square relative mb-4">
                <Image
                  src={item.imageSrc}
                  alt={item.buttonText}
                  priority
                  fill
                  className="object-contain dark:invert group-hover:scale-105 transition-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Botão */}
              <Link
                href={item.href}
                className="block w-full px-4 py-2 border  rounded-lg
                          hover:border-amber-500 hover:text-amber-500 text-center font-medium
                         transition-all hover:scale-105 text-sm"
              >
                {item.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
