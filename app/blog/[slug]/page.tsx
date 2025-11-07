// Estilos e performance revistos
//

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

import { getAllPostSlugs, getPostBySlug } from '@/lib/blog/posts'

// Componentes usados dentro dos MDX
import LineTable from '@/components/blog/tables/LineTable'
import TrigramTable from '@/components/blog/tables/TrigramTable'
import CoinAccordion from '@/components/blog/accordions/CoinAccordion'
import CoinTable from '@/components/blog/tables/CoinTable'
import YarrowStalkAccordion from '@/components/blog/accordions/YarrowStalkAccordion'
import YarrowStalkTable from '@/components/blog/tables/YarrowStalkTable'
import Image from 'next/image'

const components = {
  TrigramTable,
  LineTable,
  CoinTable,
  YarrowStalkTable,
  YarrowStalkAccordion,
  CoinAccordion,
}

// Gerar caminhos estáticos
export async function generateStaticParams() {
  return getAllPostSlugs()
}

// Publicações individuais
export default async function BlogPostPage({ params }: any) {
  const { meta, content } = await getPostBySlug(params.slug)

  return (
    <article className="mx-auto mt-2 prose prose-lg dark:prose-invert text-justify border rounded-2xl px-6 py-6 md:px-8 md:pb-8">
      {/* 🔹 Header */}
      <header className="mb-6">
        <div className="flex items-center mb-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-amber-500 dark:text-gray-400 transition"
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar ao Blog
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">{meta.title}</h1>

        <div className="text-center text-sm text-gray-500">
          {meta.category && (
            <span className="block sm:inline">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Categoria:
              </span>{' '}
              {meta.category}
            </span>
          )}
          {meta.date && (
            <>
              <span className="hidden sm:inline mx-2">•</span>
              <span className="block sm:inline">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Data:
                </span>{' '}
                {meta.date}
              </span>
            </>
          )}
        </div>
      </header>

      {/* Imagem */}
      {meta.image && (
        <div className="">
          <Image
            src={meta.image}
            alt={meta.title}
            width={800}
            height={400}
            className="rounded-xl w-full min-w-0 h-80 lg:h-128 object-contain object-top "
          />
        </div>
      )}

      {/* Conteúdo MDX */}
      <MDXRemote
        components={components}
        source={content}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </article>
  )
}
