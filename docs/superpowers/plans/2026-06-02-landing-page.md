# Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar uma landing page pública em `/` que apresenta Miguel Diniz (hero, stats, experiência, stack, CTA) e move o portfolio-launcher para `/app`.

**Architecture:** A landing é um Server Component puro (`app/page.tsx` → importa `LandingPage.tsx`). O launcher atual em `app/page.tsx` move para `app/app/page.tsx`. O `TabType` sai de `page.tsx` para um `app/types.ts` compartilhado para evitar acoplamento de import entre rotas. O único Client Component novo é `CVButton.tsx` (precisa de `onClick`).

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS, design system AMOLED (glass-panel, glass-gold, steam-tag, steam-btn-*)

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/types.ts` | Criar | Exporta `TabType` — fonte única de verdade |
| `app/components/Header.tsx` | Modificar (1 linha) | Atualiza import de `TabType` |
| `app/app/page.tsx` | Criar | Launcher movido para `/app` |
| `app/landing/CVButton.tsx` | Criar | Client Component — download do CV |
| `app/landing/LandingPage.tsx` | Criar | Server Component — toda a landing |
| `app/page.tsx` | Substituir | Entry point de `/` com metadata SEO |

---

## Task 1: Criar `app/types.ts` e atualizar import no Header

**Files:**
- Create: `app/types.ts`
- Modify: `app/components/Header.tsx` (linha 8: import de TabType)

- [ ] **Step 1: Criar `app/types.ts`**

```ts
export type TabType = "projects" | "profile" | "contact" | "achievements"
```

- [ ] **Step 2: Atualizar import em `app/components/Header.tsx`**

Linha atual:
```tsx
import type { TabType } from "../page"
```

Substituir por:
```tsx
import type { TabType } from "../types"
```

- [ ] **Step 3: Verificar que o projeto ainda compila**

```bash
cd H:\portfolio-game-launcher && pnpm tsc --noEmit
```

Expected: sem erros de tipo.

- [ ] **Step 4: Commit**

```bash
git add app/types.ts app/components/Header.tsx
git commit -m "refactor: extract TabType to app/types.ts to decouple route imports"
```

---

## Task 2: Mover launcher para `app/app/page.tsx`

**Files:**
- Create: `app/app/page.tsx`

O conteúdo é idêntico ao `app/page.tsx` atual, com dois ajustes nos caminhos de import.

- [ ] **Step 1: Criar `app/app/page.tsx` com o conteúdo completo**

```tsx
"use client"

import { useState, useEffect } from "react"
import SplashScreen from "../components/SplashScreen"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import ProjectsView from "../components/ProjectsView"
import ProfileView from "../components/ProfileView"
import ContactView from "../components/ContactView"
import AchievementsView from "../components/AchievementsView"
import type { TabType } from "../types"

