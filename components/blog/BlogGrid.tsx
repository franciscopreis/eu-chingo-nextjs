'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { PostMeta } from '@/lib/blog/blogTypes'
import BlogFilters from './BlogFilters'
import BlogCard from './BlogCard'
import { sortPosts } from '@/lib/blog/blogUtils'

type BlogGridProps = {
  initialPosts: PostMeta[]
}

export default function BlogGrid({ initialPosts }: BlogGridProps) {
  const router = useRouter()
  const [sortType, setSortType] = useState<'date' | 'title' | 'category'>(
    'date'
  )
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // Categorias únicas
  const categories = useMemo(
    () => Array.from(new Set(initialPosts.map((p) => p.category))),
    [initialPosts]
  )

  // Filtrar e ordenar
  const filteredPosts = useMemo(() => {
    let posts = initialPosts
    if (categoryFilter !== 'all') {
      posts = posts.filter((p) => p.category === categoryFilter)
    }
    return posts.sort((a, b) => sortPosts(a, b, sortType, sortOrder))
  }, [initialPosts, sortType, sortOrder, categoryFilter])

  return (
    <main className="p-6 max-w-6xl mx-auto items-center justify-center w-full">
      <BlogFilters
        sortType={sortType}
        sortOrder={sortOrder}
        categoryFilter={categoryFilter}
        categories={categories}
        onSortTypeChange={setSortType}
        onSortOrderChange={setSortOrder}
        onCategoryChange={setCategoryFilter}
        onBack={() => router.push('/')}
      />

      {/* Grid de posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}
