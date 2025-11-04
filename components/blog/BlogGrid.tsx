'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { type PostMeta } from '@/lib/blog/posts'

interface BlogGridProps {
  initialPosts: PostMeta[]
}

export default function BlogGrid({ initialPosts }: BlogGridProps) {
  const router = useRouter()
  const [sortType, setSortType] = useState<'date' | 'title' | 'category'>(
    'date'
  )
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Extrair categorias únicas
  const categories = useMemo(() => {
    return Array.from(new Set(initialPosts.map((p) => p.category)))
  }, [initialPosts])

  // Filtrar e ordenar posts
  const filteredPosts = useMemo(() => {
    let posts = initialPosts
    if (categoryFilter !== 'all') {
      posts = posts.filter((p) => p.category === categoryFilter)
    }

    return posts.sort((a, b) => {
      if (sortType === 'date') {
        return sortOrder === 'desc'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortType === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      } else {
        return sortOrder === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category)
      }
    })
  }, [initialPosts, sortType, sortOrder, categoryFilter])

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* Header: voltar + filtros/ordenacao */}
      <div className="flex flex-wrap justify-between items-center mb-3 gap-2 md:px-5">
        <button
          onClick={() => redirect('/')}
          className="md:text-sm text-xs px-3 py-1 border rounded-lg hover:text-amber-500 transition cursor-pointer"
        >
          ← Voltar
        </button>

        <div className="flex  items-center gap-2">
          {/* Sort Type */}
          <label htmlFor="sortType" className="sr-only">
            Ordenar por
          </label>
          <select
            id="sortType"
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value as 'date' | 'title' | 'category')
            }
            className="border rounded-lg px-3 py-1  hover:text-amber-500 transition cursor-pointer md:text-sm text-xs"
          >
            <option value="date">Data</option>
            <option value="title">Nome</option>
            <option value="category">Tema</option>
          </select>

          {/* Sort Order */}
          <label htmlFor="sortOrder" className="sr-only">
            Ordem
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="border rounded-lg px-3 py-1 md:text-sm text-xs hover:text-amber-500 transition cursor-pointer"
          >
            <option value="desc">Desc.</option>
            <option value="asc">Asc.</option>
          </select>

          {/* Category Filter */}
          <label htmlFor="categoryFilter" className="sr-only">
            Filtrar por categoria
          </label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-3 py-1 md:text-sm text-xs hover:text-amber-500 transition cursor-pointer"
          >
            <option value="all">Tudo</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer border hover:scale-105">
              <img
                src={post.image}
                alt={post.title}
                className="rounded-xl border w-full h-48 object-cover object-top"
              />
              <h2 className="text-xl font-semibold mt-3">{post.title}</h2>
              <p className="text-sm mt-1 text-gray-500">{post.category}</p>
              <p className="text-sm mt-1 text-gray-500">{post.date}</p>
              <p className="text-sm mt-1">{post.excerpt}</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}
