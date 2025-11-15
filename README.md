# Central WeJourney — DocsBlog

Projeto em Next.js que reúne documentação de sistema, blog público (via API), release notes, status de serviços e uma navbar responsiva com comando de busca (Command Palette). Inclui tema com paleta OKLCH e um gradiente animado na Home.

## Visão Geral
- Framework: Next.js 14 (App Router, Server/Client Components)
- UI: Tailwind CSS e componentes no estilo shadcn/ui (Button, Badge, Card, Tabs, Command)
- Ícones: lucide-react
- Tema: Paleta OKLCH com tokens customizados e suporte a claro/escuro
- Conteúdos: Blog consumindo API pública Wetalkit
- Status: Painel com serviços chave e checagem da API
- UX: Navbar responsiva, Command Palette com atalhos e gradiente animado na Home

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm (ou pnpm/yarn, se preferir adaptar scripts)

## Instalação e Execução
```bash
npm install
npm run dev
```
- Dev: abre em `http://localhost:3000`
- Build: `npm run build`
- Produção: `npm run start`

## Scripts
- `dev`: inicia o servidor de desenvolvimento
- `build`: gera a build de produção
- `start`: sobe a aplicação em modo produção
- `lint`: executa ESLint

## Estrutura de Pastas
```
app/
  layout.tsx        # Layout raiz, navbar e tokens de tema
  globals.css       # Tailwind + paleta OKLCH + classes utilitárias
  page.tsx          # Home com bento grid e gradiente animado
  docs/page.tsx     # Documentação (código, vídeo, passos)
  blog/page.tsx     # Listagem do blog via API pública
  blog/[slug]/page.tsx # Detalhe do post com vídeo e conteúdo HTML
  releases/page.tsx # Release Notes com filtro de versões
  releases/data.ts  # Dados de releases (mock local)
  status/page.tsx   # Painel de status com serviços e checagem da API

components/
  site/navbar.tsx   # Navbar responsiva e temática
  ui/button.tsx     # Botões com variantes
  ui/badge.tsx      # Badges com variantes (success, warning etc.)
  ui/card.tsx       # Cartões (Header, Title, Content)
  ui/tabs.tsx       # Tabs baseadas em Radix
  ui/carousel.tsx   # Carrossel leve para banners
  ui/command.tsx    # Command Palette estilo shadcn

lib/
  blog.ts           # Cliente/normalização de dados da API Wetalkit
  utils.ts          # Função `cn` (clsx + tailwind-merge)
```

## Tema e Paleta (OKLCH)
- Tokens definidos em `app/globals.css` para claro e escuro
- Cores expostas via `@theme inline` e `tailwind.config.ts` mapeadas para `bg-background`, `text-foreground`, `text-primary` etc.
- Azul é a cor de destaque no light e no dark (tokens `--primary` e `--ring` ajustados)

## Navbar Responsiva
- Título: “Central WeJourney” com logo dinâmico
  - Light: `logo-preta-2.png`
  - Dark: `logo-branca-2.png`
- Menu desktop: “Opções”, “Tema” e “Buscar (Ctrl+K)”
- Menu mobile: botão “Menu” abre overlay com links, controle de tema e busca
- Ícones usam `text-foreground` para adaptar ao tema

## Command Palette
- Atalho: `Ctrl+K`
- Grupos: Sugestões, Settings e resultados
- Fechamento: `Esc`, clique no backdrop ou botão “X”
- Busca por posts do blog (título/tags) integrada

## Gradiente Animado (Home)
- Camada de gradiente baseada em radial-gradients e blur
- Movimenta verticalmente para evitar overflow horizontal
- Apenas na Home, posicionada atrás do bento grid

## Documentação
- Abas: Código (com copiar), Vídeo (iframe) e Passos (lista ordenada)
- Exemplos de componentes (Button, Slider etc.)

## Blog (API Pública Wetalkit)
- Endpoint: `https://api.wetalkit.com.br/contents/all-public`
- Normalização em `lib/blog.ts`:
  - `slug`: `cnt_unique` ou `cnt_id`
  - `title`: `cnt_title`
  - `excerpt`: `cnt_textPreview` ou extraído de `cnt_description`
  - `image`: `cnt_publicBanner` ou `cnt_banner` (limpa backticks)
  - `tags`: `cnt_tags` separada por espaço (máx. 6)
  - `descriptionHtml`: renderizado no detalhe
  - `videoUrl`: `cnt_contentLink` (limpa backticks)
- Listagem: cards padronizados com imagem, tags, título, excerpt e botão “Ler mais” sempre visível
- Detalhe: vídeo embed + HTML dos conteúdos

## Release Notes
- Filtro lateral de versões, lista de mudanças com área e descrição
- Dados em `app/releases/data.ts` (mock local)

## Status
- Serviços exibidos: API, Autenticação, Envio de Emails, Notificações, Monitoramento, Sistema de Gerenciamento Interno, Sistema Principal, Sistema de Vendas, Portal Wetalk, Serviço de Suporte
- Checagem da API: tenta acessar o endpoint público e marca o status conforme sucesso
- Mostra “Última verificação” e uptime (mockado quando ausente)

## Acessibilidade e Responsividade
- Layouts adaptáveis (grid 12 colunas, cards de altura mínima)
- Ícones e contraste de texto seguindo tokens `foreground`/`accent`
- Evita overflow horizontal no gradiente

## Personalização
- Cores: ajuste tokens em `app/globals.css`
- Ícones: edite importações de `lucide-react`
- Componentes: expanda `components/ui` com novas variantes shadcn
- Conteúdos: troque a fonte da API ou aplique filtros de exibição no `lib/blog.ts`

## Boas Práticas
- Não versionar `node_modules/` (`.gitignore` já criado)
- Evitar credenciais no repositório (nunca commit de segredos)
- Endpoints externos sem logs de dados sensíveis

## Troubleshooting
- “Module not found”: verifique dependências com `npm install`
- “Overflow horizontal”: confirme que `html, body { overflow-x: hidden; }` e o gradiente usa movimento vertical
- “Ícones invertidos”: checar `text-foreground` nas instâncias

## Roadmap (Ideias)
- MDX para documentação técnica
- CMS para Blog/Notícias
- Status com checagens adicionais (e-mail, notificações, serviços internos)
- Página de componentes com exemplos interativos

## Licença
- Uso interno da Central WeJourney – ajuste conforme necessidade da organização