import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { news } from "./data"

export default function NoticiasPage() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight">Notícias</h1>
      <p className="text-muted-foreground">Atualizações e comunicados.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
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
    </main>
  )
}