export default function PortfolioApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("projects")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectsView selectedProject={selectedProject} />
      case "profile":
        return <ProfileView />
      case "contact":
        return <ContactView />
      case "achievements":
        return <AchievementsView />
      default:
        return <ProjectsView selectedProject={selectedProject} />
    }
  }

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-gray-950 animate-fade-in">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex h-[calc(100vh-64px)] relative">
        {activeTab === "projects" && (
          <>
            {/* Mobile Overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`
                fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
                transform transition-transform duration-300 ease-in-out lg:transform-none
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              `}
            >
              <Sidebar
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                onProjectSelect={() => setSidebarOpen(false)}
              />
            </div>
          </>
        )}

        <main className={`flex-1 overflow-y-auto ${activeTab === "projects" ? "" : "w-full"}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar que o launcher em `/app` funciona**

```bash
pnpm dev
```

Abrir http://localhost:3000/app — deve aparecer o SplashScreen e em seguida o launcher completo.

- [ ] **Step 3: Commit**

```bash
git add app/app/page.tsx
git commit -m "feat: add /app route with portfolio launcher"
```

---

## Task 3: Criar `app/landing/CVButton.tsx`

**Files:**
- Create: `app/landing/CVButton.tsx`

Componente Client mínimo — o único motivo para existir é o `onClick` do download.

- [ ] **Step 1: Criar o arquivo**

```tsx
"use client"

export default function CVButton() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/CV/Miguel_Diniz_CV_PT.pdf'
    link.download = 'Miguel_Diniz_CV_PT.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="steam-btn-secondary flex items-center gap-2 text-sm"
      style={{ borderRadius: 'var(--radius-md)', padding: '14px 18px' }}
    >
      ⬇ CV
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/landing/CVButton.tsx
git commit -m "feat: add CVButton client component for landing CV download"
```

---

## Task 4: Criar `app/landing/LandingPage.tsx`

**Files:**
- Create: `app/landing/LandingPage.tsx`

Server Component puro. Importa dados de projetos para calcular stats dinamicamente.

- [ ] **Step 1: Criar o arquivo completo**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { projects } from '../data/projects'
import CVButton from './CVButton'

const STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Flutter', 'PostgreSQL', 'Docker', 'SpringBoot',
]

export default function LandingPage() {
  const totalProjects = projects.length
  const uniqueTechs = [...new Set(projects.flatMap((p) => p.technologies))].length

  const stats = [
    { value: String(totalProjects), label: 'PROJETOS' },
    { value: `${uniqueTechs}+`,     label: 'TECHS' },
    { value: '2+',                  label: 'ANOS' },
    { value: '5+',                  label: 'CERTS' },
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-8"
      style={{ background: '#000000' }}
    >
      {/* Background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,165,42,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="w-full relative flex flex-col" style={{ maxWidth: '640px', gap: '12px' }}>

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-1">
          <div
            className="w-7 h-7 flex items-center justify-center font-bold text-sm"
            style={{ background: 'var(--amoled-gold)', borderRadius: 'var(--radius-sm)', color: '#000' }}
          >
            P
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DevMiguelDiniz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-yellow-500"
              style={{ color: '#3a3a3a' }}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/miguel-diniz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-yellow-500"
              style={{ color: '#3a3a3a' }}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <Link
              href="/app"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-yellow-500"
              style={{ color: '#3a3a3a' }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contato</span>
            </Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <div
          className="glass-gold flex items-center gap-5 p-6 sm:p-7"
          style={{ borderRadius: 'var(--radius-xl)' }}
        >
          <div
            className="overflow-hidden flex-shrink-0 border-2"
            style={{
              width: 'clamp(60px, 10vw, 80px)',
              height: 'clamp(60px, 10vw, 80px)',
              borderRadius: '20px',
              borderColor: 'rgba(201,165,42,0.4)',
              boxShadow: '0 0 24px rgba(201,165,42,0.15)',
            }}
          >
            <Image
              src="/Miguel.jpg"
              alt="Miguel Diniz"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1
              className="font-extrabold mb-1 leading-tight"
              style={{
                fontSize: 'clamp(20px, 4vw, 26px)',
                letterSpacing: '-0.03em',
                color: 'var(--amoled-text)',
              }}
            >
              Miguel Diniz
            </h1>
            <p
              className="font-semibold mb-3"
              style={{ fontSize: '14px', color: 'var(--amoled-gold)' }}
            >
              Full Stack Developer
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="glass-surface flex items-center gap-1.5 px-2.5 py-1 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-green-text)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--amoled-green-text)' }}
                />
                Disponível
              </span>
              <span
                className="glass-surface px-2.5 py-1 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
              >
                📍 Belo Horizonte
              </span>
              <span
                className="glass-surface px-2.5 py-1 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
              >
                🎓 PUC Minas
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel text-center p-3"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <div
                className="font-extrabold"
                style={{ fontSize: '20px', color: 'var(--amoled-gold)', letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </div>
              <div
                className="mt-0.5 uppercase tracking-wider"
                style={{ fontSize: '9px', color: 'var(--amoled-muted)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Experiência ── */}
        <div className="glass-panel p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <p
            className="uppercase tracking-widest mb-3"
            style={{ fontSize: '10px', color: 'var(--amoled-muted)' }}
          >
            Experiência
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: 'var(--amoled-gold)',
                boxShadow: '0 0 8px rgba(201,165,42,0.5)',
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: 'var(--amoled-text)' }}>
                Estágio Full Stack — JdsDev
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--amoled-muted)' }}>
                React · Next.js · SpringBoot · 2025 – presente
              </p>
            </div>
            <span
              className="flex-shrink-0 text-xs px-2 py-0.5"
              style={{
                background: 'rgba(164,208,7,0.1)',
                border: '1px solid rgba(164,208,7,0.2)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--amoled-green-text)',
              }}
            >
              Atual
            </span>
          </div>
        </div>

        {/* ── Stack ── */}
        <div className="glass-panel p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <p
            className="uppercase tracking-widest mb-3"
            style={{ fontSize: '10px', color: 'var(--amoled-muted)' }}
          >
            Stack Principal
          </p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="steam-tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex gap-2.5">
          <Link
            href="/app"
            className="steam-btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
            style={{
              borderRadius: 'var(--radius-md)',
              padding: '14px 24px',
              boxShadow: '0 4px 20px rgba(201,165,42,0.3)',
            }}
          >
            Acessar Portfolio <span aria-hidden>→</span>
          </Link>
          <CVButton />
        </div>

        {/* ── Footer ── */}
        <p
          className="text-center"
          style={{
            fontSize: '10px',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            color: '#2a2a2a',
            letterSpacing: '0.05em',
          }}
        >
          portfolio v2.0 · apple glass edition · next.js 15
        </p>

      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar tipagem**

