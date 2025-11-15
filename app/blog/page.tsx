import Link from "next/link"
import { Carousel } from "components/ui/carousel"
import { Card, CardContent } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { fetchBlogPosts } from "lib/blog"

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts()
  const banners = posts
    .filter((p) => p.image)
    .slice(0, 5)
    .map((p, idx) => ({ id: `b-${idx}`, image: p.image!, title: p.title, description: p.excerpt }))

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="text-muted-foreground">Carrosséis de banners, galerias e posts.</p>

      {banners.length > 0 && (
        <div className="mt-6">
          <Carousel items={banners} />
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Posts recentes</h2>
        {posts.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">Nenhum post disponível.</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="flex min-h-[320px] flex-col overflow-hidden">
                {post.image && <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />}
                <CardContent className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <Badge key={t} className="capitalize">{t}</Badge>
                    ))}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <Button asChild size="sm">
                      <Link href={`/blog/${post.slug}`}>Ler mais</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}