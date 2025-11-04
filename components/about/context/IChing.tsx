'use client'

import Image from 'next/image'

export default function IChing() {
  interface GridItem {
    title: string
    imageSrc: string
    buttonText: string
    href?: string
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

  // const items: GridItem[] = [
  //   {
  //     title: 'Faz uma consulta',
  //     imageSrc: '/images/new/flying-bird.svg',
  //     buttonText: 'Experimenta',
  //     href: '/tutorial',
  //   },
  //   {
  //     title: 'Aprende mais',
  //     imageSrc: '/images/new/dog.svg',
  //     buttonText: 'Explora',
  //     href: '#',
  //   },
  //   {
  //     title: 'Junta-te a nós',
  //     imageSrc: '/images/new/chicken.svg',
  //     buttonText: 'Regista-te',
  //     href: '/registo',
  //   },
  // ]

  return (
    <section className="main-section max-w-2xl justify-center mx-auto px-5">
      {/* Primeira seção (acima da dobra) */}
      <div className="content-split flex-col border-b pb-2">
        <h2 className="h2-title">O contexto e história resumida do I Ching</h2>
        <h3 className="pl-3 h3-title">Influência na cultura chinesa</h3>
        <div className="max-w-2xl tracking-wider">
          <p className="p-primary">
            O Livro das Mutações, ou I Ching, é inquestionavelmente um dos
            livros mais importantes e interessantes da literatura mundial. A sua
            origem está associada a mitologia que remonta à antiguidade, e
            ocupou a atenção dos maiores pensadores chineses até aos dias de
            hoje. Quase todos os grandes nomes dos três mil anos de história
            cultural chinesa retiraram inspiração deste livro, e por vezes
            exerceram influência sobre a interpretação do seu texto.
          </p>
          <p className="p-primary">
            Deste modo, podemos dizer que o amadurecer desta sabedoria ao longo
            de milhares de anos foi usado para fazer o I Ching. Por isso, não
            surpreende que os dois principais ramos da filosofia chinesa,
            Confucionismo e Taoismo, tenham raízes comuns aqui. Como vês não te
            faltam razões para te juntares a nós nesta descoberta pelo I Ching.
          </p>
        </div>
      </div>
      {/* <div className="content-side md:mt-8">
          <Image
            src="/images/svg/circle-hexagrams.svg"
            width={300}
            height={300}
            alt="Ilustração de um diagrama presente no Gujin Tushu Jicheng (1700-1725)"
            quality={75}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="w-[225px] h-auto m-2 dark:invert"
          />
          <p className="p-caption">
            Ilustração de um diagrama presente no Gujin Tushu Jicheng
            (1700-1725)
          </p>
        </div> */}

      {/* Grelha de 3 itens */}
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 mt-8 max-w-2xl">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative w-full rounded-2xl overflow-hidden   transition"
          >
            {/* Imagem */}
            <Image
              priority
              src={item.imageSrc}
              alt={item.title}
              width={400}
              height={400}
              className="object-contain dark:invert hover:scale-105 "
            />

            {/* Overlay com botão/texto */}
            <div className="absolute  inset-0 flex flex-col justify-center items-center opacity-100 lg:opacity-70  transition  ">
              <h3 className="text-lg font-semibold mb-2 opacity-100">
                {item.title}
              </h3>
              <a
                href={item.href}
                className="px-4 py-2 border rounded-lg hover:scale-105 transition  dark:bg-black hover:text-amber-500 text-center justify-center mx-auto bg-white "
              >
                {item.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
