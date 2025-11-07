import { cache } from 'react'
import BlogGrid from '@/components/blog/BlogGrid'
import { getAllPosts } from '@/lib/blog/posts'
import type { PostMeta } from '@/lib/blog/blogTypes'

const getCachedPosts = cache(async () => getAllPosts())

export default async function BlogPage() {
  const posts: PostMeta[] = await getCachedPosts()
  return <BlogGrid initialPosts={posts} />
}
