# Steam Visual Identity Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar a identidade visual completa do portfólio para ser fiel à estética original do Steam, eliminando inconsistências, excessos de animação e a mistura de paletas multicoloridas.

**Architecture:** Cada task toca um único arquivo (ou par relacionado). Todas as mudanças são puramente visuais — sem alterações em lógica, data layer, hooks ou funcionalidades. O servidor de dev (`npm run dev`) serve como ambiente de verificação após cada task.

**Tech Stack:** Next.js 15, Tailwind CSS 3, CSS custom properties (tokens), Inter + JetBrains Mono via next/font/google

---

## Mapa de Arquivos

| Arquivo | O que muda |
|---|---|
| `app/globals.css` | Tokens Steam, remoção de classes retro/shimmer/float/pulse |
| `tailwind.config.js` | Cores Steam como tokens customizados |
| `app/layout.tsx` | Adiciona Inter, aplica como body font |
| `app/components/Header.tsx` | Paleta Steam, remove gradiente roxo e shimmer |
| `app/components/Sidebar.tsx` | Paleta Steam, remove glassmorphism e animações contínuas |
| `app/components/ProjectDetail.tsx` | Remove partículas, paleta Steam, reescreve botões e cards |
| `app/components/ProjectsWelcome.tsx` | Tokens Steam, minor cleanup |
| `app/components/ProfileView.tsx` | Unifica skill bars para azul Steam |
| `app/components/ContactView.tsx` | Remove blobs flutuantes, paleta Steam |
| `app/components/AchievementsView.tsx` | Paleta Steam no layout, mantém rarity system |

---

## Task 1: globals.css — Tokens Steam + limpeza de animações

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Substituir o conteúdo completo de globals.css**

Substitua todo o conteúdo do arquivo pelo seguinte:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── Steam Design Tokens ─── */
:root {
    --steam-dark:       #171a21;
    --steam-navy:       #1b2838;
    --steam-panel:      #16202d;
    --steam-border:     #2a475e;
    --steam-blue:       #1a9fff;
    --steam-blue-dim:   rgba(26, 159, 255, 0.15);
    --steam-blue-border: rgba(26, 159, 255, 0.4);
    --steam-text:       #c6d4df;
    --steam-muted:      #8ba0b4;
    --steam-green:      #4c6b22;
    --steam-green-text: #a4d007;
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        background-color: var(--steam-navy);
        color: var(--steam-text);
    }
}

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--steam-dark); }
::-webkit-scrollbar-thumb {
    background: var(--steam-border);
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover { background: #3d6080; }

/* ─── Transição global leve ─── */
*, *::before, *::after {
    transition-property: color, background-color, border-color, box-shadow, transform, opacity;
    transition-timing-function: ease;
    transition-duration: 150ms;
}

/* ─── Animações permitidas ─── */
@keyframes steam-fade-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
}

@keyframes steam-slide-in {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
}

@keyframes steam-spin {
    to { transform: rotate(360deg); }
}

/* SplashScreen only */
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50%       { transform: translateY(-15px) rotate(180deg); opacity: 1; }
}
@keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
    50%       { transform: translateY(-20px) rotate(-180deg); opacity: 0.8; }
}
@keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 5px rgba(26, 159, 255, 0.4); }
    50%       { box-shadow: 0 0 18px rgba(26, 159, 255, 0.7); }
}
@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.animate-float         { animation: float 4s ease-in-out infinite; }
.animate-float-delayed { animation: float-delayed 5s ease-in-out infinite; animation-delay: 2s; }
.animate-glow-pulse    { animation: glow-pulse 2s ease-in-out infinite; }
.animate-blink         { animation: blink 1s infinite; }
.animate-spin          { animation: steam-spin 1s linear infinite; }

/* ─── Utility classes ─── */
.animate-fade-in     { animation: steam-fade-in 0.3s ease-out forwards; }
.animate-slide-in    { animation: steam-slide-in 0.35s ease-out forwards; }

/* Steam panel */
.steam-panel {
    background-color: var(--steam-panel);
    border: 1px solid var(--steam-border);
    border-radius: 6px;
}

/* Hover padrão Steam: leve elevação + glow azul */
.steam-hover {
    transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.steam-hover:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 16px var(--steam-blue-dim);
    border-color: var(--steam-blue-border);
}

/* Tag de tecnologia */
.steam-tag {
    font-family: var(--font-jetbrains-mono), monospace;
    font-size: 0.7rem;
    padding: 2px 7px;
    border-radius: 2px;
    background: rgba(26, 159, 255, 0.1);
    border: 1px solid rgba(26, 159, 255, 0.3);
    color: var(--steam-blue);
    display: inline-block;
}

/* Botão primário Steam */
.steam-btn-primary {
    background: var(--steam-blue);
    color: #ffffff;
    font-weight: 600;
    border-radius: 4px;
    border: none;
    padding: 6px 14px;
    transition: background 150ms ease, transform 150ms ease;
}
.steam-btn-primary:hover {
    background: #2aa8ff;
    transform: translateY(-1px);
}

