# AMOLED Zen Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir toda a paleta Steam Fiel (navy/azul) por AMOLED Zen (preto puro `#000000`, painéis quase-preto sem borda visível, único accent dourado `#c9a52a` exclusivamente em estados ativos/hover).

**Architecture:** Mudança puramente visual via substituição de tokens CSS. Os nomes das classes CSS (`steam-panel`, `steam-hover`, etc.) permanecem; apenas suas definições são atualizadas. Nos componentes, substituem-se as referências `var(--steam-*)` por `var(--amoled-*)` e os `rgba(26,159,255,*)` pelos equivalentes dourados. A SplashScreen é reescrita por completo para eliminar blobs flutuantes e glassmorphism.

**Tech Stack:** Next.js 15, Tailwind CSS 3, CSS custom properties, Inter + JetBrains Mono

---

## Mapa de Arquivos

| Arquivo | O que muda |
|---|---|
| `app/globals.css` | Reescrita: tokens `--steam-*` → `--amoled-*`, classes atualizadas, keyframes float/glow-pulse/blink removidos |
| `tailwind.config.js` | Bloco `steam:` → `amoled:` com novos valores |
| `app/components/Header.tsx` | Inline styles: tokens steam → amoled |
| `app/components/Sidebar.tsx` | Inline styles: tokens steam → amoled |
| `app/components/ProjectDetail.tsx` | Inline styles: tokens steam → amoled + rgba hardcoded |
| `app/components/ProjectsWelcome.tsx` | Inline styles: tokens steam → amoled + rgba |
| `app/components/ProfileView.tsx` | Tokens + rgba + remove animate-pulse do avatar ring |
| `app/components/ContactView.tsx` | Tokens + rgba hardcoded |
| `app/components/AchievementsView.tsx` | Tokens + rgba em categoryStats |
| `app/components/SplashScreen.tsx` | Reescrita completa: AMOLED Zen sem blobs/shimmer/glassmorphism |

---

## Mapeamento de Substituições

Referência rápida para todos os find-and-replace:

| De | Para |
|---|---|
| `var(--steam-dark)` | `var(--amoled-black)` |
| `var(--steam-navy)` | `var(--amoled-black)` |
| `var(--steam-panel)` | `var(--amoled-panel)` |
| `var(--steam-border)` | `var(--amoled-border)` |
| `var(--steam-blue)` | `var(--amoled-gold)` |
| `var(--steam-text)` | `var(--amoled-text)` |
| `var(--steam-muted)` | `var(--amoled-muted)` |
| `var(--steam-green)` | `var(--amoled-green)` |
| `var(--steam-green-text)` | `var(--amoled-green-text)` |
| `rgba(26,159,255,0.1)` | `rgba(201,165,42,0.08)` |
| `rgba(26,159,255,0.15)` | `rgba(201,165,42,0.12)` |
| `rgba(26,159,255,0.3)` | `rgba(201,165,42,0.25)` |
| `rgba(27,40,56,0.6)` | `rgba(0,0,0,0.6)` |
| `rgba(22,32,45,0.85)` | `rgba(13,13,13,0.85)` |

---

## Task 1: globals.css — Tokens AMOLED + classes atualizadas

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Substituir o conteúdo completo de globals.css**

