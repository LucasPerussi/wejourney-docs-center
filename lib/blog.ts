export type ApiContent = {
  cnt_id: number
  cnt_title: string
  cnt_description: string
  cnt_tags: string
  cnt_contentLink?: string
  cnt_banner?: string
  cnt_publicBanner?: string
  cnt_date?: string
  cnt_unique?: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  image?: string
  date?: string
  tags: string[]
  descriptionHtml?: string
  videoUrl?: string
}

const cleanUrl = (u?: string) => {
  if (!u) return undefined
  return u.replace(/`/g, "").trim()
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://api.wetalkit.com.br/contents/all-public", { cache: "no-store" })
    if (!res.ok) return []
    const data: ApiContent[] = await res.json()
    return (data || []).map((c) => ({
      slug: (c.cnt_unique || String(c.cnt_id || "")).trim(),
      title: c.cnt_title,
      excerpt: c.cnt_textPreview || c.cnt_description?.replace(/<[^>]+>/g, " ").slice(0, 160) || "",
      image: cleanUrl(c.cnt_publicBanner) || cleanUrl(c.cnt_banner),
      date: c.cnt_date,
      tags: (c.cnt_tags || "").split(/\s+/).filter(Boolean).slice(0, 6),
      descriptionHtml: c.cnt_description,
      videoUrl: cleanUrl(c.cnt_contentLink)
    }))
  } catch {
    return []
  }
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await fetchBlogPosts()
  return posts.find((p) => p.slug === slug)
}