/* Botão secundário Steam */
.steam-btn-secondary {
    background: transparent;
    color: var(--steam-text);
    font-weight: 500;
    border-radius: 4px;
    border: 1px solid var(--steam-border);
    padding: 6px 14px;
    transition: border-color 150ms ease, color 150ms ease;
}
.steam-btn-secondary:hover {
    border-color: var(--steam-blue-border);
    color: var(--steam-blue);
}

/* Input Steam */
.steam-input {
    background: #0d1520;
    border: 1px solid var(--steam-border);
    border-radius: 4px;
    color: var(--steam-text);
    transition: border-color 150ms ease, box-shadow 150ms ease;
}
.steam-input:focus {
    outline: none;
    border-color: var(--steam-blue);
    box-shadow: 0 0 0 2px rgba(26, 159, 255, 0.15);
}

/* Sidebar item ativo */
.steam-sidebar-active {
    background: rgba(42, 71, 94, 0.4);
    border-left: 2px solid var(--steam-blue);
    color: var(--steam-blue);
}

/* Achievement rarity (apenas AchievementsView) */
.rarity-common   { border-color: rgba(139, 160, 180, 0.5); }
.rarity-rare     { border-color: rgba(26, 159, 255, 0.5); box-shadow: 0 0 12px rgba(26, 159, 255, 0.15); }
.rarity-epic     { border-color: rgba(155, 89, 182, 0.5); box-shadow: 0 0 12px rgba(155, 89, 182, 0.15); }
.rarity-legendary{ border-color: rgba(255, 215, 0, 0.5);  box-shadow: 0 0 12px rgba(255, 215, 0, 0.15); }

/* line-clamp util */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

- [ ] **Step 2: Verificar no terminal que não há erros de compilação**

```bash
cd H:/portfolio-game-launcher && npm run build 2>&1 | tail -20
```
Esperado: `✓ Compiled successfully` (ou similar sem erros CSS)

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/globals.css
git commit -m "design: rewrite globals.css with Steam design tokens and clean animation system"
```

---

## Task 2: tailwind.config.js + layout.tsx — Tokens Tailwind e tipografia Inter

**Files:**
- Modify: `tailwind.config.js`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Adicionar cores Steam ao tailwind.config.js**

Em `tailwind.config.js`, dentro de `theme.extend.colors`, adicione o bloco `steam`:

```js
// tailwind.config.js  — dentro de theme.extend.colors, após os tokens existentes
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

O resultado final da seção `colors` deve ser:

```js
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
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
},
```

- [ ] **Step 2: Adicionar Inter e substituir fonte padrão em layout.tsx**

Substitua o conteúdo de `app/layout.tsx` por:

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/hooks/use-language'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Miguel Diniz - Desenvolvedor Full Stack',
    description: 'Portfolio profissional minimalista inspirado na Steam, showcasing projetos de desenvolvimento web, mobile e full stack com design escuro e elegante.',
    keywords: 'desenvolvedor, full stack, react, nextjs, nodejs, portfolio, web development, steam, minimalista',
    authors: [{ name: 'Miguel Diniz' }],
    creator: 'Miguel Diniz',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://seu-portfolio.vercel.app',
        title: 'Portfolio Steam - Desenvolvedor Full Stack',
        description: 'Portfolio profissional minimalista inspirado na Steam com design escuro e elegante.',
        siteName: 'MiguelDiniz',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Steam - Desenvolvedor Full Stack',
        description: 'Portfolio profissional minimalista inspirado na Steam com design escuro e elegante.',
        creator: '@DevMiguelDiniz',
    },
    robots: { index: true, follow: true },
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
        <body className={`${inter.className} ${jetBrainsMono.variable} antialiased`}>
        <LanguageProvider>
            {children}
        </LanguageProvider>
        </body>
        </html>
    )
}
```

- [ ] **Step 3: Verificar compilação**

```bash
cd H:/portfolio-game-launcher && npm run build 2>&1 | tail -10
```
Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
cd H:/portfolio-game-launcher
git add tailwind.config.js app/layout.tsx
git commit -m "design: add Steam Tailwind tokens, switch body font to Inter"
```

---

## Task 3: Header.tsx — Paleta Steam, remove gradientes e animações excessivas

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Reescrever Header.tsx**

Substitua o conteúdo completo por:

```tsx
"use client"

import { Github, Linkedin, Mail, User, FolderOpen, MessageCircle, Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "./LanguageSwitcher"
import type { TabType } from "../page"

interface HeaderProps {
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
    sidebarOpen?: boolean
    setSidebarOpen?: (open: boolean) => void
}

export default function Header({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: HeaderProps) {
    const { t } = useLanguage()

    const tabs = [
        { id: "projects" as TabType,     label: t('nav.projects'),     icon: <FolderOpen    className="w-4 h-4" /> },
        { id: "profile" as TabType,      label: t('nav.profile'),      icon: <User          className="w-4 h-4" /> },
        { id: "achievements" as TabType, label: t('nav.achievements'), icon: <Trophy        className="w-4 h-4" /> },
        { id: "contact" as TabType,      label: t('nav.contact'),      icon: <MessageCircle className="w-4 h-4" /> },
    ]

    return (
        <header
            className="h-14 flex items-center justify-between px-4 lg:px-6 border-b"
            style={{ background: 'var(--steam-dark)', borderColor: 'var(--steam-border)' }}
        >
            {/* Left — Logo */}
            <div className="flex items-center gap-3">
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden w-8 h-8 rounded"
                        style={{ color: 'var(--steam-muted)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                )}

                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: 'var(--steam-blue)' }}
                    >
                        P
                    </div>
                    <div className="hidden sm:block">
                        <span className="font-semibold text-base" style={{ color: 'var(--steam-text)' }}>
                            Portfolio
                        </span>
                        <div className="text-xs font-mono" style={{ color: 'var(--steam-muted)' }}>
                            Steam Edition
                        </div>
                    </div>
                </div>
            </div>

            {/* Center — Navigation */}
            <nav
                className="flex items-center gap-0.5 rounded p-0.5"
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--steam-border)' }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded text-sm font-medium transition-colors"
                            style={{
                                background:   isActive ? 'var(--steam-panel)' : 'transparent',
                                color:        isActive ? 'var(--steam-blue)' : 'var(--steam-muted)',
                                borderBottom: isActive ? `2px solid var(--steam-blue)` : '2px solid transparent',
                            }}
                        >
                            {tab.icon}
                            <span className="hidden sm:block">{tab.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Right — Social + Language */}
            <div className="flex items-center gap-1">
                {[
                    { icon: <Github className="w-4 h-4" />,   action: () => window.open('https://github.com/DevMiguelDiniz', '_blank') },
                    { icon: <Linkedin className="w-4 h-4" />, action: () => window.open('https://linkedin.com/in/miguel-diniz', '_blank') },
                    { icon: <Mail className="w-4 h-4" />,     action: () => setActiveTab('contact') },
                ].map((item, i) => (
                    <Button
                        key={i}
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 rounded transition-colors"
                        style={{ color: 'var(--steam-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--steam-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--steam-muted)')}
                        onClick={item.action}
                    >
                        {item.icon}
                    </Button>
                ))}
                <div className="w-px h-5 mx-1" style={{ background: 'var(--steam-border)' }} />
                <LanguageSwitcher />
            </div>
        </header>
    )
}
```

- [ ] **Step 2: Verificar no browser que o header aparece com fundo #171a21 e tabs em azul Steam**

```bash
cd H:/portfolio-game-launcher && npm run dev
```
Abra http://localhost:3000. O header deve ter o fundo escuro Steam, tab ativa com sublinhado azul `#1a9fff`.

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/Header.tsx
git commit -m "design: rewrite Header with Steam Fiel palette, remove gradient and shimmer"
```

---

## Task 4: Sidebar.tsx — Steam library style, remove glassmorphism e animações

**Files:**
- Modify: `app/components/Sidebar.tsx`

- [ ] **Step 1: Reescrever Sidebar.tsx**

Substitua o conteúdo completo por:

```tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, Star } from "lucide-react"
import { projects } from "../data/projects"
import { useLanguage } from "@/hooks/use-language"

interface SidebarProps {
    selectedProject: string | null
    setSelectedProject: (projectId: string | null) => void
    onProjectSelect?: () => void
}

