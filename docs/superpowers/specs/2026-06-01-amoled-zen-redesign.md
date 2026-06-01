# AMOLED Zen Redesign — Design Spec

**Data:** 2026-06-01
**Escopo:** Troca completa da paleta Steam Fiel (navy/azul) por AMOLED Zen (preto puro / off-white / dourado)
**Arquivos tocados:** `globals.css`, `tailwind.config.js`, `app/layout.tsx`, todos os componentes de view, `SplashScreen.tsx`

---

## Objetivo

Substituir a identidade visual Steam Fiel aplicada no ciclo anterior por uma paleta AMOLED Zen: fundo preto puro (`#000000`), hierarquia de profundidade através de camadas de escuridão (sem bordas visíveis em repouso), e um único accent dourado-quente que aparece exclusivamente em estados ativos e hover. Mudança puramente visual — zero alterações em lógica, dados ou funcionalidades.

---

## Tokens de Design

### CSS Custom Properties (`globals.css` `:root`)

Renomear todos os `--steam-*` para `--amoled-*` com os seguintes valores:

```css
--amoled-black:        #000000   /* fundo raiz */
--amoled-panel:        #0d0d0d   /* painéis / cards */
--amoled-surface:      #141414   /* superfícies elevadas, hover de fundo */
--amoled-border:       #1c1c1c   /* bordas hairline onde necessário */
--amoled-gold:         #c9a52a   /* accent principal — dourado quente */
--amoled-gold-dim:     rgba(201, 165, 42, 0.12)  /* glow sutil no hover */
--amoled-gold-border:  rgba(201, 165, 42, 0.35)  /* borda dourada em estado ativo */
--amoled-text:         #f0f0f0   /* texto primário (off-white) */
--amoled-muted:        #606060   /* texto secundário / labels */
--amoled-green:        #4c6b22   /* status "disponível" (ContactView) */
--amoled-green-text:   #a4d007   /* texto verde (badges de destaque) */
--amoled-border-hover: #2a2a2a   /* scrollbar thumb hover */
```

### Tailwind (`tailwind.config.js`)

Renomear o bloco `steam:` para `amoled:` com os mesmos valores acima para uso em classes utilitárias opcionais.

---

## Sistema de Classes CSS

Os nomes das classes **não mudam** (`steam-panel`, `steam-hover`, etc. permanecem como estão no JSX). Apenas as definições dentro de `globals.css` são atualizadas.

### `.steam-panel` (agora representa amoled-panel)
```css
.steam-panel {
    background-color: var(--amoled-panel);
    border-radius: 6px;
    /* sem borda em repouso — profundidade por camada de cor */
}
```

### `.steam-hover`
```css
.steam-hover {
    border: 1px solid transparent;
    transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.steam-hover:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 16px var(--amoled-gold-dim);
    border-color: var(--amoled-gold-border);
}
```

### `.steam-btn-primary`
```css
.steam-btn-primary {
    background: var(--amoled-gold);
    color: #000000;          /* texto PRETO sobre dourado — alto contraste */
    font-weight: 700;
    border-radius: 4px;
    border: none;
    padding: 6px 14px;
    transition: background 150ms ease, transform 150ms ease;
}
.steam-btn-primary:hover    { background: #d4b030; transform: translateY(-1px); }
.steam-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
```

### `.steam-btn-secondary`
```css
.steam-btn-secondary {
    background: transparent;
    color: var(--amoled-text);
    border: 1px solid var(--amoled-border);
    border-radius: 4px;
    padding: 6px 14px;
    transition: border-color 150ms ease, color 150ms ease;
}
.steam-btn-secondary:hover {
    border-color: var(--amoled-gold-border);
    color: var(--amoled-gold);
}
```

### `.steam-input`
```css
.steam-input {
    background: #000000;
    border: 1px solid var(--amoled-border);
    border-radius: 4px;
    color: var(--amoled-text);
    transition: border-color 150ms ease, box-shadow 150ms ease;
}
.steam-input:focus {
    outline: none;
    border-color: var(--amoled-gold);
    box-shadow: 0 0 0 2px var(--amoled-gold-dim);
}
```

### `.steam-tag`
```css
.steam-tag {
    font-family: var(--font-jetbrains-mono), monospace;
    font-size: 0.7rem;
    padding: 2px 7px;
    border-radius: 2px;
    background: rgba(201, 165, 42, 0.08);
    border: 1px solid rgba(201, 165, 42, 0.2);
    color: var(--amoled-gold);
    display: inline-block;
}
```

### `.steam-sidebar-active`
```css
.steam-sidebar-active {
    background: rgba(201, 165, 42, 0.08);
    border-left: 2px solid var(--amoled-gold);
    color: var(--amoled-gold);
}
```

### Sistema de Raridade (AchievementsView)
O accent da legendary passa a ser o gold do sistema, criando coerência entre o tier máximo e o accent de UI:
```css
.rarity-common    { border-width: 2px; border-color: rgba(100, 100, 100, 0.5); }
.rarity-rare      { border-width: 2px; border-color: rgba(14, 165, 233, 0.5);  box-shadow: 0 0 12px rgba(14, 165, 233, 0.15); }
.rarity-epic      { border-width: 2px; border-color: rgba(139, 92, 246, 0.5);  box-shadow: 0 0 12px rgba(139, 92, 246, 0.15); }
.rarity-legendary { border-width: 2px; border-color: rgba(201, 165, 42, 0.6);  box-shadow: 0 0 12px rgba(201, 165, 42, 0.2); }
```

