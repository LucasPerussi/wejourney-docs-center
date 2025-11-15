"use client"
import { useState } from "react"
import { Button } from "components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import { Copy } from "lucide-react"
import { Slider } from "components/ui/slider"

type Step = { title: string; description: string }
type DocItem = {
  id: string
  title: string
  code: string
  videoUrl?: string
  steps: Step[]
}

const items: DocItem[] = [
  {
    id: "next-setup",
    title: "Setup de Projeto Next",
    code: `npx create-next-app@latest docsblog --ts --tailwind --eslint --app`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    steps: [
      { title: "Criar projeto", description: "Inicialize o projeto com o comando acima" },
      { title: "Rodar dev", description: "Execute npm run dev para iniciar o servidor" }
    ]
  },
  {
    id: "shadcn-button",
    title: "Componente Button",
    code: `import { Button } from "components/ui/button"\n<Button>Salvar</Button>`,
    steps: [
      { title: "Importar", description: "Importe o componente conforme o exemplo" },
      { title: "Usar", description: "Utilize variantes como variant=\"secondary\"" }
    ]
  }
  ,
  {
    id: "slider",
    title: "Componente Slider",
    code: `import { Slider } from "components/ui/slider"\n<Slider defaultValue={[33]} max={100} step={1} />`,
    steps: [
      { title: "Importar", description: "Importe o componente Slider" },
      { title: "Configurar", description: "Ajuste defaultValue, max e step conforme necessidade" }
    ]
  }
]

export default function DocsPage() {
  const [selected, setSelected] = useState<DocItem>(items[0])

  return (
    <div className="grid min-h-screen grid-cols-12">
      <aside className="col-span-3 border-r border-[var(--border-soft)] bg-muted/30 p-4">
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdos</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className={
                selected.id === item.id
                  ? "w-full rounded-md bg-background px-3 py-2 text-left text-sm shadow"
                  : "w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
              }
            >
              {item.title}
            </button>
          ))}
        </div>
      </aside>

      <main className="col-span-9 p-8">
        <div className="mb-6 flex items-center gap-2">
          <Badge>Docs</Badge>
          <h1 className="text-2xl font-bold tracking-tight">{selected.title}</h1>
        </div>

        <Tabs defaultValue="code">
          <TabsList>
            <TabsTrigger value="code">Código</TabsTrigger>
            <TabsTrigger value="video">Vídeo</TabsTrigger>
            <TabsTrigger value="steps">Passo a passo</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Exemplo de uso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="rounded-md border border-[var(--border-soft)] dark:bg-[#171717] bg-muted p-4 text-sm">
                    <code>{selected.code}</code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => navigator.clipboard.writeText(selected.code)}
                  >
                    <Copy className="mr-2 h-4 w-4" /> Copiar
                  </Button>
                </div>
                {selected.id === "slider" && (
                  <div className="mt-6">
                    <Slider defaultValue={[33]} max={100} step={1} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="video" className="mt-4">
            {!selected.videoUrl ? (
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Sem vídeo para este item.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-[var(--border-soft)] dark:bg-[#171717] bg-muted">
                <iframe
                  className="h-full w-full"
                  src={selected.videoUrl}
                  title="Vídeo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="steps" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Passos</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {selected.steps.map((step, i) => (
                    <li key={i} className="rounded-md border border-[var(--border-soft)] p-3">
                      <div className="font-medium">{i + 1}. {step.title}</div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}