export default function Sidebar({ selectedProject, setSelectedProject, onProjectSelect }: SidebarProps) {
    const { t } = useLanguage()
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")

    const categories = [
        { value: "all",       label: t('sidebar.allCategories') },
        { value: "web",       label: t('sidebar.web') },
        { value: "mobile",    label: t('sidebar.mobile') },
        { value: "fullstack", label: t('sidebar.fullstack') },
        { value: "frontend",  label: t('sidebar.frontend') },
        { value: "desktop",   label: t('sidebar.desktop') },
    ]

    const filteredProjects = projects.filter((p) => {
        const matchesSearch   = p.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || p.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const handleProjectSelect = (projectId: string) => {
        setSelectedProject(projectId)
        onProjectSelect?.()
    }

    const getCategoryLabel = (category: string) => {
        const map: Record<string, string> = {
            web: t('category.web'), mobile: t('category.mobile'),
            fullstack: t('category.fullstack'), frontend: t('category.frontend'),
            backend: t('category.backend'), desktop: t('category.desktop'),
        }
        return map[category] || category
    }

    return (
        <aside
            className="w-80 sm:w-72 lg:w-80 flex flex-col h-full border-r"
            style={{ background: 'var(--steam-panel)', borderColor: 'var(--steam-border)' }}
        >
            {/* Header */}
            <div className="p-4 border-b" style={{ borderColor: 'var(--steam-border)' }}>
                <h2
                    className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
                    style={{ color: 'var(--steam-muted)' }}
                >
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--steam-blue)' }}
                    />
                    {t('sidebar.library')}
                </h2>

                {/* Search */}
                <div className="relative mb-3">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                        style={{ color: 'var(--steam-muted)' }}
                    />
                    <input
                        placeholder={t('sidebar.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="steam-input w-full pl-9 pr-3 py-2 text-sm"
                        style={{ color: 'var(--steam-text)' }}
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--steam-muted)' }} />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="steam-input flex-1 px-2 py-1.5 text-sm"
                        style={{ color: 'var(--steam-text)' }}
                    >
                        {categories.map((c) => (
                            <option key={c.value} value={c.value} style={{ background: 'var(--steam-panel)' }}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Projects list */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    <div
                        className="text-xs uppercase tracking-wider font-medium mb-2 px-2"
                        style={{ color: 'var(--steam-muted)' }}
                    >
                        {filteredProjects.length} {t('sidebar.projectsCount')}
                    </div>

                    <div className="space-y-0.5">
                        {filteredProjects.map((project) => {
                            const isActive = selectedProject === project.id
                            return (
                                <button
                                    key={project.id}
                                    onClick={() => handleProjectSelect(project.id)}
                                    className={`w-full flex items-center gap-3 px-2 py-2.5 rounded text-left transition-colors ${
                                        isActive ? 'steam-sidebar-active' : ''
                                    }`}
                                    style={
                                        isActive
                                            ? {}
                                            : { color: 'var(--steam-text)' }
                                    }
                                    onMouseEnter={(e) => {
                                        if (!isActive) e.currentTarget.style.background = 'rgba(42,71,94,0.2)'
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.background = ''
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="w-10 h-10 rounded overflow-hidden flex-shrink-0"
                                        style={{ border: `1px solid var(--steam-border)` }}
                                    >
                                        <Image
                                            src={project.image || "/placeholder.svg"}
                                            alt={project.title}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-sm font-medium truncate" style={{ color: isActive ? 'var(--steam-blue)' : 'var(--steam-text)' }}>
                                                {project.title}
                                            </span>
                                            {project.featured && (
                                                <Star className="w-3 h-3 flex-shrink-0" style={{ color: 'var(--steam-green-text)', fill: 'var(--steam-green-text)' }} />
                                            )}
                                        </div>
                                        <p className="text-xs truncate mb-1.5" style={{ color: 'var(--steam-muted)' }}>
                                            {getCategoryLabel(project.category)}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            {project.technologies.slice(0, 2).map((tech) => (
                                                <span key={tech} className="steam-tag">{tech}</span>
                                            ))}
                                            {project.technologies.length > 2 && (
                                                <span className="text-xs" style={{ color: 'var(--steam-muted)' }}>
                                                    +{project.technologies.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Stats footer */}
            <div className="p-3 border-t" style={{ borderColor: 'var(--steam-border)', background: 'var(--steam-dark)' }}>
                <div className="flex justify-between text-xs" style={{ color: 'var(--steam-muted)' }}>
                    <span>{t('sidebar.total')}: <span style={{ color: 'var(--steam-text)' }}>{projects.length}</span></span>
                    <span>{t('sidebar.featured')}: <span style={{ color: 'var(--steam-green-text)' }}>{projects.filter(p => p.featured).length}</span></span>
                </div>
            </div>
        </aside>
    )
}
```

- [ ] **Step 2: Verificar visualmente**

No browser (http://localhost:3000), a sidebar deve mostrar:
- Fundo `#16202d` sem efeito blur/glass
- Projeto ativo com `border-left` azul e fundo `#2a475e40`
- Tags de tecnologia em outline azul com fonte mono
- Sem animações contínuas (sem pulsing dots, sem shimmer)

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/Sidebar.tsx
git commit -m "design: rewrite Sidebar with Steam library style, remove glassmorphism"
```

---

## Task 5: ProjectDetail.tsx — Remove partículas, paleta Steam, botões e cards refinados

**Files:**
- Modify: `app/components/ProjectDetail.tsx`

- [ ] **Step 1: Reescrever ProjectDetail.tsx**

Substitua o conteúdo completo por:

```tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, Calendar, Code, Star, Play, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { YouTubeModal, useYouTubeVideoId } from "@/components/ui/youtube-modal"

interface Project {
    id: string
    title: string
    description: string
    longDescription?: string
    image: string
    category: string
    technologies: string[]
    githubUrl?: string
    liveUrl?: string
    videoUrl?: string
    featured?: boolean
    date?: string
    challenges?: string[]
    features?: string[]
}

interface ProjectDetailProps {
    project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const videoId = useYouTubeVideoId(project.videoUrl || '')

    return (
        <div className="h-full overflow-y-auto" style={{ background: 'var(--steam-navy)' }}>
            {/* Hero */}
            <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
                <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, var(--steam-navy) 0%, rgba(27,40,56,0.6) 60%, transparent 100%)' }}
                />

                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8 animate-fade-in">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                            className="px-2.5 py-1 text-xs font-medium uppercase tracking-wide rounded"
                            style={{ background: 'rgba(22,32,45,0.85)', border: '1px solid var(--steam-border)', color: 'var(--steam-muted)' }}
                        >
                            {project.category}
                        </span>
                        {project.featured && (
                            <span
                                className="px-2.5 py-1 text-xs font-semibold rounded flex items-center gap-1"
                                style={{ background: 'var(--steam-green)', color: 'var(--steam-green-text)' }}
                            >
                                <Star className="w-3 h-3 fill-current" />
                                DESTAQUE
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: 'var(--steam-text)' }}>
                        {project.title}
                    </h1>

                    {project.date && (
                        <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--steam-muted)' }}>
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{project.date}</span>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                        {project.liveUrl && (
                            <button
                                className="steam-btn-primary flex items-center gap-2 text-sm"
                                onClick={() => window.open(project.liveUrl, "_blank")}
                            >
                                <Play className="w-3.5 h-3.5" />
                                Ver Demo
                            </button>
                        )}
                        {project.videoUrl && videoId && (
                            <button
                                className="steam-btn-primary flex items-center gap-2 text-sm"
                                onClick={() => setIsVideoModalOpen(true)}
                            >
                                <Video className="w-3.5 h-3.5" />
                                Ver Vídeo
                            </button>
                        )}
                        {project.githubUrl && (
                            <button
                                className="steam-btn-secondary flex items-center gap-2 text-sm"
                                onClick={() => window.open(project.githubUrl, "_blank")}
                            >
                                <Github className="w-3.5 h-3.5" />
                                Ver Código
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
                <div className="max-w-5xl mx-auto space-y-8">

                    {/* Description */}
                    <section className="animate-fade-in">
                        <SectionHeader icon={<Code className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />} title="Sobre este projeto" />
                        <div className="steam-panel p-5 lg:p-6 steam-hover">
                            <p className="text-sm lg:text-base leading-relaxed" style={{ color: 'var(--steam-text)' }}>
                                {project.longDescription || project.description}
                            </p>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section className="animate-slide-in">
                        <SectionHeader icon={<Code className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />} title="Tecnologias utilizadas" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {project.technologies.map((tech) => (
                                <div
                                    key={tech}
                                    className="steam-panel steam-hover p-3 text-center"
                                    style={{ color: 'var(--steam-text)', fontSize: '0.85rem', fontFamily: 'var(--font-jetbrains-mono)' }}
                                >
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Features */}
                    {project.features && (
                        <section className="animate-slide-in">
                            <SectionHeader icon={<Star className="w-4 h-4 fill-current" style={{ color: 'var(--steam-green-text)' }} />} title="Principais funcionalidades" />
                            <div className="steam-panel p-5 lg:p-6">
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {project.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--steam-blue)' }} />
                                            <span className="text-sm leading-relaxed" style={{ color: 'var(--steam-text)' }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                        <section className="animate-slide-in">
                            <SectionHeader icon={<Code className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />} title="Desafios superados" />
                            <div className="steam-panel p-5 lg:p-6">
                                <div className="space-y-3">
                                    {project.challenges.map((challenge, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--steam-muted)' }} />
                                            <span className="text-sm leading-relaxed" style={{ color: 'var(--steam-text)' }}>{challenge}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Links */}
                    {(project.liveUrl || project.videoUrl || project.githubUrl) && (
                        <section className="animate-fade-in">
                            <div className="steam-panel p-5 lg:p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ExternalLink className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />
                                    <h3 className="text-sm font-semibold" style={{ color: 'var(--steam-text)' }}>Links do projeto</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {project.liveUrl && (
                                        <button className="steam-btn-primary flex items-center gap-2 text-sm" onClick={() => window.open(project.liveUrl, "_blank")}>
                                            <ExternalLink className="w-3.5 h-3.5" /> Demonstração ao vivo
                                        </button>
                                    )}
                                    {project.videoUrl && videoId && (
                                        <button className="steam-btn-primary flex items-center gap-2 text-sm" onClick={() => setIsVideoModalOpen(true)}>
                                            <Video className="w-3.5 h-3.5" /> Vídeo demonstração
                                        </button>
                                    )}
                                    {project.githubUrl && (
                                        <button className="steam-btn-secondary flex items-center gap-2 text-sm" onClick={() => window.open(project.githubUrl, "_blank")}>
                                            <Github className="w-3.5 h-3.5" /> Repositório no GitHub
                                        </button>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {project.videoUrl && videoId && (
                <YouTubeModal
                    isOpen={isVideoModalOpen}
                    onClose={() => setIsVideoModalOpen(false)}
                    videoId={videoId}
                    title={`${project.title} - Demonstração`}
                />
            )}
        </div>
    )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <h2 className="text-base lg:text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--steam-text)' }}>
            {icon}
            {title}
        </h2>
    )
}
```

- [ ] **Step 2: Adicionar import do React no topo do arquivo** (necessário para o tipo `React.ReactNode`)

Verifique que o import já existe ou adicione na primeira linha:

```tsx
import React from "react"
```

- [ ] **Step 3: Verificar no browser**

Selecione um projeto na sidebar. O detalhe deve mostrar:
- Hero com gradiente Steam sem partículas flutuantes
- Badge "DESTAQUE" em verde Steam (não amarelo gradiente)
- Botões em azul Steam plano (não gradiente verde/vermelho)
- Cards de seção com borda `#2a475e` sem glassmorphism

- [ ] **Step 4: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ProjectDetail.tsx
git commit -m "design: rewrite ProjectDetail with Steam Refinado style, remove particles and gradient buttons"
```

---

## Task 6: ProjectsWelcome.tsx — Tokens Steam, cleanup menor

**Files:**
- Modify: `app/components/ProjectsWelcome.tsx`

- [ ] **Step 1: Reescrever ProjectsWelcome.tsx**

Substitua o conteúdo completo por:

```tsx
"use client"

import { FolderOpen, Star, Code, TrendingUp } from "lucide-react"
import { projects } from "../data/projects"
import { useLanguage } from "@/hooks/use-language"

export default function ProjectsWelcome() {
    const { t } = useLanguage()
    const featuredCount     = projects.filter((p) => p.featured).length
    const totalTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].length

    const stats = [
        { icon: <Code className="w-5 h-5" />, value: projects.length, label: 'Projetos totais', color: 'var(--steam-text)' },
        { icon: <Star className="w-5 h-5 fill-current" />, value: featuredCount, label: 'Em destaque', color: 'var(--steam-blue)' },
        { icon: <TrendingUp className="w-5 h-5" />, value: totalTechnologies, label: 'Tecnologias', color: 'var(--steam-text)' },
    ]

    return (
        <div className="h-full flex items-center justify-center p-4 lg:p-8" style={{ background: 'var(--steam-navy)' }}>
            <div className="text-center max-w-xl animate-fade-in">
                <div
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'var(--steam-panel)', border: '1px solid var(--steam-border)' }}
                >
                    <FolderOpen className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: 'var(--steam-muted)' }} />
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: 'var(--steam-text)' }}>
                    Bem-vindo à{' '}
                    <span style={{ color: 'var(--steam-blue)' }}>Biblioteca</span>
                </h1>

                <p className="text-sm lg:text-base mb-8 px-4" style={{ color: 'var(--steam-muted)' }}>
                    Selecione um projeto na barra lateral para explorar detalhes, tecnologias utilizadas, desafios superados e ver demonstrações ao vivo.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="steam-panel p-4 lg:p-5 steam-hover"
                        >
                            <div
                                className="w-9 h-9 rounded flex items-center justify-center mx-auto mb-2"
                                style={{ background: 'rgba(26,159,255,0.1)', color: stat.color }}
                            >
                                {stat.icon}
                            </div>
                            <div className="text-xl lg:text-2xl font-bold mb-0.5" style={{ color: stat.color }}>
                                {stat.value}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--steam-muted)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                <p className="text-xs" style={{ color: 'var(--steam-muted)' }}>
                    💡 Use a busca e filtros na barra lateral para encontrar projetos específicos
                </p>
            </div>
        </div>
    )
}
```

- [ ] **Step 2: Verificar no browser**

Sem projeto selecionado, a tela principal deve mostrar:
- Fundo `#1b2838`, cards de stat com borda Steam, ícone central em painel escuro

- [ ] **Step 3: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ProjectsWelcome.tsx
git commit -m "design: rewrite ProjectsWelcome with Steam tokens"
```

---

## Task 7: ProfileView.tsx — Unificar skill bars para azul Steam, remover glassmorphism

**Files:**
- Modify: `app/components/ProfileView.tsx`

- [ ] **Step 1: Ler as linhas 60–200 do arquivo para ver a estrutura de skills e cards**

```bash
cd H:/portfolio-game-launcher && head -200 app/components/ProfileView.tsx | tail -140
```

- [ ] **Step 2: Substituir o array `skills` e os cards de skill**

Localize o array `skills` (linhas ~11–44) e substitua-o por:

```tsx
const skills = [
    {
        icon: <Globe className="w-5 h-5" />,
        title: t('skill.frontend'),
        description: "React, Next.js, TypeScript, Tailwind CSS",
        level: 95,
    },
    {
        icon: <Database className="w-5 h-5" />,
        title: t('skill.backend'),
        description: "Node.js, Python, PostgreSQL, MongoDB",
        level: 88,
    },
    {
        icon: <Smartphone className="w-5 h-5" />,
        title: t('skill.mobile'),
        description: "React Native, Flutter, iOS, Android",
        level: 82,
    },
    {
        icon: <Code className="w-5 h-5" />,
        title: t('skill.devops'),
        description: "Docker, AWS, Vercel, CI/CD",
        level: 75,
    },
]
```

- [ ] **Step 3: Localizar a renderização dos cards de skill e substituir**

Encontre o bloco que renderiza os `skills.map(...)` — geralmente em `<div className="grid ...">`. Substitua o interior do map por:

```tsx
{skills.map((skill, index) => (
    <div
        key={index}
        className="steam-panel steam-hover p-4 lg:p-5"
    >
        <div className="flex items-center gap-3 mb-3">
            <div
                className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(26,159,255,0.1)', color: 'var(--steam-blue)' }}
            >
                {skill.icon}
            </div>
            <div>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--steam-text)' }}>{skill.title}</h3>
                <p className="text-xs" style={{ color: 'var(--steam-muted)' }}>{skill.description}</p>
            </div>
        </div>
        {/* Progress bar */}
        <div className="flex items-center gap-2">
            <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--steam-border)' }}
            >
                <div
                    className="h-full rounded-full"
                    style={{ width: `${skill.level}%`, background: 'var(--steam-blue)' }}
                />
            </div>
            <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--steam-muted)', fontFamily: 'var(--font-jetbrains-mono)' }}>
                {skill.level}%
            </span>
        </div>
    </div>
))}
```

- [ ] **Step 4: Localizar o hero/header do ProfileView e remover gradientes purple**

Encontre a div que renderiza a foto de perfil + nome. Substitua qualquer `from-blue-500 to-purple-600` no logo/avatar por:

```tsx
style={{ background: 'var(--steam-blue)' }}
```

E qualquer `bg-gradient-to-br from-gray-950 ...` no fundo geral por:

```tsx
style={{ background: 'var(--steam-navy)' }}
```

- [ ] **Step 5: Verificar no browser**

Na aba Perfil, as barras de skill devem ser azul Steam (`#1a9fff`) para todas as categorias. Sem glassmorphism.

- [ ] **Step 6: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ProfileView.tsx
git commit -m "design: unify ProfileView skill bars to Steam blue, remove glassmorphism cards"
```

---

## Task 8: ContactView.tsx — Remove blobs, paleta Steam, inputs refinados

**Files:**
- Modify: `app/components/ContactView.tsx`

- [ ] **Step 1: Ler linhas 53–200 do ContactView.tsx**

```bash
cd H:/portfolio-game-launcher && sed -n '53,200p' app/components/ContactView.tsx
```

- [ ] **Step 2: Remover background decoration com blobs flutuantes**

Localize e remova as linhas:

```tsx
{/* Background decoration */}
<div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-float"></div>
    <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-float-delayed"></div>
</div>
```

- [ ] **Step 3: Substituir o hero section pelo equivalente Steam**

Localize a `div` com classe `bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800/50 p-4 lg:p-8 relative overflow-hidden` e substitua por:

```tsx
<div
    className="border-b p-4 lg:p-8"
    style={{ background: 'var(--steam-dark)', borderColor: 'var(--steam-border)' }}
>
    <div className="max-w-4xl mx-auto text-center">
        <div
            className="w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4 rounded flex items-center justify-center"
            style={{ background: 'rgba(26,159,255,0.15)', border: '1px solid rgba(26,159,255,0.3)' }}
        >
            <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8" style={{ color: 'var(--steam-blue)' }} />
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-3 animate-fade-in" style={{ color: 'var(--steam-text)' }}>
            {t('contact.title')}
        </h1>
        <p className="text-sm lg:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--steam-muted)' }}>
            {t('contact.subtitle')}
        </p>
    </div>
</div>
```

- [ ] **Step 4: Atualizar o fundo geral e cards de contato**

Substitua `bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950` na `div` raiz por:

```tsx
style={{ background: 'var(--steam-navy)' }}
```

Para cada card de informação de contato (email, telefone, localização), substitua os gradientes coloridos nos ícones por:

```tsx
style={{ background: 'rgba(26,159,255,0.1)', color: 'var(--steam-blue)' }}
```

- [ ] **Step 5: Atualizar inputs e textarea do formulário**

Adicione a classe `steam-input` e remova `input-enhanced` de cada `<Input>` e `<Textarea>`:

```tsx
// Antes
<Input className="input-enhanced ..." ... />
// Depois
<Input className="steam-input w-full px-3 py-2 text-sm" ... />
```

```tsx
// Antes
<Textarea className="input-enhanced ..." ... />
// Depois
<Textarea className="steam-input w-full px-3 py-2 text-sm resize-none" ... />
```

- [ ] **Step 6: Atualizar botão de envio**

Substitua qualquer `btn-enhanced` ou `bg-gradient-to-r from-blue-600...` no botão de submit por:

```tsx
className="steam-btn-primary w-full flex items-center justify-center gap-2 py-2.5"
```

- [ ] **Step 7: Verificar no browser**

Na aba Contato:
- Sem blobs flutuantes no hero
- Ícones de contato com background azul Steam sutil (não gradientes coloridos)
- Inputs com borda Steam, focus azul sem blur excessivo
- Botão de envio azul Steam plano

- [ ] **Step 8: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/ContactView.tsx
git commit -m "design: remove floating blobs, apply Steam palette to ContactView"
```

---

## Task 9: AchievementsView.tsx — Paleta Steam no layout, mantém rarity system

**Files:**
- Modify: `app/components/AchievementsView.tsx`

- [ ] **Step 1: Ler linhas 80–200 do AchievementsView.tsx**

```bash
cd H:/portfolio-game-launcher && sed -n '80,200p' app/components/AchievementsView.tsx
```

- [ ] **Step 2: Substituir cores do array categoryStats**

Localize o array `categoryStats` (linhas ~36–79) e substitua as propriedades `color` e `bgColor` de cada item pelos equivalentes Steam:

```tsx
const categoryStats = [
    {
        name: t('category.frontend'),
        count: projects.filter((p) => p.category === "frontend").length,
        icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" />,
        color: 'var(--steam-blue)',
        bgColor: 'rgba(26,159,255,0.1)',
    },
    {
        name: t('category.backend'),
        count: projects.filter((p) => p.category === "backend").length,
        icon: <Database className="w-4 h-4 lg:w-5 lg:h-5" />,
        color: 'var(--steam-blue)',
        bgColor: 'rgba(26,159,255,0.1)',
    },
    {
        name: t('category.mobile'),
        count: projects.filter((p) => p.category === "mobile").length,
        icon: <Smartphone className="w-4 h-4 lg:w-5 lg:h-5" />,
        color: 'var(--steam-blue)',
        bgColor: 'rgba(26,159,255,0.1)',
    },
    {
        name: t('category.fullstack'),
        count: projects.filter((p) => p.category === "fullstack").length,
        icon: <Code className="w-4 h-4 lg:w-5 lg:h-5" />,
        color: 'var(--steam-blue)',
        bgColor: 'rgba(26,159,255,0.1)',
    },
    {
        name: t('category.web'),
        count: projects.filter((p) => p.category === "web").length,
        icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" />,
        color: 'var(--steam-blue)',
        bgColor: 'rgba(26,159,255,0.1)',
    },
    {
        name: t('category.desktop'),
        count: projects.filter((p) => p.category === "desktop").length,
        icon: <Code className="w-4 h-4 lg:w-5 lg:h-5" />,
        color: 'var(--steam-blue)',
        bgColor: 'rgba(26,159,255,0.1)',
    },
].filter((cat) => cat.count > 0)
```

- [ ] **Step 3: Atualizar renderização dos categoryStats para usar style inline**

Encontre onde `categoryStats` é mapeado e certifique-se de que usa `style` ao invés de classes Tailwind de cor:

```tsx
// Ícone da categoria:
<div
    className="w-8 h-8 rounded flex items-center justify-center"
    style={{ background: cat.bgColor, color: cat.color }}
>
    {cat.icon}
</div>

// Barra de progresso da categoria:
<div
    className="h-1.5 rounded-full"
    style={{ width: `${Math.round((cat.count / totalProjects) * 100)}%`, background: cat.color }}
/>
```

- [ ] **Step 4: Substituir fundo geral e hero da AchievementsView**

Localize a div raiz com `bg-gradient-to-br from-gray-950...` e substitua por:

```tsx
style={{ background: 'var(--steam-navy)' }}
```

Localize qualquer hero header com `bg-gradient-to-r from-gray-900...` e substitua por:

```tsx
style={{ background: 'var(--steam-dark)', borderColor: 'var(--steam-border)' }}
```

- [ ] **Step 5: Verificar que os achievement cards com rarity-* continuam funcionando**

Os cards de conquista devem manter suas bordas coloridas de raridade. No browser, verifique:
- Cards desbloqueados: borda `rarity-rare` (azul Steam) ou outra raridade
- Cards bloqueados: borda `rarity-common` (cinza)
- Ícones de categoria: todos em azul Steam (sem arco-íris de cores)

- [ ] **Step 6: Commit**

```bash
cd H:/portfolio-game-launcher
git add app/components/AchievementsView.tsx
git commit -m "design: apply Steam palette to AchievementsView layout, keep rarity system"
```

---

## Task 10: Verificação final e ajustes

**Files:** Nenhum — apenas verificação visual

- [ ] **Step 1: Rodar o servidor de dev**

```bash
cd H:/portfolio-game-launcher && npm run dev
```

- [ ] **Step 2: Checklist visual — percorra cada aba**

Abra http://localhost:3000 e verifique:

- [ ] **Header**: fundo `#171a21`, tab ativa com sublinhado azul `#1a9fff`, sem roxo, sem shimmer
- [ ] **Sidebar**: fundo `#16202d`, item ativo com border-left azul, tags com outline azul, sem partículas pulsantes
- [ ] **ProjectsWelcome** (sem projeto selecionado): fundo `#1b2838`, cards de stat com borda Steam
- [ ] **ProjectDetail** (com projeto selecionado): hero sem partículas flutuantes, badge "DESTAQUE" em verde Steam, botões em azul Steam plano
- [ ] **Perfil**: barras de skill todas em `#1a9fff`, sem glassmorphism, sem gradientes multicoloridos
- [ ] **Contato**: sem blobs flutuantes, ícones de contato com fundo azul sutil, inputs com borda Steam
- [ ] **Conquistas**: layout em paleta Steam, cores de raridade intactas nos cards

- [ ] **Step 3: Verificar ausência de animações contínuas**

Inspecione com DevTools: nenhum elemento fora do SplashScreen deve ter `animation` ativa quando em repouso.

- [ ] **Step 4: Build de produção sem erros**

```bash
cd H:/portfolio-game-launcher && npm run build
```
Esperado: `✓ Compiled successfully` sem erros TypeScript ou CSS.

- [ ] **Step 5: Commit final**

```bash
cd H:/portfolio-game-launcher
git commit --allow-empty -m "design: Steam visual identity redesign complete"
```

---

## Referências

- Spec: `docs/superpowers/specs/2026-05-27-steam-visual-identity-redesign.md`
- Tokens CSS definidos em: `app/globals.css` (`:root` block)
- Cores Steam no Tailwind: `tailwind.config.js` → `theme.extend.colors.steam`
