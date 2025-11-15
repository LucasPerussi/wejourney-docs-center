import { fetchBlogPosts } from "lib/blog"
import { news } from "../noticias/data"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import Link from "next/link"
import { Badge } from "components/ui/badge"

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").toLowerCase()
  const allPosts = await fetchBlogPosts()

  const matchesPost = (t: string) => t.toLowerCase().includes(q)
  const posts = q
    ? allPosts.filter(
        (p) => matchesPost(p.title) || matchesPost(p.excerpt) || p.tags.some((t) => matchesPost(t))
      )
    : []

  const notícias = q
    ? news.filter(
        (n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q) || n.tags.some((t) => matchesPost(t))
      )
    : []

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight">Buscar</h1>
      <p className="text-muted-foreground">Resultados para "{q}"</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Posts do Blog</h2>
        {posts.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nenhum resultado.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="overflow-hidden">
                <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    <span className="text-sm font-normal text-muted-foreground">{post.date}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <Badge key={t} className="capitalize">{t}</Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Notícias</h2>
        {notícias.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nenhum resultado.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notícias.map((n) => (
              <Card key={n.id} className="overflow-hidden">
                {n.image && <img src={n.image} alt={n.title} className="h-40 w-full object-cover" />}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{n.title}</span>
                    <span className="text-sm font-normal text-muted-foreground">{n.date}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {n.tags.map((t) => (
                      <Badge key={`${n.id}-${t}`} className="capitalize">{t}</Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}