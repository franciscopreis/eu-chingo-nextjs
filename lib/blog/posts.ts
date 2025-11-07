import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import type { PostMeta } from './blogTypes'

const postsDir = path.join(process.cwd(), 'content/blog')

async function readPostFile(slug: string) {
  const filePath = path.join(postsDir, `${slug}.mdx`)
  const fileContent = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  return { data, content }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(postsDir)

  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const { data } = await readPostFile(slug)
      return { ...data, slug } as PostMeta
    })
  )

  return posts
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const files = await fs.readdir(postsDir)
  return files.map((filename) => ({
    slug: filename.replace(/\.mdx?$/, ''),
  }))
}

export async function getPostBySlug(slug: string): Promise<{
  meta: PostMeta
  content: string
}> {
  const { data, content } = await readPostFile(slug)
  return { meta: { ...data, slug } as PostMeta, content }
}
