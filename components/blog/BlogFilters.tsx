'use client'

import type { BlogFiltersProps } from '@/lib/blog/blogTypes'

export default function BlogFilters({
  sortType,
  sortOrder,
  categoryFilter,
  categories,
  onSortTypeChange,
  onSortOrderChange,
  onCategoryChange,
  onBack,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap justify-between items-center mb-3 gap-2 md:px-5 w-full">
      <button
        onClick={onBack}
        className="md:text-sm text-xs px-3 py-1 border rounded-lg hover:text-amber-500 transition cursor-pointer"
      >
        ← Voltar
      </button>

      <div className="flex items-center gap-2">
        {/* Sort Type */}
        <select
          title={'O que ordenar'}
          aria-label="O que ordenar"
          value={sortType}
          onChange={(e) => onSortTypeChange(e.target.value as any)}
          className="border rounded-lg px-3 py-1 hover:text-amber-500 transition cursor-pointer md:text-sm text-xs"
        >
          <option value="date">Data</option>
          <option value="title">Nome</option>
          <option value="category">Tema</option>
        </select>

        {/* Sort Order */}
        <select
          title={'Ordenar'}
          aria-label="Ordenar"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as any)}
          className="border rounded-lg px-3 py-1 md:text-sm text-xs hover:text-amber-500 transition cursor-pointer"
        >
          <option value="descendente">Desc.</option>
          <option value="ascendente">Asc.</option>
        </select>

        {/* Category */}
        <select
          title={'Filtrar'}
          aria-label="Filtrar"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
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
  )
}