```bash
pnpm tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add app/landing/LandingPage.tsx
git commit -m "feat: add LandingPage server component with hero, stats, xp, stack, CTA"
```

---

## Task 5: Substituir `app/page.tsx` pela landing

**Files:**
- Modify: `app/page.tsx` (substituição completa)

- [ ] **Step 1: Substituir o conteúdo de `app/page.tsx`**

```tsx
import type { Metadata } from 'next'
import LandingPage from './landing/LandingPage'

export const metadata: Metadata = {
  title: 'Miguel Diniz — Full Stack Developer',
  description: 'Portfolio profissional de Miguel Diniz, desenvolvedor Full Stack especializado em React, Next.js, Node.js e Flutter.',
  keywords: 'desenvolvedor, full stack, react, nextjs, nodejs, flutter, portfolio',
  authors: [{ name: 'Miguel Diniz' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Miguel Diniz — Full Stack Developer',
    description: 'Portfolio profissional de Miguel Diniz, desenvolvedor Full Stack especializado em React, Next.js, Node.js e Flutter.',
  },
}

export default function Home() {
  return <LandingPage />
}
```

- [ ] **Step 2: Verificar que `/` mostra a landing e `/app` mostra o launcher**

```bash
pnpm dev
```

- Abrir http://localhost:3000 → deve aparecer a landing (hero dourado, stats, experiência, stack, CTA)
- Clicar "Acessar Portfolio →" → deve navegar para http://localhost:3000/app com o SplashScreen
- http://localhost:3000/app direto → launcher funcionando normalmente

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace root route with landing page, move launcher to /app"
```

---

## Task 6: Verificação final

**Files:** nenhum

- [ ] **Step 1: Build de produção**

```bash
pnpm build
```

Expected: build limpo, sem erros de TypeScript ou Next.js. As rotas `/` e `/app` devem aparecer na saída do build.

- [ ] **Step 2: Checklist visual**

Com `pnpm dev` aberto:

**Landing (`/`):**
- [ ] Top bar com logo "P" dourado + links GitHub / LinkedIn / Contato
- [ ] Hero card glass-gold com foto (não placeholder), nome, cargo, badges
- [ ] 4 stat cards com valores dinâmicos (número real de projetos/techs)
- [ ] Card de experiência com dot dourado e tag "Atual" verde
- [ ] Stack com 8 tags `.steam-tag`
- [ ] Botão "Acessar Portfolio →" gold + botão "⬇ CV" outline
- [ ] Footer discreto visível
- [ ] Mobile (resize para <640px): avatar menor, layout responsivo

**Launcher (`/app`):**
- [ ] SplashScreen aparece por ~4s
- [ ] Launcher abre normalmente (header, sidebar, conteúdo)
- [ ] Todas as abas funcionam (Projects, Profile, Achievements, Contact)

- [ ] **Step 3: Commit final (se sobrou algo não commitado)**

```bash
git add -A
git commit -m "feat: landing page complete — public / route with glass AMOLED design"
```
