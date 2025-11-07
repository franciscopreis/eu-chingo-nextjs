import Image from 'next/image'

export default function ProjectPage() {
  return (
    <section className="flex flex-col mx-auto px-5 md:py-8 gap-3">
      <h2 className="text-xl md:text-2xl font-bold text-center  ">
        Chinga comigo, baby
      </h2>
      <div className="flex flex-col items-center lg:gap-x-0">
        <div className="  space-y-4  tracking-wide">
          <p className="text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide">
            O meu interesse pelo I Ching começou há mais de dez anos, após ter
            aprendido acerca de algumas filosofias orientais, onde encontrei
            alguns conceitos como o Yin Yang e o Tao que eventualmente me
            levaram ao I Ching. Ao longo dos anos, fui-me apercebendo da riqueza
            do I Ching para lá do seu estatuto oracular, mas mais como um
            sistema filosófico ou até mesmo um registo cultural, antropológico
            ou meramente humano que acabou por influenciar em muito a minha
            forma de ver as coisas..
          </p>
          <p className="p-primary"></p>
          <p className="text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide">
            Recentemente decidi aprender web developing um pouco mais a sério, e
            este projecto pareceu ser a melhor forma de criar uma ferramenta
            útil e mostrar alguns dos meus conhecimentos de programação. Por
            outro, simultaneamente, espero conseguir cativar mais pessoas, em
            particular público lusófono, para a sabedoria e profundidade do I
            Ching.
          </p>
        </div>
        <div className=" lg:pl-2  py-5 mt-5">
          <Image
            src="/images/svg/robe-guy-png.svg"
            priority
            width={755}
            height={1075}
            alt="Homem de robe"
            className="h-auto dark:invert lg:w-100 w-80 hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col items-center  justify-between py-5">
        <div className="  space-y-4 flex flex-col gap-2  tracking-wide">
          <h2 className="pl-2  text-xl md:text-2xl font-bold my-2  text-left mb-0">
            Abordagem técnica
          </h2>
          <p className="text-base md:text-lg  whitespace-pre-line ">
            Sumariamente, esta <strong>aplicação full stack</strong> foi feita
            usando Next.js 15 com App Router, Typescrypt para tipagem segura e
            Tailwind CSS para estilização.
          </p>
          <p className="text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide">
            Em termos de back-end, usei Next API Routes e inicialmente, em
            desenvolvimento, usei uma base de dados local em SQL, sendo que em
            produção passei para o Turso (edge database compatível com SQLite).
          </p>

          <h2 className="pl-2  text-xl md:text-2xl font-bold my-2  text-left mb-0">
            Funcionalidades
          </h2>
          <p className="text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide">
            De seguida apresento algumas das funcionalidades que foram
            integradas nesta primeira versão e que poderão testar após registo:
          </p>
          <ul className="list-disc list-inside space-y-1 text-base md:text-lg whitespace-pre-line leading-relaxed tracking-wide">
            <li>
              <strong>Sistema de divinação completo</strong> - método das moedas
              com logs detalhados e três modos de visualização
            </li>
            <li>
              <strong>Autenticação</strong> - com sessões seguras através de JWT
            </li>
            <li>
              <strong>Gestão de conta completa</strong> - mudança de
              email/password, eliminação de conta, formulário de contacto
            </li>
            <li>
              <strong>Persistência avançada</strong> - histórico de leituras com
              notas pessoais e edição em tempo real
            </li>
            <li>
              <strong>Conteúdos (quase) completos</strong> - textos tradicionais
              para todos os 64 hexagramas no que diz respeito a Julgamento,
              Imagem e Linhas que serão atualizados com mais comentários
            </li>
            <li>
              <strong>Blogue técnico integrado</strong> - sistema MDX com
              filtros e ordenação, que disponibiliza alguns artigos sobre o I
              Ching
            </li>
            <li>
              <strong>UX responsiva</strong> - design mobile-first, dark/light
              mode, interface adaptável
            </li>
            <li>
              <strong>Outras integrações</strong> - integrei SendGrid para
              verificação de emails e Stripe para pagamentos
            </li>
          </ul>
        </div>{' '}
        <div className=" lg:px-2 flex flex-col mx-auto py-5 mt-5">
          <Image
            src="/images/new/swordsman.svg"
            priority
            width={780}
            height={1192}
            alt="Homem de perfil com uma espada"
            className="dark:invert lg:w-100 w-80 hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-col items-center lg:gap-x-5 justify-between py-5">
        <div className="  space-y-4 flex flex-col gap-2">
          <h2 className="pl-2  text-xl md:text-2xl font-bold my-2  text-left mb-0">
            Implementações futuras
          </h2>
          <p className="text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide">
            Tenho já algumas funcionalidades que tenho em mente para serem
            integradas numa nova versão e que espero implementar em breve, se o
            tempo assim o permitir. Aqui vão alguns exemplos:
          </p>
          <ul className="list-disc list-inside space-y-1 text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide">
            <li>
              <strong>Traduções para português</strong> - Tornar o I Ching mais
              acessível ao público lusófono
            </li>
            <li>
              <strong>Novos métodos de divinação</strong> - Método dos talos de
              milefólio e método das moedas modificado
            </li>
            <li>
              <strong>Input manual de hexagramas</strong> - Para utilizadores
              que queiram fazer a sua leitura por si mesmos e usar a plataforma
              para interpretar
            </li>
            <li>
              <strong>Funcionalidades sociais</strong> - Partilha de leituras
              com links privados, discussão de interpretações
            </li>
          </ul>
        </div>{' '}
        <div className="flex flex-col mx-auto">
          <Image
            src="/images/new/two-guys.svg"
            width={780}
            height={1192}
            alt="Dois homens sentados no chão a comer"
            className="dark:invert lg:w-100 w-80 hover:scale-105"
          />
        </div>
      </div>
      <div className="lg:w-100  mx-auto  text-center mt-6 p-4 border rounded-lg">
        <p className="text-lg md:text-xl  whitespace-pre-line    leading-relaxed tracking-wide font-medium mb-2 text-center">
          Vê como funciona o Eu-Chingo
        </p>
        <p className="text-base md:text-lg  whitespace-pre-line    leading-relaxed tracking-wide text-justify">
          O projecto está disponível no GitHub. Fica à vontade para explorar,
          dar feedback ou contribuir.
        </p>
        <button
          aria-label="Ver no GitHub"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 px-4 py-2rounded-lg hover:opacity-90 transition-opacity"
        >
          <a
            className="border rounded-md p-2 hover:text-amber-500"
            href="https://github.com/franciscopreis/eu-chingo-nextjs"
          >
            Ver no GitHub
          </a>
        </button>
      </div>
    </section>
  )
}
