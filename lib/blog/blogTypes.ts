export type BlogFiltersProps = {
  sortType: 'date' | 'title' | 'category'
  sortOrder: 'asc' | 'desc'
  categoryFilter: string
  categories: string[]
  onSortTypeChange: (v: 'date' | 'title' | 'category') => void
  onSortOrderChange: (v: 'asc' | 'desc') => void
  onCategoryChange: (v: string) => void
  onBack: () => void
}

export type BlogGridProps = {
  initialPosts: PostMeta[]
}

export type PostMeta = {
  title: string
  date: string
  image: string
  excerpt: string
  category: string
  slug: string
}
