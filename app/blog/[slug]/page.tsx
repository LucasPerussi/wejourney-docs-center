import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { fetchBlogPostBySlug } from "lib/blog"

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug)
  if (!post) return notFound()

  return (
    <main className="container py-8">
      <div className="mb-4 flex items-center gap-2">
        {post.tags.map((t) => (
          <Badge key={t} className="capitalize">{t}</Badge>
        ))}
      </div>
      <Card className="overflow-hidden">
        {post.image && <img src={post.image} alt={post.title} className="h-64 w-full object-cover" />}
        <CardHeader>
          <CardTitle className="flex items-end justify-between">
            <span>{post.title}</span>
            <span className="text-sm font-normal text-muted-foreground">{post.date}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          {post.videoUrl ? (
            <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg border border-[var(--border-soft)] dark:bg-[#171717] bg-muted">
              <iframe className="h-full w-full" src={post.videoUrl} title="Vídeo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          ) : null}
          {post.descriptionHtml ? (
            <div dangerouslySetInnerHTML={{ __html: post.descriptionHtml }} />
          ) : (
            <p>{post.excerpt}</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}