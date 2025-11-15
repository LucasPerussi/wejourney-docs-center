import Link from "next/link"
import { Button } from "components/ui/button"
import { Card, CardContent } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { BookOpen, FileText, Package, Activity, Globe, Newspaper } from "lucide-react"

export default function HomePage() {
  return (
    <main className="container py-12">
      <div className="mb-8">
        <Badge>Bem-vindo</Badge>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Centro de Documentação</h1>
        <p className="text-muted-foreground">Explore a documentação, release notes e conteúdos do blog.</p>
      </div>

      <div className="relative">
        <div className="animated-gradient-local -z-10"></div>
        <div className="relative z-10 grid grid-cols-12 auto-rows-[220px] gap-6">
        <Card className="col-span-12 md:col-span-6 lg:col-span-4 h-full backdrop-blur-md bg-white/40 dark:bg-[#171717]/50 border border-[var(--border-soft)] shadow-lg">
          <CardContent className="p-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Documentação</h2>
            <p className="mt-1 text-sm text-muted-foreground">Guias, códigos e vídeos passo a passo.</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/docs">Abrir Documentação</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4 h-full backdrop-blur-md bg-white/40 dark:bg-[#171717]/50 border border-[var(--border-soft)] shadow-lg">
          <CardContent className="p-6">
            <Package className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Release Notes</h2>
            <p className="mt-1 text-sm text-muted-foreground">Novidades e mudanças por versão.</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/releases">Ver Releases</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4 h-full backdrop-blur-md bg-white/40 dark:bg-[#171717]/50 border border-[var(--border-soft)] shadow-lg">
          <CardContent className="p-6">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Blog</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tutoriais, anúncios e boas práticas.</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/blog">Ler Blog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4 h-full backdrop-blur-md bg-white/40 dark:bg-[#171717]/50 border border-[var(--border-soft)] shadow-lg">
          <CardContent className="p-6">
            <Globe className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Sistema Principal</h2>
            <p className="mt-1 text-sm text-muted-foreground">Acesse o sistema em produção.</p>
            <div className="mt-4">
              <Button asChild>
                <a href="https://wejourney.com.br" target="_blank" rel="noopener noreferrer">Ir para wejourney.com.br</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4 h-full backdrop-blur-md bg-white/40 dark:bg-[#171717]/50 border border-[var(--border-soft)] shadow-lg">
          <CardContent className="p-6">
            <Activity className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Status de Serviço</h2>
            <p className="mt-1 text-sm text-muted-foreground">Disponibilidade e incidentes.</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/status">Ver Status</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 lg:col-span-4 h-full backdrop-blur-md bg-white/40 dark:bg-[#171717]/50 border border-[var(--border-soft)] shadow-lg">
          <CardContent className="p-6">
            <Newspaper className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Notícias</h2>
            <p className="mt-1 text-sm text-muted-foreground">Atualizações e comunicados.</p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/noticias">Ler Notícias</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </main>
  )
}