### Scrollbar
```css
::-webkit-scrollbar-track { background: var(--amoled-black); }
::-webkit-scrollbar-thumb { background: var(--amoled-border); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--amoled-border-hover); }
```

---

## Animações

Sistema de animações **não muda** — Balanceado continua:
- Apenas entry animations: `animate-fade-in`, `animate-slide-in`, `animate-slide-in-right`, `animate-bounce-in`
- `animate-spin` para loading spinner (ContactView submit)
- Zero animações contínuas em repouso em todos os componentes, incluindo a SplashScreen reescrita
- **Remover de globals.css:** `@keyframes float`, `@keyframes float-delayed`, `@keyframes glow-pulse`, `@keyframes blink` e suas classes `.animate-float`, `.animate-float-delayed`, `.animate-glow-pulse`, `.animate-blink` — não serão mais usados em nenhum componente após a reescrita da SplashScreen

---

## Mudanças por Componente

### `globals.css`
- Substituir todos os `--steam-*` por `--amoled-*` com novos valores
- Atualizar definições de todas as classes conforme seção acima
- `body { background-color: var(--amoled-black); color: var(--amoled-text); }`

### `tailwind.config.js`
- Renomear bloco `steam:` → `amoled:` com tokens equivalentes

### `app/layout.tsx`
- Sem mudança estrutural; herda via `body` do globals.css

### `Header.tsx`
- `var(--steam-dark)` → `var(--amoled-black)`
- `var(--steam-blue)` → `var(--amoled-gold)` (sublinhado da tab ativa)
- `var(--steam-border)` → `var(--amoled-border)`
- `var(--steam-text)` / `var(--steam-muted)` → equivalentes amoled

### `Sidebar.tsx`
- `var(--steam-*)` → `var(--amoled-*)` em todos os inline styles
- `rgba(26, 159, 255, *)` → `rgba(201, 165, 42, *)` (border-left ativo, hover bg)

### `ProjectDetail.tsx`
- Inline styles de fundo e bordas → tokens amoled
- `rgba(26, 159, 255, *)` → `rgba(201, 165, 42, *)`
- Badge "DESTAQUE": `var(--steam-green)` / `var(--steam-green-text)` → `var(--amoled-green)` / `var(--amoled-green-text)` (mantém verde)

### `ProjectsWelcome.tsx`
- Tokens de fundo, borda e accent → amoled equivalentes

### `ProfileView.tsx`
- Progress bars: `background: var(--steam-blue)` → `background: var(--amoled-gold)`
- Inline styles de fundo e ícone → amoled

### `ContactView.tsx`
- Hero icon background: `rgba(26,159,255,0.15)` → `rgba(201,165,42,0.12)`
- Contact cards icon bg: `rgba(26,159,255,0.1)` → `rgba(201,165,42,0.08)`
- Heading accent icons: `var(--steam-blue)` → `var(--amoled-gold)`
- Inputs, botão submit, focus rings → dourado via classes (já usam steam-input / steam-btn-primary)

### `AchievementsView.tsx`
- `categoryStats` color/bgColor: `var(--steam-blue)` / `rgba(26,159,255,0.1)` → `var(--amoled-gold)` / `rgba(201,165,42,0.08)`
- Inline styles de fundo → amoled tokens
- `rarity-legendary` herda o gold automaticamente via globals.css atualizado

### `SplashScreen.tsx` — Reescrita completa

**Estrutura nova:**
```
fundo: #000000 puro
─ Logo: quadrado 80px, borda 1px dourada, letra "P" branca, sem gradiente
─ Título "Portfolio": texto branco, sem gradient clip
─ Subtítulo: JetBrains Mono, --amoled-muted
─ Foto de perfil: anel simples 1px dourado, sem animate-glow-pulse
─ Barra de progresso: track #0d0d0d, fill --amoled-gold, sem shimmer
─ Texto de loading step: --amoled-muted, fonte mono
─ Sem blobs flutuantes, sem floating icons, sem backdrop-blur
─ Versão badge: #0d0d0d bg, borda 1px #1c1c1c, texto --amoled-muted
```

**Animações mantidas na SplashScreen:**
- `animate-bounce-in` no logo (entry)
- Transição `opacity + scale` no showProfile (já existente, apenas CSS)
- Loading dots: **remover completamente** — eram decoração pura com `animate-bounce` contínuo, violam Balanceado e não acrescentam informação

---

## Restrições

- Zero mudanças em lógica, hooks, dados, internacionalização ou funcionalidades
- Manter `prefers-reduced-motion` guard no final do globals.css
- Badge "DESTAQUE" no ProjectDetail mantém verde (semântica de status, não de marca)
- Ícone de disponibilidade (ContactView) mantém verde pelo mesmo motivo

---

## Critérios de Aceitação

- Fundo da aplicação é preto puro `#000000` em todas as abas
- Painéis distinguíveis do fundo sem bordas visíveis em repouso
- Dourado `#c9a52a` aparece exclusivamente em: tab ativa, botões primários, sidebar item ativo, hover glow, focus de inputs, tags de tecnologia
- Zero azul `#1a9fff` restante em componentes in-scope
- SplashScreen sem blobs, shimmer ou bounce contínuo
- Build `✓ Compiled successfully`
- `npx tsc --noEmit` sem erros
