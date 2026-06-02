# Landing Page Design

**Date:** 2026-06-02  
**Status:** Approved

## Objetivo

Criar uma landing page pública de recepção em `/` que apresenta Miguel Diniz antes do visitante entrar no portfolio-launcher (`/app`). A landing serve como vitrine de identidade profissional — quem é, o que faz, onde está — e convida ao portfolio completo.

## Decisões de design

| Dimensão | Escolha |
|---|---|
| Integração | Rota separada: `/` (landing) e `/app` (launcher) |
| Foco | Identidade em destaque — hero com foto, nome, cargo |
| Conteúdo abaixo do hero | Stats + Experiência atual + Stack principal |
| Composição | Hero card + grade de cards (Abordagem B) |
| Visual | Apple Glass AMOLED — glass-gold no hero, glass neutro nos cards |

## Arquitetura de Rotas

```
app/
  page.tsx              ← substituir pelo LandingPage (rota /)
  app/
    page.tsx            ← novo arquivo com o launcher atual (rota /app)
  landing/
    LandingPage.tsx     ← novo componente da landing
  components/           ← inalterados
  data/                 ← inalterado
```

**Regras:**
- O `SplashScreen` (4 segundos) **não aparece** na landing — só no `/app`
- O botão CTA usa `<Link href="/app">` do Next.js (sem JS de navegação manual)
- O botão "⬇ CV" reutiliza a lógica de `handleDownloadCV` do `ProfileView`
- A landing é um Server Component (sem `"use client"`) — sem estado, sem hooks
- O botão "⬇ CV" requer `onClick` → extrair em `app/landing/CVButton.tsx` (Client Component separado)

## Seção 1 — Top Bar

Barra horizontal minimalista no topo da página:

- **Esquerda:** logo mark — div quadrado `#c9a52a` com letra "P", `border-radius: var(--radius-sm)`
- **Direita:** links de texto pequenos (11px, `#3a3a3a`) para GitHub, LinkedIn e Contato
  - GitHub → `https://github.com/DevMiguelDiniz` (abre em nova aba)
  - LinkedIn → `https://linkedin.com/in/miguel-diniz` (abre em nova aba)
  - Contato → `<Link href="/app">` (o launcher abre na aba Contact por padrão via query param ou state)

Sem border, sem background — flutua sobre o preto.

## Seção 2 — Hero Card

Classe: `glass-gold` + `border-radius: var(--radius-xl)` (28px)

Layout interno horizontal (flex row):
- **Avatar** (esquerda): `80×80px`, `border-radius: 20px`, `border: 2px solid rgba(201,165,42,0.4)`, `box-shadow: 0 0 24px rgba(201,165,42,0.15)`. Usa `<Image src="/Miguel.jpg" />`.
- **Info** (direita, flex-1):
  - Nome: `font-size: 26px`, `font-weight: 800`, `letter-spacing: -0.03em`, `color: var(--amoled-text)`
  - Cargo: `font-size: 14px`, `font-weight: 600`, `color: var(--amoled-gold)`
  - Badges: linha de chips menores com `glass-surface` + `border-radius: var(--radius-sm)`:
    - 🟢 "Disponível" (dot verde `#a4d007` + texto `--amoled-green-text`)
    - 📍 "Belo Horizonte"
    - 🎓 "PUC Minas"

## Seção 3 — Stats Row

Grid de 4 cards iguais (`glass-panel`, `border-radius: var(--radius-md)`):

| Card | Valor | Label |
|---|---|---|
| Projetos | `projects.length` (dinâmico) | PROJETOS |
| Techs | `uniqueTechs.length` (dinâmico) | TECHS |
| Anos | `2+` (estático) | ANOS |
| Certs | `5+` (estático) | CERTS |

Valores dinâmicos calculados a partir de `app/data/projects.ts` — importados diretamente no Server Component.

## Seção 4 — Experiência

Card `glass-panel`, `border-radius: var(--radius-lg)`:
- Label: "EXPERIÊNCIA" (10px, uppercase, `--amoled-muted`)
- Item único (por enquanto):
  - Dot dourado `8×8px` com glow
  - Título: "Estágio Full Stack — JdsDev" (`font-weight: 600`)
  - Sub: "React · Next.js · SpringBoot · 2025 – presente" (`--amoled-muted`)
  - Tag "Atual" (verde, `rgba(164,208,7,0.1)`, border `rgba(164,208,7,0.2)`)

Dados hardcoded no componente — a experiência não muda frequentemente.

## Seção 5 — Stack Principal

Card `glass-panel`, `border-radius: var(--radius-lg)`:
- Label: "STACK PRINCIPAL"
- Tags usando a classe `.steam-tag` existente:
  `React`, `Next.js`, `TypeScript`, `Node.js`, `Flutter`, `PostgreSQL`, `Docker`, `SpringBoot`

## Seção 6 — CTA

Dois botões lado a lado (`display: flex`, `gap: 10px`):

- **Primário** (`steam-btn-primary`, `border-radius: var(--radius-md)`, `padding: 14px 24px`, `flex: 1`):
  - Texto: "Acessar Portfolio →"
  - `<Link href="/app">` — navegação Next.js
  - `box-shadow: 0 4px 20px rgba(201,165,42,0.3)`

- **Secundário** (`steam-btn-secondary`, `border-radius: var(--radius-md)`, `padding: 14px 18px`):
  - Texto: "⬇ CV"
  - `onClick`: mesma lógica de download do ProfileView (link programático para `/CV/Miguel_Diniz_CV_PT.pdf`)

## Seção 7 — Footer

Uma linha de texto centralizado:
```
portfolio v2.0 · apple glass edition · next.js 15
```
`font-size: 10px`, `font-family: var(--font-jetbrains-mono)`, `color: #2a2a2a`

## Layout geral

```
max-width: 640px
margin: 0 auto
padding: 32px 20px
display: flex
flex-direction: column
gap: 12px
```

Fundo `#000` puro com glow radial dourado sutil atrás do hero (`radial-gradient(ellipse, rgba(201,165,42,0.07), transparent)`).

**Responsividade:**
- Mobile: avatar reduz para `60×60px`, nome para `22px`, stats grid vira `2×2`
- Tudo cabe na viewport sem scroll em 1080p+

## Metadata SEO

Atualizar `app/page.tsx` (agora a landing) com:
```ts
export const metadata: Metadata = {
  title: 'Miguel Diniz — Full Stack Developer',
  description: 'Portfolio profissional de Miguel Diniz, desenvolvedor Full Stack especializado em React, Next.js, Node.js e Flutter.',
}
```

## O que não muda

- Todo o código do launcher (`page.tsx` atual → move para `app/app/page.tsx`)
- Todos os componentes em `app/components/`
- `app/data/projects.ts`
- `app/globals.css`
- Design system (glass classes, tokens AMOLED)
