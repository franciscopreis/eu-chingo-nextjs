import Link from 'next/link'
import type { PostMeta } from '@/lib/blog/blogTypes'

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer border hover:scale-105">
        <img
          src={post.image}
          alt={post.title}
          className="rounded-xl border w-full h-48 object-cover object-top"
          loading="lazy"
        />
        <h2 className="text-xl font-semibold mt-3">{post.title}</h2>
        <p className="text-sm mt-1 text-gray-500">{post.category}</p>
        <p className="text-sm mt-1 text-gray-500">{post.date}</p>
        <p className="text-sm mt-1">{post.excerpt}</p>
      </article>
    </Link>
  )
}
