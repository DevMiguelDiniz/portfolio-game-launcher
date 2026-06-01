# Steam Visual Identity Redesign — Spec

**Data:** 2026-05-27  
**Autor:** Miguel Diniz + Claude

---

## Objetivo

Refinar a identidade visual completa do portfólio para ser fiel à estética original do Steam, eliminando inconsistências, excessos de animação e a mistura de paletas não relacionadas — sem quebrar a estrutura existente (layout, funcionalidades, i18n, data layer).

---

## Decisões de Design (aprovadas)

### 1. Paleta de Cores — Steam Fiel

Abandona a mistura atual de blue-500, purple-600, green-500, orange-500, red-500, cyan-500 em contextos de UI. Adota os tokens Steam originais:

| Token CSS | Valor | Uso |
|---|---|---|
| `--steam-dark` | `#171a21` | Header / topbar |
| `--steam-navy` | `#1b2838` | Background principal |
| `--steam-panel` | `#16202d` | Sidebar, cards, painéis |
| `--steam-border` | `#2a475e` | Bordas, divisores |
| `--steam-blue` | `#1a9fff` | Acento primário — botões ativos, links, hover |
| `--steam-text` | `#c6d4df` | Texto primário |
| `--steam-muted` | `#8ba0b4` | Labels, texto secundário |
| `--steam-green` | `#4c6b22` | Fundo badge destaque |
| `--steam-green-text` | `#a4d007` | Texto badge destaque |

**Exceção controlada — Achievements (rarity system):**
- Comum: `--steam-muted` (#8ba0b4)
- Raro: `--steam-blue` (#1a9fff)
- Épico: `#9b59b6`
- Lendário: `#ffd700`

Esses valores só aparecem nos cards de conquista — nunca em elementos de navegação ou layout.

---

### 2. Tipografia — Híbrida

| Fonte | Uso | Pesos |
|---|---|---|
| **Inter** | UI, navegação, títulos, descrições, botões, formulários | 400, 500, 600, 700 |
| **JetBrains Mono** | Tags de tecnologia (`React`, `Node.js`…), trechos de código | 400, 500 |

A fonte atual (`JetBrains Mono` aplicada globalmente via `body`) é substituída por Inter como `className` do `<body>`. JetBrains Mono permanece carregado via variável CSS e é aplicado somente com a classe `.font-mono`.

---

### 3. Estilo de Componentes — Steam Refinado

**Botões:**
- Primário: `background: #1a9fff`, `color: #fff`, `border-radius: 4px`, `font-weight: 600`
- Secundário: `border: 1px solid #2a475e`, `color: #c6d4df`, sem background sólido
- Sem gradientes, sem ripple effect, sem shimmer

**Cards / Painéis:**
- `background: #16202d`, `border: 1px solid #2a475e`, `border-radius: 6px`
- Hover: `border-color: rgba(26, 159, 255, 0.5)`, `box-shadow: 0 0 16px rgba(26, 159, 255, 0.15)`
- Sem `backdrop-filter: blur`, sem glassmorphism

**Tags de Tecnologia:**
- `background: rgba(26, 159, 255, 0.1)`, `border: 1px solid rgba(26, 159, 255, 0.3)`, `color: #1a9fff`
- `font-family: JetBrains Mono`, `border-radius: 2px`

**Sidebar — item ativo:**
- `background: rgba(42, 71, 94, 0.4)`, `border-left: 2px solid #1a9fff`

**Inputs:**
- `background: #0d1520`, `border: 1px solid #2a475e`, `border-radius: 4px`
- Focus: `border-color: #1a9fff`, `box-shadow: 0 0 0 2px rgba(26, 159, 255, 0.15)`

---

### 4. Sistema de Animações — Balanceado

**O que fica (com valores ajustados):**
- `fade-in`: `opacity 0 → 1` + `translateY(8px → 0)`, 300ms ease-out — entrada de seções
- `slide-in`: `opacity 0 → 1` + `translateX(-8px → 0)`, 350ms ease-out — troca de projeto
- Hover padrão: `translateY(-1px)` + glow sutil, 200ms ease

**O que é removido completamente:**
- `animate-float` / `animate-float-delayed` — partículas flutuantes
- `animate-shimmer` — efeito shimmer nos botões e sidebar
- `animate-glow-pulse` / `pulse-glow` — glow contínuo em repouso
- `animate-retro-glow`, `retro-crt`, `scanlines`, `matrix-fall`, `glitch` — efeitos retro
- `bounce-in` — escala exagerada
- `steam-glow-strong` — translateY(-3px) + scale em hover
- Partículas flutuantes no hero do ProjectDetail

**SplashScreen:** mantém suas próprias animações pois é um momento único de loading — não é parte da UI recorrente.

**Regra geral:** se o elemento está em repouso (sem hover, sem seleção), fica completamente parado.

---

## Escopo de Arquivos

| Arquivo | Tipo de mudança |
|---|---|
| `app/globals.css` | Reescrita — remove retro/shimmer/float/pulse, adiciona tokens Steam, reescreve classes utilitárias |
| `tailwind.config.js` | Adiciona cores Steam como tokens customizados |
| `app/layout.tsx` | Adiciona `Inter`, aplica como `className` do body, mantém `JetBrains_Mono` como variável CSS |
| `app/components/Header.tsx` | Paleta Steam, remove gradientes roxo, remove shimmer e animate-pulse |
| `app/components/Sidebar.tsx` | Paleta Steam, remove glassmorphism, shimmer, animate-glow-pulse |
| `app/components/ProjectDetail.tsx` | Remove partículas flutuantes, aplica paleta Steam, reescreve hero e tags |
| `app/components/ProjectsWelcome.tsx` | Remove gradientes multicoloridos, aplica paleta Steam |
| `app/components/ProfileView.tsx` | Unifica barras de skill para `#1a9fff`, remove cards glassmorphism |
| `app/components/ContactView.tsx` | Steam inputs, remove ícones com gradientes coloridos |
| `app/components/AchievementsView.tsx` | Mantém rarity system, aplica paleta Steam no resto |

**Fora do escopo:**
- `SplashScreen.tsx` — mantido como está
- `app/data/projects.ts` — sem mudanças
- `app/hooks/` — sem mudanças
- Shadcn/UI components em `components/ui/` — sem mudanças

---

## Critérios de Sucesso

1. A interface usa exclusivamente as cores do token `--steam-*` em elementos de UI (fora do rarity system de achievements)
2. Inter é a fonte padrão de toda a UI; JetBrains Mono aparece apenas em tags de tecnologia e código
3. Nenhum elemento em repouso tem animação contínua (exceto SplashScreen)
4. Hover em qualquer card/botão interativo produz `translateY(-1px)` + glow azul Steam — sem excessos
5. O visitante reconhece imediatamente a semelhança com o Steam ao abrir a página
