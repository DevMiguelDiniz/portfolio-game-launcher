# Apple Glass Redesign

**Date:** 2026-06-02  
**Status:** Approved

## Objetivo

Modernizar o visual do portfolio-game-launcher com estética inspirada na Apple, mantendo a paleta AMOLED preta/dourada existente. A abordagem é uma extensão do design system atual — nenhum token de cor é removido, apenas se adicionam camadas de glass (blur + transparência) e border-radius generoso.

## Decisões de design

| Dimensão | Escolha |
|---|---|
| Direção | Glassmorphism refinado (não editorial, não só formas) |
| Layout | Launcher mantido (sidebar + área principal) |
| Intensidade do glass | Balanceado — blur 20px, bordas brilhantes, sombra profunda |
| Border-radius | Apple — 10px (sm), 16px (md), 22px (lg), 28px (xl) |
| Animações | Entry-only mantidas; curva e duração refinadas |

## Seção 1 — Fundação (`globals.css`)

### Novos tokens de radius

```css
--radius-sm:  10px;
--radius-md:  16px;
--radius-lg:  22px;
--radius-xl:  28px;
```

### Novas classes utilitárias de glass

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.glass-surface {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.glass-gold {
  background: rgba(201, 165, 42, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(201, 165, 42, 0.2);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(201, 165, 42, 0.1);
}
```

### Atualizações das classes `steam-*` existentes

- `.steam-panel` → adiciona `border-radius: var(--radius-lg)`
- `.steam-hover` → `border-radius: var(--radius-lg)`, sombra no hover mais profunda (`0 8px 40px`)
- `.steam-tag` → `border-radius: var(--radius-sm)` (troca de 2px)
- `.steam-btn-primary` → `border-radius: var(--radius-sm)`
- `.steam-btn-secondary` → `border-radius: var(--radius-sm)`
- `.steam-input` → `border-radius: var(--radius-sm)`
- `.steam-sidebar-active` → redefine o CSS da classe para usar os estilos de `.glass-gold` + `border-radius: var(--radius-md)` (sem mudar o nome da classe no JSX)

### Transições

```css
/* global transition - de 150ms ease para: */
transition-duration: 200ms;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

### Scrollbar

- Largura: 6px (era 8px)
- Thumb: `border-radius: var(--radius-sm)`

## Seção 2 — Componentes

### `Sidebar.tsx`
- `aside` → adiciona `.glass-panel`, remove o `style={{ background: 'var(--amoled-panel)' }}` inline (que sobrescreveria o glass), mantém `border-r`
- Itens de projeto: `border-radius: var(--radius-md)`, item ativo usa `.glass-gold`
- Search input e select: `border-radius: var(--radius-sm)`
- Thumbnail de projeto: `border-radius: var(--radius-sm)` (era `rounded`, ~4px)

### `Header.tsx`
- Fundo: `.glass-surface` com `backdrop-filter: blur(20px)`
- Borda inferior: `rgba(255, 255, 255, 0.06)` (mais sutil)

### `ProjectsView.tsx`
- Cards de projeto: `.steam-panel.steam-hover` → `.glass-panel` + `border-radius: var(--radius-lg)`
- Hover: sombra sobe para `0 8px 40px rgba(0,0,0,0.6)` + borda gold mais visível

### `ProjectDetail.tsx`
- Painel principal: `.glass-panel` com `border-radius: var(--radius-lg)`
- Sub-painéis (tech stack, links): `.glass-gold` com `border-radius: var(--radius-md)`

### `ProfileView.tsx`
- Blocos de experiência e skills: `.glass-panel` com `border-radius: var(--radius-lg)`
- Status badge / destaque: `.glass-gold`
- Avatar: `border-radius: 20px`, sombra dourada suave

### `AchievementsView.tsx`
- Cards de achievement: `.glass-panel` base, borda colorida por raridade mantida
- `border-radius: var(--radius-lg)` em todos os cards

### `ContactView.tsx`
- Container do form: `.glass-surface` com `border-radius: var(--radius-lg)`
- Inputs: `border-radius: var(--radius-sm)` + `backdrop-filter: blur(10px)`

### `SplashScreen.tsx`
- Painel central: `.glass-gold` com `border-radius: var(--radius-xl)`
- A barra dourada horizontal existente é mantida

## O que não muda

- Paleta de cores (`--amoled-*` tokens) — intacta
- Animações de entrada (`steam-fade-in`, `steam-slide-in`, etc.) — intactas
- Ausência de animações contínuas — mantida
- Estrutura de layout (sidebar + main) — intacta
- Sistema de raridade dos achievements — intacto
- Lógica de componentes — zero mudança
