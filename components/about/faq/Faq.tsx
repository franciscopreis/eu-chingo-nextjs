'use client'

import { useState } from 'react'
import AccordionItem from '../../ui/AccordionItem'
import Image from 'next/image'

export default function Faq() {
  const faqs = [
    {
      question: 'O que é o I Ching?',
      answer: (
        <>
          O I Ching, ou Livro das Mutações, é um dos mais antigos textos
          chineses. É usado quer para efeitos de adivinhação tal como fonte de
          sabedoria. Assim, é um livro que tem um potencial tremendo no que
          respeita a conduzir a reflexões pessoais e filosóficas profundas,
          tanto sobre nós mesmos como sobre o mundo que nos rodeia, permitindo
          assim interpretar um pouco melhor o fluxo que rege as mudanças nas
          nossas vidas. Ver{' '}
          <a href="/blog/historia_e_desenvolvimentos">
            <u>história do I Ching</u>
          </a>{' '}
          e fundamentos (
          <a href="/blog/principio_fundamental_do_yin_yang">
            <u>yin-yang</u>
          </a>
          ,{' '}
          <a href="/blog/transicao_e_as_imagens_dos_trigramas">
            <u>trigramas</u>
          </a>{' '}
          e{' '}
          <a href="http://localhost:3001/blog/sessenta_e_quatro_hexagramas_e_a_mudanca">
            <u>hexagramas</u>
          </a>
          )
        </>
      ),
    },
    {
      question: 'Como funciona uma consulta do I Ching?',
      answer: (
        <>
          Tradicionalmente, uma consulta envolve formular uma pergunta e gerar
          um hexagrama (figura composta por seis linhas inteiras ou partidas),
          geralmente através de um dos métodos (
          <a href="/blog/metodo_das_moedas">
            <u>método das moedas</u>
          </a>{' '}
          e{' '}
          <a href="/blog/metodo_dos_talos_de_milefolio">
            <u>método do milefólio</u>
          </a>
          ). Cada linha representa um aspecto do momento presente e do movimento
          em curso. O texto associado ao hexagrama e às suas linhas fornece
          orientação simbólica.
        </>
      ),
    },
    {
      question: 'O I Ching “adivinha” o futuro?',
      answer: (
        <>
          Não propriamente. O I Ching não prevê o futuro, mas reflete o presente
          de forma profunda, mostrando padrões e tendências que podem conduzir a
          certos desfechos. No meu entender, o I Ching permite-nos reflectir
          sobre o estado presente das coisas e eventuais mudanças que poderão
          ocorrer, orientando a nossa consciência para uma melhor compreensão do
          mundo ao nosso redor, ajudando também a informar as nossas decisões.
        </>
      ),
    },
    {
      question: 'Como posso fazer uma leitura?',
      answer: (
        <>
          Existem vários métodos (
          <a href="/blog/metodo_das_moedas">
            <u>método das moedas</u>
          </a>{' '}
          e{' '}
          <a href="/blog/metodo_dos_talos_de_milefolio">
            <u>método do milefólio</u>
          </a>
          ) e ambos consistem em obter uma sequência de seis valores com valores
          entre 6 e 9, ainda que com probabilidades diferentes. Dos dois, o
          método das moedas é o mais fácil de usar e, por enquanto, é o método
          que suporta as leituras do Eu-Chingo. Planeio num futuro próximo
          incluir o método dos milefólios (ou o método das moedas modificado).
          De qualquer modo, o método em si, não importa demasiado, mas sim a
          intenção da pergunta e da interpretação. O objectivo é obter dois
          hexagramas numa leitura, que podem ser diferentes ou iguais consoantes
          a mutabilidade das linhas que o formam.
        </>
      ),
    },
    {
      question: 'Que tipo de perguntas posso fazer?',
      answer: (
        <>
          Perguntas sobre situações, decisões ou momentos de transição.
          Geralmente perguntas simples sobre momentos certos são as que podem
          originar leituras mais enriquecedoras. Perguntas de sim ou não não, ou
          perguntas demasiado específicas devem ser evitadas, dado que o I Ching
          fala em movimentos e processos, não em certezas.
        </>
      ),
    },
    {
      question: 'O que é um hexagrama?',
      answer: (
        <>
          Um hexagrama é uma figura formada por seis linhas horizontais,
          partidas (yin) ou inteiras (yang), e, fundamentalmente, por dois
          trigramas (figura com três linhas), superior e inferir, que o compõem.
          Existem 64 combinações possíveis e cada uma com o seu significado.{' '}
          <a href="/blog/sessenta_e_quatro_hexagramas_e_a_mudanca">
            Ver <u>hexagramas</u>.
          </a>
        </>
      ),
    },
    {
      question: 'O que são linhas mutantes?',
      answer: (
        <>
          Durante uma leitura, algumas linhas podem ser “mutantes” — indicando
          mudança em curso. Essas linhas mostram onde a transformação está a
          acontecer e geram um hexagrama secundário, que representa o estado
          futuro ou resultado do movimento. Fundamentalmente, existem quatro
          tipo de linhas: yin mutante (6), yang fixa (7), yin fixa (8) e yang
          mutante (9). Caso uma leitura tenha uma sequência com os valores 6 e
          9, vai forçosamente gerar um segundo hexagrama que será diferente e
          que indica as mudanças em curso. Ver{' '}
          <a href="/blog/principio_fundamental_do_yin_yang">
            <u>yin-yang</u>
          </a>
          .
        </>
      ),
    },
    {
      question: 'Preciso de acreditar para o I Ching funcionar?',
      answer: (
        <>
          Não. O I Ching tem mais de reflexão e interpretação, do que de fé.
          Exigindo apenas alguma abertura e criatividade ao interpretar cada
          leitura. Este projecto baseia-se mais em dar a conhecer o I Ching numa
          óptica mais filosófica, antropológica, cultural e até mesmo poética,
          do que numa perspetiva oracular. De um modo racional, podemos ver o I
          Ching como uma forma de não só nos levar a pensar nas coisas, como a
          tentar encontrar um espelho simbólico nos hexagramas e ver as
          situações que nos rodeiam sob uma nova luz. Uma luz que ilumina a
          forma como vemos as mudanças no nosso dia-a-dia e a curiosa dinâmica
          entre a nossa consciência e intuição.
        </>
      ),
    },

    {
      question: 'Posso usar o I Ching todos os dias?',
      answer: (
        <>
          Sim, se for feito com respeito e propósito é totalmente possível e até
          aconselhável. É uma prática que pode ser considerada nas nossas vidas
          da mesma forma que escrever um diário ou até mesmo meditar. Além
          disso, em matéria de criatividade, também é muito útil por nos dar um
          contexto com o qual podemos dialogar, que para além de transmitir uma
          sabedoria milenar, também o faz através de diversos elementos
        </>
      ),
    },
    {
      question: 'Como interpretar as respostas?',
      answer: (
        <>
          De um modo mais básico e fundamental, ler os textos de cada hexagrama
          (Julgamento e Imagem) e de seguida as linhas dos hexagramas (em
          particular aquelas que são mutantes) e relacionar com a pergunta que
          foi feita. Atendendo a que o I Ching expressa-se através de imagens e
          metáforas, é o papel do divinador tentar perceber a relação entre o
          símbolo e a situação e encontrar o padrão. No meu entender, o
          desenvolvimento de um modelo interpretativo próprio faz todo o sentido
          e naturalmente irá ocorrer à medida que são feitas mais leituras e
          compreendido a linguagem e os arquétipos que o texto nos oferece.
          Tentar interpretar os hexagramas antes de ler o texto, meramente
          através da justaposição dos trigramas, ou tentar ver nestes trigramas
          os elementos naturais que representam, são exemplos de boas práticas
          que enriqueceram as minhas leituras.
        </>
      ),
    },
    {
      question: 'O que torna este site especial?',
      answer: (
        <>
          Este{' '}
          <a href="/sobre/projecto">
            <u>projecto</u>
          </a>{' '}
          teve como objectivo inicial treinar-me em programação e criar uma
          ferramenta que me pudesse ajudar a estudar e a interpretar o I Ching.
          Com o tempo e com a minha admiração pelo I Ching, achei que esta
          ferramenta poderia ser partilhada tendo também como objectivo
          consciencializar as pessoas para as qualidades deste texto. Deste
          modo, é um projecto pessoal que inclui algumas funcionalidades que,
          oxalá, podem fazer as pessoas interessarem-se pelo I Ching.
        </>
      ),
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="main-split space-y-8">
      <h2 className="h2-title text-center lg:mb-5">Perguntas e respostas</h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-4xl mx-auto">
        {/* Conteúdo principal */}
        <div className="flex-1">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                title={faq.question}
                isOpen={openIndex === index}
                onToggle={() => toggleIndex(index)}
              >
                <div className="text-sm leading-relaxed p-primary">
                  {faq.answer}
                </div>
              </AccordionItem>
            ))}
          </div>
        </div>

        {/* Imagem lateral */}
        <div className="lg:w-80 flex justify-center">
          <div className="relative w-64 h-96 lg:w-80 lg:h-[500px]">
            <Image
              src="/images/svg/lady-png.svg"
              alt="Ilustração de uma mulher chinesa a segurar um longo vestido e com o cabelo adornado de flores"
              fill
              className="object-contain hover:scale-105 transition-transform duration-300 dark:invert"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
