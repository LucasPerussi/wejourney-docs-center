export type Release = {
  version: string
  date: string
  changes: { area: string; description: string }[]
}

export const releases: Release[] = [
  {
    version: "v1.2.0",
    date: "2025-11-14",
    changes: [
      { area: "Docs", description: "Página /docs com abas para código, vídeo e passos" },
      { area: "UI", description: "Adicionados componentes Button, Badge, Card, Tabs" },
      { area: "Blog", description: "Carrossel de banners e galeria de imagens" }
    ]
  },
  {
    version: "v1.1.0",
    date: "2025-11-10",
    changes: [
      { area: "Infra", description: "Setup inicial de Next.js, Tailwind e estrutura App Router" },
      { area: "Design", description: "Tema com tokens e dark mode configurado" }
    ]
  }
]