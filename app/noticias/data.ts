export type News = { id: string; title: string; date: string; tags: string[]; excerpt: string; image?: string }

export const news: News[] = [
  { id: "n1", title: "Lançamento de novos componentes", date: "2025-11-14", tags: ["UI", "Componentes"], excerpt: "Apresentamos novos Cards, Tabs e Badges para acelerar sua documentação.", image: "https://picsum.photos/id/1015/800/400" },
  { id: "n2", title: "Status page disponível", date: "2025-11-13", tags: ["Infra"], excerpt: "Acompanhe disponibilidade e incidentes em tempo real.", image: "https://picsum.photos/id/1020/800/400" },
  { id: "n3", title: "Guia de publicação", date: "2025-11-12", tags: ["Docs"], excerpt: "Veja como publicar códigos, vídeos e passo a passo de forma padronizada." }
]