Substitua o conteúdo inteiro do arquivo pelo seguinte:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── AMOLED Zen Design Tokens ─── */
:root {
    --amoled-black:        #000000;
    --amoled-panel:        #0d0d0d;
    --amoled-surface:      #141414;
    --amoled-border:       #1c1c1c;
    --amoled-gold:         #c9a52a;
    --amoled-gold-dim:     rgba(201, 165, 42, 0.12);
    --amoled-gold-border:  rgba(201, 165, 42, 0.35);
    --amoled-text:         #f0f0f0;
    --amoled-muted:        #606060;
    --amoled-green:        #4c6b22;
    --amoled-green-text:   #a4d007;
    --amoled-border-hover: #2a2a2a;
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        background-color: var(--amoled-black);
        color: var(--amoled-text);
    }
}

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--amoled-black); }
::-webkit-scrollbar-thumb {
    background: var(--amoled-border);
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover { background: var(--amoled-border-hover); }

/* ─── Transição global leve ─── */
*, *::before, *::after {
    transition-property: color, background-color, border-color, box-shadow, transform, opacity;
    transition-timing-function: ease;
    transition-duration: 150ms;
}

/* ─── Animações (entry only — zero contínuas) ─── */
@keyframes steam-fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes steam-slide-in {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
}

@keyframes steam-slide-in-right {
    from { opacity: 0; transform: translateX(8px); }
    to   { opacity: 1; transform: translateX(0); }
}

@keyframes steam-spin {
    to { transform: rotate(360deg); }
}

@keyframes steam-bounce-in {
    from { opacity: 0; transform: scale(0.96) translateY(-4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
}

.animate-fade-in        { animation: steam-fade-in 0.3s ease-out forwards; }
.animate-slide-in       { animation: steam-slide-in 0.35s ease-out forwards; }
.animate-slide-in-right { animation: steam-slide-in-right 0.35s ease-out forwards; }
.animate-bounce-in      { animation: steam-bounce-in 0.25s ease-out forwards; }
.animate-spin           { animation: steam-spin 1s linear infinite; }

/* ─── Panel AMOLED Zen: sem borda em repouso ─── */
.steam-panel {
    background-color: var(--amoled-panel);
    border-radius: 6px;
}

/* Hover: glow dourado aparece do zero */
.steam-hover {
    border: 1px solid transparent;
    transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.steam-hover:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 16px var(--amoled-gold-dim);
    border-color: var(--amoled-gold-border);
}

/* Tag de tecnologia */
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

/* Botão primário — dourado com texto preto */
.steam-btn-primary {
    background: var(--amoled-gold);
    color: #000000;
    font-weight: 700;
    border-radius: 4px;
    border: none;
    padding: 6px 14px;
    transition: background 150ms ease, transform 150ms ease;
}
.steam-btn-primary:hover {
    background: #d4b030;
    transform: translateY(-1px);
}
.steam-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

/* Botão secundário */
.steam-btn-secondary {
    background: transparent;
    color: var(--amoled-text);
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid var(--amoled-border);
    padding: 6px 14px;
    transition: border-color 150ms ease, color 150ms ease;
}
.steam-btn-secondary:hover {
    border-color: var(--amoled-gold-border);
    color: var(--amoled-gold);
}

/* Input */
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

/* Sidebar item ativo */
.steam-sidebar-active {
    background: rgba(201, 165, 42, 0.08);
    border-left: 2px solid var(--amoled-gold);
    color: var(--amoled-gold);
}

/* Achievement rarity — legendary = gold do sistema */
.rarity-common    { border-width: 2px; border-color: rgba(100, 100, 100, 0.5); }
.rarity-rare      { border-width: 2px; border-color: rgba(14, 165, 233, 0.5);  box-shadow: 0 0 12px rgba(14, 165, 233, 0.15); }
.rarity-epic      { border-width: 2px; border-color: rgba(139, 92, 246, 0.5);  box-shadow: 0 0 12px rgba(139, 92, 246, 0.15); }
.rarity-legendary { border-width: 2px; border-color: rgba(201, 165, 42, 0.6);  box-shadow: 0 0 12px rgba(201, 165, 42, 0.2); }

/* line-clamp util */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* ─── Accessibility: reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

- [ ] **Step 2: Verificar compilação**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```
Esperado: sem output (zero erros).

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/globals.css
git commit -m "design: rewrite globals.css with AMOLED Zen tokens and updated class definitions"
```

---

## Task 2: tailwind.config.js — Renomear bloco steam → amoled

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Substituir o bloco `steam:` pelo bloco `amoled:`**

Localize o bloco:
```js
        steam: {
          dark:   '#171a21',
          navy:   '#1b2838',
          panel:  '#16202d',
          border: '#2a475e',
          blue:   '#1a9fff',
          text:   '#c6d4df',
          muted:  '#8ba0b4',
          green:  '#4c6b22',
          'green-text': '#a4d007',
        },
```

Substitua por:
```js
        amoled: {
          black:        '#000000',
          panel:        '#0d0d0d',
          surface:      '#141414',
          border:       '#1c1c1c',
          gold:         '#c9a52a',
          text:         '#f0f0f0',
          muted:        '#606060',
          green:        '#4c6b22',
          'green-text': '#a4d007',
        },
```

- [ ] **Step 2: Verificar compilação**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```
Esperado: sem output.

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add tailwind.config.js
git commit -m "design: rename tailwind steam tokens to amoled with new values"
```

---

## Task 3: Header.tsx — Tokens steam → amoled

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Aplicar substituições**

Faça as seguintes substituições exatas no arquivo:

| Localizar | Substituir |
|---|---|
| `'var(--steam-dark)'` | `'var(--amoled-black)'` |
| `'var(--steam-border)'` | `'var(--amoled-border)'` |
| `'var(--steam-muted)'` | `'var(--amoled-muted)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |
| `'var(--steam-text)'` | `'var(--amoled-text)'` |
| `'var(--steam-panel)'` | `'var(--amoled-panel)'` |

Após as substituições, o Header deve ter:
- `style={{ background: 'var(--amoled-black)', borderColor: 'var(--amoled-border)' }}` no `<header>`
- `style={{ background: 'var(--amoled-gold)' }}` no logo "P"
- `borderBottom: isActive ? '2px solid var(--amoled-gold)' : '2px solid transparent'` na tab
- `background: isActive ? 'var(--amoled-panel)' : 'transparent'` na tab
- `color: isActive ? 'var(--amoled-gold)' : 'var(--amoled-muted)'` na tab
- `style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--amoled-border)' }}` no `<nav>`

- [ ] **Step 2: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/Header.tsx
git commit -m "design: apply AMOLED Zen tokens to Header"
```

---

## Task 4: Sidebar.tsx — Tokens steam → amoled

**Files:**
- Modify: `app/components/Sidebar.tsx`

- [ ] **Step 1: Aplicar substituições**

| Localizar | Substituir |
|---|---|
| `'var(--steam-panel)'` | `'var(--amoled-panel)'` |
| `'var(--steam-border)'` | `'var(--amoled-border)'` |
| `'var(--steam-muted)'` | `'var(--amoled-muted)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |
| `'var(--steam-text)'` | `'var(--amoled-text)'` |
| `'var(--steam-green-text)'` | `'var(--amoled-green-text)'` |
| `'var(--steam-dark)'` | `'var(--amoled-black)'` |

Nota: a linha com `style={{ border: \`1px solid var(--steam-border)\` }}` (no projeto de imagem) usa template literal — substitua para:
```tsx
style={{ border: `1px solid var(--amoled-border)` }}
```

- [ ] **Step 2: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/Sidebar.tsx
git commit -m "design: apply AMOLED Zen tokens to Sidebar"
```

---

## Task 5: ProjectDetail.tsx — Tokens + rgba hardcoded

**Files:**
- Modify: `app/components/ProjectDetail.tsx`

- [ ] **Step 1: Aplicar substituições de tokens**

| Localizar | Substituir |
|---|---|
| `'var(--steam-text)'` | `'var(--amoled-text)'` |
| `'var(--steam-navy)'` | `'var(--amoled-black)'` |
| `'var(--steam-border)'` | `'var(--amoled-border)'` |
| `'var(--steam-muted)'` | `'var(--amoled-muted)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |
| `'var(--steam-green)'` | `'var(--amoled-green)'` |
| `'var(--steam-green-text)'` | `'var(--amoled-green-text)'` |

- [ ] **Step 2: Substituir rgba hardcoded**

Localize e substitua:

```tsx
// Antes (linha ~55 — gradiente do hero overlay):
style={{ background: 'linear-gradient(to top, var(--steam-navy) 0%, rgba(27,40,56,0.6) 60%, transparent 100%)' }}
// Depois:
style={{ background: 'linear-gradient(to top, var(--amoled-black) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)' }}
```

```tsx
// Antes (linha ~63 — badge de tipo de projeto):
style={{ background: 'rgba(22,32,45,0.85)', border: '1px solid var(--steam-border)', color: 'var(--steam-muted)' }}
// Depois:
style={{ background: 'rgba(13,13,13,0.85)', border: '1px solid var(--amoled-border)', color: 'var(--amoled-muted)' }}
```

- [ ] **Step 3: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ProjectDetail.tsx
git commit -m "design: apply AMOLED Zen tokens to ProjectDetail"
```

---

## Task 6: ProjectsWelcome.tsx — Tokens + rgba

**Files:**
- Modify: `app/components/ProjectsWelcome.tsx`

- [ ] **Step 1: Aplicar substituições**

| Localizar | Substituir |
|---|---|
| `'var(--steam-text)'` | `'var(--amoled-text)'` |
| `'var(--steam-navy)'` | `'var(--amoled-black)'` |
| `'var(--steam-panel)'` | `'var(--amoled-panel)'` |
| `'var(--steam-border)'` | `'var(--amoled-border)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |
| `'var(--steam-muted)'` | `'var(--amoled-muted)'` |

- [ ] **Step 2: Substituir rgba hardcoded**

```tsx
// Antes (linha ~44 — ícone de stat):
style={{ background: 'rgba(26,159,255,0.1)', color: stat.color }}
// Depois:
style={{ background: 'rgba(201,165,42,0.08)', color: stat.color }}
```

Também localize onde `stat.color` é definido no array `stats` (valores como `'var(--steam-text)'` ou `'var(--steam-blue)'`) e substitua pelos equivalentes amoled:
- `'var(--steam-text)'` → `'var(--amoled-text)'`
- `'var(--steam-blue)'` → `'var(--amoled-gold)'`

- [ ] **Step 3: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ProjectsWelcome.tsx
git commit -m "design: apply AMOLED Zen tokens to ProjectsWelcome"
```

---

## Task 7: ProfileView.tsx — Tokens + progress bars + remover animate-pulse

**Files:**
- Modify: `app/components/ProfileView.tsx`

- [ ] **Step 1: Aplicar substituições de tokens**

| Localizar | Substituir |
|---|---|
| `'var(--steam-navy)'` | `'var(--amoled-black)'` |
| `'var(--steam-dark)'` | `'var(--amoled-black)'` |
| `'var(--steam-border)'` | `'var(--amoled-border)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |
| `'var(--steam-text)'` | `'var(--amoled-text)'` |
| `'var(--steam-muted)'` | `'var(--amoled-muted)'` |

- [ ] **Step 2: Substituir rgba hardcoded**

```tsx
// Antes (skill icon bg):
style={{ background: 'rgba(26,159,255,0.1)', color: 'var(--steam-blue)' }}
// Depois:
style={{ background: 'rgba(201,165,42,0.08)', color: 'var(--amoled-gold)' }}
```

- [ ] **Step 3: Remover animate-pulse do avatar ring**

Localize a div do anel animado no hero do ProfileView (próxima ao `<Image>` de perfil):
```tsx
// Antes:
<div className="absolute inset-0 rounded-2xl animate-pulse opacity-60" style={{ background: 'var(--steam-blue)' }}></div>
// Depois (estático — sem animate-pulse):
<div className="absolute inset-0 rounded-2xl opacity-40" style={{ background: 'var(--amoled-gold)' }}></div>
```

- [ ] **Step 4: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ProfileView.tsx
git commit -m "design: apply AMOLED Zen tokens to ProfileView, remove animate-pulse"
```

---

## Task 8: ContactView.tsx — Tokens + rgba

**Files:**
- Modify: `app/components/ContactView.tsx`

- [ ] **Step 1: Aplicar substituições de tokens**

| Localizar | Substituir |
|---|---|
| `'var(--steam-text)'` | `'var(--amoled-text)'` |
| `'var(--steam-muted)'` | `'var(--amoled-muted)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |

- [ ] **Step 2: Substituir rgba hardcoded**

```tsx
// Antes (hero icon — linha ~60):
style={{ background: 'rgba(26,159,255,0.15)', border: '1px solid rgba(26,159,255,0.3)' }}
// Depois:
style={{ background: 'rgba(201,165,42,0.12)', border: '1px solid rgba(201,165,42,0.25)' }}
```

```tsx
// Antes (contact method icon — linha ~114):
style={{ background: 'rgba(26,159,255,0.1)', color: 'var(--steam-blue)' }}
// Depois:
style={{ background: 'rgba(201,165,42,0.08)', color: 'var(--amoled-gold)' }}
```

```tsx
// Antes (heading accent icon — linha ~80):
style={{ background: 'var(--steam-blue)' }}
// Depois:
style={{ background: 'var(--amoled-gold)' }}
```

```tsx
// Antes (form heading accent icon — linha ~155):
style={{ background: 'var(--steam-blue)' }}
// Depois:
style={{ background: 'var(--amoled-gold)' }}
```

- [ ] **Step 3: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ContactView.tsx
git commit -m "design: apply AMOLED Zen tokens to ContactView"
```

---

## Task 9: AchievementsView.tsx — Tokens + categoryStats

**Files:**
- Modify: `app/components/AchievementsView.tsx`

- [ ] **Step 1: Aplicar substituições de tokens**

| Localizar | Substituir |
|---|---|
| `'var(--steam-navy)'` | `'var(--amoled-black)'` |
| `'var(--steam-dark)'` | `'var(--amoled-black)'` |
| `'var(--steam-border)'` | `'var(--amoled-border)'` |
| `'var(--steam-blue)'` | `'var(--amoled-gold)'` |

- [ ] **Step 2: Substituir rgba em categoryStats**

No array `categoryStats`, todas as entradas têm `bgColor: 'rgba(26,159,255,0.1)'`. Substitua todas as ocorrências:

```tsx
// Antes:
bgColor: 'rgba(26,159,255,0.1)',
// Depois:
bgColor: 'rgba(201,165,42,0.08)',
```

(São 6 entradas — verifique que todas foram substituídas.)

- [ ] **Step 3: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/AchievementsView.tsx
git commit -m "design: apply AMOLED Zen tokens to AchievementsView"
```

---

## Task 10: SplashScreen.tsx — Reescrita completa AMOLED Zen

**Files:**
- Modify: `app/components/SplashScreen.tsx`

- [ ] **Step 1: Substituir o conteúdo completo de SplashScreen.tsx**

```tsx
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState('')
    const [showProfile, setShowProfile] = useState(false)

    const loadingSteps = [
        { text: 'Inicializando sistema...', duration: 800 },
        { text: 'Carregando biblioteca...', duration: 1000 },
        { text: 'Configurando interface...', duration: 700 },
        { text: 'Otimizando performance...', duration: 800 },
        { text: 'Finalizando...', duration: 700 },
    ]

    useEffect(() => {
        const profileTimer = setTimeout(() => setShowProfile(true), 500)

        let currentProgress = 0
        let stepIndex = 0

        const updateProgress = () => {
            if (stepIndex < loadingSteps.length) {
                const step = loadingSteps[stepIndex]
                setCurrentStep(step.text)

                const stepProgress = 100 / loadingSteps.length
                const targetProgress = (stepIndex + 1) * stepProgress

                const progressInterval = setInterval(() => {
                    currentProgress += 2
                    setProgress(Math.min(currentProgress, targetProgress))

                    if (currentProgress >= targetProgress) {
                        clearInterval(progressInterval)
                        stepIndex++
                        setTimeout(() => {
                            if (stepIndex < loadingSteps.length) {
                                updateProgress()
                            }
                        }, 150)
                    }
                }, step.duration / (stepProgress / 2))
            }
        }

        const startTimer = setTimeout(updateProgress, 1000)

        return () => {
            clearTimeout(profileTimer)
            clearTimeout(startTimer)
        }
    }, [])

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: '#000000' }}
        >
            <div className="text-center z-10 max-w-sm w-full px-8">

                {/* Logo */}
                <div className="mb-8 animate-bounce-in">
                    <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6"
                        style={{ background: '#0d0d0d', border: '1px solid rgba(201,165,42,0.5)' }}
                    >
                        <span className="font-bold text-2xl" style={{ color: '#ffffff' }}>P</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
                        Portfolio
                    </h1>
                    <p
                        className="text-sm tracking-wide"
                        style={{
                            fontFamily: 'var(--font-jetbrains-mono), monospace',
                            color: '#606060',
                        }}
                    >
                        Desenvolvedor Full Stack
                    </p>
                </div>

                {/* Profile Photo */}
                <div
                    className={`mb-8 transition-all duration-1000 ${
                        showProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                >
                    <div className="relative w-24 h-24 mx-auto">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{ border: '1px solid rgba(201,165,42,0.4)' }}
                        />
                        <div
                            className="absolute inset-1 rounded-full overflow-hidden"
                            style={{ background: '#0d0d0d' }}
                        >
                            <Image
                                src="/placeholder.svg?height=88&width=88&text=Foto"
                                alt="Profile"
                                width={88}
                                height={88}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-1" style={{ color: '#ffffff' }}>
                            Bem-vindo
                        </h2>
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: 'var(--font-jetbrains-mono), monospace',
                                color: '#606060',
                            }}
                        >
                            Carregando experiência...
                        </p>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className="text-xs truncate mr-3"
                            style={{
                                fontFamily: 'var(--font-jetbrains-mono), monospace',
                                color: '#606060',
                            }}
                        >
                            {currentStep}
                        </span>
                        <span
                            className="text-xs font-mono flex-shrink-0 px-2 py-0.5 rounded"
                            style={{
                                color: '#c9a52a',
                                background: 'rgba(201,165,42,0.08)',
                                border: '1px solid rgba(201,165,42,0.2)',
                            }}
                        >
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div
                        className="w-full h-px rounded-full overflow-hidden"
                        style={{ background: '#1c1c1c' }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%`, background: '#c9a52a' }}
                        />
                    </div>
                </div>

                {/* Version badge */}
                <div className="mt-10">
                    <p
                        className="text-xs font-mono inline-block px-3 py-1 rounded"
                        style={{
                            color: '#606060',
                            background: '#0d0d0d',
                            border: '1px solid #1c1c1c',
                        }}
                    >
                        Portfolio v2.0 • Next.js 15 • AMOLED Edition
                    </p>
                </div>

            </div>
        </div>
    )
}
```

- [ ] **Step 2: Verificar**

```bash
cd H:/portfolio-game-launcher && npx tsc --noEmit
```
Esperado: sem output.

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/SplashScreen.tsx
git commit -m "design: rewrite SplashScreen with AMOLED Zen — gold bar, no blobs/shimmer/glassmorphism"
```

---

## Task 11: Verificação final

**Files:** nenhum arquivo é modificado — apenas verificação.

- [ ] **Step 1: Build de produção**

```bash
cd H:/portfolio-game-launcher && npm run build
```
Esperado: `✓ Compiled successfully` sem erros.

- [ ] **Step 2: Verificar ausência total de referências steam nos componentes in-scope**

```bash
cd H:/portfolio-game-launcher
grep -r "var(--steam-" app/components/Header.tsx app/components/Sidebar.tsx app/components/ProjectDetail.tsx app/components/ProjectsWelcome.tsx app/components/ProfileView.tsx app/components/ContactView.tsx app/components/AchievementsView.tsx app/components/SplashScreen.tsx
```
Esperado: **nenhum output** (zero referências restantes).

```bash
grep -r "rgba(26,159,255" app/components/
```
Esperado: **nenhum output**.

- [ ] **Step 3: Verificar ausência de animações contínuas**

```bash
grep -r "animate-pulse\|animate-shimmer\|animate-float\|animate-glow-pulse\|animate-bounce[^-]" app/components/Header.tsx app/components/Sidebar.tsx app/components/ProjectDetail.tsx app/components/ProjectsWelcome.tsx app/components/ProfileView.tsx app/components/ContactView.tsx app/components/AchievementsView.tsx app/components/SplashScreen.tsx
```
Esperado: **nenhum output**.

- [ ] **Step 4: Checklist visual (npm run dev)**

```bash
cd H:/portfolio-game-launcher && npm run dev
```

Abra http://localhost:3000. Verifique:

- [ ] Fundo preto puro `#000000` em todas as abas
- [ ] Painéis distinguíveis do fundo sem bordas visíveis em repouso
- [ ] Dourado aparece na tab ativa, itens hover, botões, tags, sidebar ativo
- [ ] Botão primário tem texto PRETO sobre fundo dourado
- [ ] Zero azul `#1a9fff` em qualquer componente in-scope
- [ ] SplashScreen: barra de progresso dourada, sem blobs flutuantes, sem glassmorphism
- [ ] Achievement legendary usa a mesma cor dourada do accent de UI

- [ ] **Step 5: Commit final**

```bash
cd H:/portfolio-game-launcher
git add -A
git commit -m "design: AMOLED Zen redesign complete — black/gold palette across all components"
```
