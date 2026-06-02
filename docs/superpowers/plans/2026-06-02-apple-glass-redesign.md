# Apple Glass Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Estender o design system AMOLED com glassmorphism estilo Apple — blur, bordas brilhantes, sombras profundas e border-radius generoso — sobre o layout de launcher existente.

**Architecture:** Todas as mudanças são puramente visuais: nenhuma lógica de componente é alterada. A fundação é um conjunto de novas classes CSS (`.glass-panel`, `.glass-surface`, `.glass-gold`) e tokens de radius (`--radius-sm` a `--radius-xl`) adicionados ao `globals.css`. Cada componente então aplica essas classes em substituição aos estilos inline de fundo (`background: var(--amoled-panel/black)`).

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, CSS custom properties

---

## Mapa de arquivos

| Arquivo | Tipo de mudança |
|---|---|
| `app/globals.css` | Modificar — adicionar tokens, classes glass, atualizar steam-*, transitions, scrollbar |
| `app/components/Sidebar.tsx` | Modificar — glass no aside, radius nos itens e thumbnail |
| `app/components/Header.tsx` | Modificar — glass-surface no header, radius no nav pill e logo |
| `app/components/ProjectDetail.tsx` | Modificar — glass-panel no painel principal, glass-gold nos sub-painéis |
| `app/components/ProfileView.tsx` | Modificar — substituir classes legadas, aplicar glass, alinhar cores ao AMOLED |
| `app/components/AchievementsView.tsx` | Modificar — glass-panel nos cards de achievement |
| `app/components/ContactView.tsx` | Modificar — glass-surface no form, glass-gold no hero icon |
| `app/components/SplashScreen.tsx` | Modificar — glass-gold no painel central, radius nos elementos |

`ProjectsWelcome.tsx` herda as melhorias automaticamente via `.steam-panel.steam-hover` atualizado em Task 1 — sem edição direta necessária.

---

## Task 1: Fundação — globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Substituir o conteúdo completo de `globals.css`**

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
    --amoled-gold-hover:   #d4b030;
    --amoled-gold-dim:     rgba(201, 165, 42, 0.12);
    --amoled-gold-border:  rgba(201, 165, 42, 0.35);
    --amoled-text:         #f0f0f0;
    --amoled-muted:        #606060;
    --amoled-green:        #4c6b22;
    --amoled-green-text:   #a4d007;
    --amoled-border-hover: #2a2a2a;

    /* Apple Glass radius scale */
    --radius-sm:  10px;
    --radius-md:  16px;
    --radius-lg:  22px;
    --radius-xl:  28px;
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
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--amoled-black); }
::-webkit-scrollbar-thumb {
    background: var(--amoled-border);
    border-radius: var(--radius-sm);
}
::-webkit-scrollbar-thumb:hover { background: var(--amoled-border-hover); }

/* ─── Transição global ─── */
*, *::before, *::after {
    transition-property: color, background-color, border-color, box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
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

/* ─── Apple Glass utilities ─── */
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

/* ─── Panel AMOLED Zen ─── */
.steam-panel {
    background-color: var(--amoled-panel);
    border-radius: var(--radius-lg);
}

.steam-hover {
    border: 1px solid transparent;
    border-radius: var(--radius-lg);
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
                border-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.steam-hover:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
    border-color: var(--amoled-gold-border);
}

/* Tag de tecnologia */
.steam-tag {
    font-family: var(--font-jetbrains-mono), monospace;
    font-size: 0.7rem;
    padding: 2px 7px;
    border-radius: var(--radius-sm);
    background: rgba(201, 165, 42, 0.08);
    border: 1px solid rgba(201, 165, 42, 0.2);
    color: var(--amoled-gold);
    display: inline-block;
}

/* Botão primário */
.steam-btn-primary {
    background: var(--amoled-gold);
    color: var(--amoled-black);
    font-weight: 700;
    border-radius: var(--radius-sm);
    border: none;
    padding: 6px 14px;
    transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1),
                transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.steam-btn-primary:hover {
    background: var(--amoled-gold-hover);
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
    border-radius: var(--radius-sm);
    border: 1px solid var(--amoled-border);
    padding: 6px 14px;
    transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
                color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.steam-btn-secondary:hover {
    border-color: var(--amoled-gold-border);
    color: var(--amoled-gold);
}

/* Input */
.steam-input {
    background: var(--amoled-black);
    border: 1px solid var(--amoled-border);
    border-radius: var(--radius-sm);
    color: var(--amoled-text);
    transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.steam-input:focus {
    outline: none;
    border-color: var(--amoled-gold);
    box-shadow: 0 0 0 2px var(--amoled-gold-dim);
}

/* Sidebar item ativo — glass-gold redefinido */
.steam-sidebar-active {
    background: rgba(201, 165, 42, 0.08) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(201, 165, 42, 0.2) !important;
    border-radius: var(--radius-md) !important;
    color: var(--amoled-gold);
}

/* Achievement rarity */
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

- [ ] **Step 2: Iniciar o dev server e verificar visualmente**

```bash
pnpm dev
```

Abrir http://localhost:3000. Verificar:
- `ProjectsWelcome` (tela inicial) — cards com border-radius 22px visível
- Tags de tecnologia no Sidebar — bordas arredondadas (10px)
- Scrollbar mais fina (6px)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "design: add Apple Glass tokens, utilities, and update steam-* radius/transitions"
```

---

## Task 2: Sidebar

**Files:**
- Modify: `app/components/Sidebar.tsx`

- [ ] **Step 1: Aplicar glass ao `aside` e atualizar itens de projeto**

Substituir o bloco `return (` completo por:

```tsx
    return (
        <aside
            className="w-80 sm:w-72 lg:w-80 flex flex-col h-full border-r"
            style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
            }}
        >
            {/* Header */}
            <div className="p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <h2
                    className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
                    style={{ color: 'var(--amoled-muted)' }}
                >
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--amoled-gold)' }}
                    />
                    {t('sidebar.library')}
                </h2>

                {/* Search */}
                <div className="relative mb-3">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                        style={{ color: 'var(--amoled-muted)' }}
                    />
                    <input
                        placeholder={t('sidebar.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="steam-input w-full pl-9 pr-3 py-2 text-sm"
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--amoled-muted)' }} />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="steam-input flex-1 px-2 py-1.5 text-sm"
                    >
                        {categories.map((c) => (
                            <option key={c.value} value={c.value} style={{ background: 'var(--amoled-panel)' }}>
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
                        style={{ color: 'var(--amoled-muted)' }}
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
                                    className={`w-full flex items-center gap-3 px-2 py-2.5 text-left transition-colors ${
                                        isActive ? 'steam-sidebar-active' : ''
                                    }`}
                                    style={{ borderRadius: 'var(--radius-md)' }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = 'var(--amoled-gold-dim)'
                                            e.currentTarget.style.borderRadius = 'var(--radius-md)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.currentTarget.style.background = ''
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="w-10 h-10 overflow-hidden flex-shrink-0"
                                        style={{ borderRadius: 'var(--radius-sm)', border: `1px solid var(--amoled-border)` }}
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
                                            <span
                                                className="text-sm font-medium truncate"
                                                style={{ color: isActive ? 'var(--amoled-gold)' : 'var(--amoled-text)' }}
                                            >
                                                {project.title}
                                            </span>
                                            {project.featured && (
                                                <Star
                                                    className="w-3 h-3 flex-shrink-0"
                                                    style={{ color: 'var(--amoled-green-text)', fill: 'var(--amoled-green-text)' }}
                                                />
                                            )}
                                        </div>
                                        <p className="text-xs truncate mb-1.5" style={{ color: 'var(--amoled-muted)' }}>
                                            {getCategoryLabel(project.category)}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            {project.technologies.slice(0, 2).map((tech) => (
                                                <span key={tech} className="steam-tag">{tech}</span>
                                            ))}
                                            {project.technologies.length > 2 && (
                                                <span className="text-xs" style={{ color: 'var(--amoled-muted)' }}>
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
            <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                <div className="flex justify-between text-xs" style={{ color: 'var(--amoled-muted)' }}>
                    <span>{t('sidebar.total')}: <span style={{ color: 'var(--amoled-text)' }}>{projects.length}</span></span>
                    <span>{t('sidebar.featured')}: <span style={{ color: 'var(--amoled-green-text)' }}>{projects.filter(p => p.featured).length}</span></span>
                </div>
            </div>
        </aside>
    )
```

- [ ] **Step 2: Verificar no browser**

Abrir http://localhost:3000. O sidebar deve ter aparência de vidro fosco sobre o fundo preto. Itens de projeto com cantos arredondados. Item ativo com glass dourado.

- [ ] **Step 3: Commit**

```bash
git add app/components/Sidebar.tsx
git commit -m "design: apply Apple Glass to Sidebar — glass aside, rounded items and thumbnails"
```

---

## Task 3: Header

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Aplicar glass-surface ao header e atualizar nav pill**

Substituir o elemento `<header ...>` e seus filhos diretos de estilo:

```tsx
    return (
        <header
            className="h-14 flex items-center justify-between px-4 lg:px-6 border-b"
            style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
        >
            {/* Left — Logo */}
            <div className="flex items-center gap-3">
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden w-8 h-8"
                        style={{ color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                )}

                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: 'var(--amoled-gold)', borderRadius: 'var(--radius-sm)' }}
                    >
                        P
                    </div>
                    <div className="hidden sm:block">
                        <span className="font-semibold text-base" style={{ color: 'var(--amoled-text)' }}>
                            Portfolio
                        </span>
                        <div className="text-xs font-mono" style={{ color: 'var(--amoled-muted)' }}>
                            Miguel Diniz
                        </div>
                    </div>
                </div>
            </div>

            {/* Center — Navigation */}
            <nav
                className="flex items-center gap-0.5 p-0.5"
                style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-sm)',
                }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-sm font-medium transition-colors"
                            style={{
                                borderRadius: 'calc(var(--radius-sm) - 2px)',
                                background:   isActive ? 'rgba(201,165,42,0.12)' : 'transparent',
                                color:        isActive ? 'var(--amoled-gold)' : 'var(--amoled-muted)',
                                borderBottom: isActive ? `2px solid var(--amoled-gold)` : '2px solid transparent',
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
                {SOCIAL_LINKS.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        size="icon"
                        aria-label={item.label}
                        className="w-8 h-8 transition-colors"
                        style={{ color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amoled-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amoled-muted)')}
                        onClick={() => window.open(item.href, '_blank')}
                    >
                        {item.icon}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Contato"
                    className="w-8 h-8 transition-colors"
                    style={{ color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amoled-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amoled-muted)')}
                    onClick={() => setActiveTab('contact')}
                >
                    <Mail className="w-4 h-4" />
                </Button>
                <div className="w-px h-5 mx-1" style={{ background: 'var(--amoled-border)' }} />
                <LanguageSwitcher />
            </div>
        </header>
    )
```

- [ ] **Step 2: Verificar no browser**

Header deve parecer um painel de vidro translúcido. Nav pill arredondado, tab ativo com fundo dourado sutil.

- [ ] **Step 3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "design: apply glass-surface to Header, round nav pill and logo"
```

---

## Task 4: ProjectDetail

**Files:**
- Modify: `app/components/ProjectDetail.tsx`

- [ ] **Step 1: Atualizar badges do hero e sub-painéis de conteúdo**

Localizar e substituir o badge de categoria (linha ~63):
```tsx
                        <span
                            className="px-2.5 py-1 text-xs font-medium uppercase tracking-wide"
                            style={{ background: 'rgba(13,13,13,0.85)', border: '1px solid var(--amoled-border)', color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                        >
```

Localizar e substituir o badge DESTAQUE (linha ~69):
```tsx
                            <span
                                className="px-2.5 py-1 text-xs font-semibold flex items-center gap-1"
                                style={{ background: 'var(--amoled-green)', color: 'var(--amoled-green-text)', borderRadius: 'var(--radius-sm)' }}
                            >
```

- [ ] **Step 2: Aplicar glass-panel nos blocos de conteúdo principais**

Localizar todos os elementos que usam `steam-panel` ou `style={{ background: 'var(--amoled-panel)' }}` no corpo do ProjectDetail (secções de descrição, tech stack, links, challenges, features) e adicionar a classe `glass-panel` ou substituir o background inline por `rgba(255,255,255,0.06)`.

Para sub-painéis de tech stack e links que usam `var(--amoled-gold-dim)` como fundo, substituir por classe `glass-gold`:
```tsx
className="glass-gold p-4"
style={{ borderRadius: 'var(--radius-md)' }}
```

Para painéis neutros de descrição/challenges/features:
```tsx
className="glass-panel p-4 lg:p-6"
style={{ borderRadius: 'var(--radius-lg)' }}
```

- [ ] **Step 3: Verificar no browser**

Selecionar um projeto no sidebar. O painel de detalhe deve ter glass refinado. Badges com cantos arredondados.

- [ ] **Step 4: Commit**

```bash
git add app/components/ProjectDetail.tsx
git commit -m "design: apply glass-panel and glass-gold to ProjectDetail panels and badges"
```

---

## Task 5: ProfileView

**Files:**
- Modify: `app/components/ProfileView.tsx`

Esta é a tarefa maior — ProfileView tem classes legadas (`project-card-enhanced`, `btn-enhanced`) que não existem no design system e cores hardcoded (blue/purple) que conflitam com o AMOLED. Tudo é substituído.

- [ ] **Step 1: Atualizar o hero section**

Substituir o bloco `{/* Hero Section */}` completo:

```tsx
            {/* Hero Section */}
            <div
                className="relative border-b p-6 lg:p-8 overflow-hidden"
                style={{ background: 'var(--amoled-black)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                        {/* Profile Image */}
                        <div className="relative">
                            <div
                                className="w-36 h-36 lg:w-40 lg:h-40 overflow-hidden border-2 shadow-2xl"
                                style={{
                                    borderRadius: '20px',
                                    borderColor: 'rgba(201,165,42,0.4)',
                                    boxShadow: '0 0 40px rgba(201,165,42,0.15), 0 20px 60px rgba(0,0,0,0.8)',
                                }}
                            >
                                <Image
                                    src="/Miguel.jpg"
                                    alt="Profile"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className="absolute -bottom-2 -right-2 w-7 h-7 border-4"
                                style={{
                                    background: 'var(--amoled-green-text)',
                                    borderRadius: '50%',
                                    borderColor: 'var(--amoled-black)',
                                }}
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-3 animate-fade-in" style={{ color: 'var(--amoled-text)' }}>
                                Miguel Diniz
                            </h1>
                            <p className="text-xl lg:text-2xl mb-4 font-semibold animate-slide-in-right" style={{ color: 'var(--amoled-gold)' }}>
                                Desenvolvedor Full Stack
                            </p>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 animate-slide-in-right"
                                style={{ animationDelay: '200ms' }}
                            >
                                <div
                                    className="glass-gold flex items-center space-x-2 px-3 py-2"
                                    style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
                                >
                                    <MapPin className="w-4 h-4" style={{ color: 'var(--amoled-gold)' }} />
                                    <span className="text-sm lg:text-base">{t('profile.location')}</span>
                                </div>
                                <div
                                    className="glass-gold flex items-center space-x-2 px-3 py-2"
                                    style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
                                >
                                    <Calendar className="w-4 h-4" style={{ color: 'var(--amoled-gold)' }} />
                                    <span className="text-sm lg:text-base">{t('profile.experienceYears')}</span>
                                </div>
                            </div>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-3 animate-slide-in-right"
                                style={{ animationDelay: '400ms' }}
                            >
                                <button onClick={handleDownloadCV} className="steam-btn-primary flex items-center gap-2 px-4 py-2">
                                    <Download className="w-4 h-4" />
                                    {t('profile.downloadCV')}
                                </button>
                                <button onClick={handleContactClick} className="steam-btn-secondary flex items-center gap-2 px-4 py-2">
                                    <Mail className="w-4 h-4" />
                                    {t('profile.contact')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {personalStats.map((stat, index) => (
                            <div
                                key={index}
                                className="glass-panel p-4 text-center steam-hover"
                                style={{ borderRadius: 'var(--radius-lg)', animationDelay: `${600 + index * 100}ms` }}
                            >
                                <div
                                    className="w-10 h-10 mx-auto mb-2 flex items-center justify-center"
                                    style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                                >
                                    {stat.icon}
                                </div>
                                <div className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--amoled-gold)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs" style={{ color: 'var(--amoled-muted)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
```

- [ ] **Step 2: Atualizar a seção About**

Substituir o bloco `{/* About */}`:
```tsx
                    {/* About */}
                    <section className="animate-fade-in">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <Star className="w-5 h-5" />
                            </div>
                            {t('profile.title')}
                        </h2>
                        <div className="glass-panel p-6 lg:p-8" style={{ borderRadius: 'var(--radius-lg)' }}>
                            <div className="space-y-4">
                                <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{t('profile.bio1')}</p>
                                <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{t('profile.bio2')}</p>
                                <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{t('profile.bio3')}</p>
                            </div>
                        </div>
                    </section>
```

- [ ] **Step 3: Atualizar a seção Skills**

Os cards de skill já usam `steam-panel steam-hover` que herdam as melhorias do Task 1. Apenas atualizar o ícone de seção:
```tsx
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <Code className="w-5 h-5" />
                            </div>
                            {t('profile.skills')}
                        </h2>
```

- [ ] **Step 4: Atualizar a seção Experience**

Substituir o bloco `{/* Experience */}`:
```tsx
                    {/* Experience */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '400ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <Briefcase className="w-5 h-5" />
                            </div>
                            {t('profile.experience')}
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`glass-panel steam-hover p-6 ${exp.current ? 'border-l-2' : ''}`}
                                    style={{
                                        borderRadius: 'var(--radius-lg)',
                                        borderLeftColor: exp.current ? 'var(--amoled-green-text)' : undefined,
                                        animationDelay: `${index * 150}ms`,
                                    }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: exp.current ? 'rgba(164,208,7,0.15)' : 'rgba(255,255,255,0.06)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: exp.current ? 'var(--amoled-green-text)' : 'var(--amoled-muted)',
                                            }}
                                        >
                                            {exp.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold" style={{ color: 'var(--amoled-text)' }}>
                                                        {exp.title}
                                                    </h3>
                                                    <p className="font-medium" style={{ color: 'var(--amoled-gold)' }}>{exp.company}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                                                    <span className="text-sm" style={{ color: 'var(--amoled-muted)' }}>{exp.period}</span>
                                                    {exp.current && (
                                                        <span
                                                            className="px-3 py-1 text-xs font-medium"
                                                            style={{
                                                                background: 'rgba(164,208,7,0.1)',
                                                                color: 'var(--amoled-green-text)',
                                                                borderRadius: 'var(--radius-sm)',
                                                                border: '1px solid rgba(164,208,7,0.2)',
                                                            }}
                                                        >
                                                            {t('profile.current')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
```

- [ ] **Step 5: Atualizar Education e Call-to-Action**

Substituir o bloco `{/* Education */}`:
```tsx
                    {/* Education */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '600ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            Educação
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="glass-panel steam-hover p-6"
                                    style={{ borderRadius: 'var(--radius-lg)', animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                                        >
                                            {edu.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold" style={{ color: 'var(--amoled-text)' }}>{edu.title}</h3>
                                                    <p className="font-medium" style={{ color: 'var(--amoled-gold)' }}>{edu.institution}</p>
                                                </div>
                                                <span className="text-sm mt-2 md:mt-0" style={{ color: 'var(--amoled-muted)' }}>{edu.period}</span>
                                            </div>
                                            <p className="leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{edu.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
```

Substituir o bloco `{/* Call to Action */}`:
```tsx
                    {/* Call to Action */}
                    <section className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                        <div className="glass-gold p-8 lg:p-10 text-center" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: 'var(--amoled-text)' }}>
                                Interessado em trabalhar juntos?
                            </h3>
                            <p className="text-base lg:text-lg mb-6 max-w-2xl mx-auto" style={{ color: 'var(--amoled-muted)' }}>
                                Estou sempre aberto a novos desafios e oportunidades.
                                Vamos conversar sobre como posso ajudar no seu próximo projeto!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={handleContactClick} className="steam-btn-primary flex items-center gap-2 px-5 py-2.5">
                                    <Mail className="w-4 h-4" />
                                    Entre em Contato
                                </button>
                                <button onClick={handleDownloadCV} className="steam-btn-secondary flex items-center gap-2 px-5 py-2.5">
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </button>
                            </div>
                        </div>
                    </section>
```

- [ ] **Step 6: Remover imports não usados**

Remover `Button` do import (não é mais usado — substituído por `steam-btn-primary/secondary`):
```tsx
// Remover esta linha:
import { Button } from "@/components/ui/button"
```

- [ ] **Step 7: Verificar no browser**

Navegar para aba Profile. Verificar: hero com avatar dourado arredondado, badges glass-gold, stats com glass-panel, seções com glass-panel, CTA com glass-gold, sem cores azuis/roxas remanescentes.

- [ ] **Step 8: Commit**

```bash
git add app/components/ProfileView.tsx
git commit -m "design: rewrite ProfileView with Apple Glass — remove legacy classes, align to AMOLED palette"
```

---

## Task 6: AchievementsView

**Files:**
- Modify: `app/components/AchievementsView.tsx`

- [ ] **Step 1: Adicionar glass-panel como base dos cards de achievement**

Localizar todos os elementos de card de achievement que usam `steam-panel` ou `style={{ background: 'var(--amoled-panel)' }}` e adicionar a classe `glass-panel`, mantendo as classes de raridade (`rarity-common`, `rarity-rare`, etc.) intactas.

Exemplo de padrão de substituição — de:
```tsx
<div className="steam-panel p-4" style={{ ... }}>
```
Para:
```tsx
<div className="glass-panel p-4" style={{ borderRadius: 'var(--radius-lg)', ... }}>
```

Os cards de estatísticas (categoryStats, technologyStats) que usam `steam-panel steam-hover` herdam as melhorias do Task 1 automaticamente — apenas verificar se o border-radius está correto.

- [ ] **Step 2: Verificar no browser**

Navegar para aba Achievements. Cards de achievement com glass + bordas coloridas por raridade mantidas.

- [ ] **Step 3: Commit**

```bash
git add app/components/AchievementsView.tsx
git commit -m "design: apply glass-panel to AchievementsView cards, preserve rarity borders"
```

---

## Task 7: ContactView

**Files:**
- Modify: `app/components/ContactView.tsx`

- [ ] **Step 1: Aplicar glass ao hero e form container**

Localizar o hero icon (o `div` com `background: 'rgba(201,165,42,0.12)'` e `border`) e atualizar:
```tsx
                    <div
                        className="glass-gold w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4 flex items-center justify-center"
                        style={{ borderRadius: 'var(--radius-md)' }}
                    >
```

Localizar o container principal do formulário e aplicar `glass-surface`:
```tsx
<div className="glass-surface p-6 lg:p-8" style={{ borderRadius: 'var(--radius-lg)' }}>
```

Os `Input` e `Textarea` do Radix/shadcn já herdam `steam-input` do design system se tiverem a classe — verificar se possuem; se não, adicionar `className="steam-input w-full px-3 py-2"` nos inputs do form.

- [ ] **Step 2: Verificar no browser**

Navegar para aba Contact. Form com painel glass-surface, hero icon com glass-gold, inputs com bordas douradas no focus.

- [ ] **Step 3: Commit**

```bash
git add app/components/ContactView.tsx
git commit -m "design: apply glass-surface to ContactView form, glass-gold to hero icon"
```

---

## Task 8: SplashScreen

**Files:**
- Modify: `app/components/SplashScreen.tsx`

- [ ] **Step 1: Aplicar glass-gold ao painel central e atualizar radius**

Substituir o `div` interno central (`.text-center.z-10.max-w-sm`):

```tsx
        <div
            className="glass-gold text-center z-10 max-w-sm w-full px-8 py-10"
            style={{ borderRadius: 'var(--radius-xl)' }}
        >
            {/* Logo */}
            <div className="mb-8 animate-bounce-in">
                <div
                    className="w-20 h-20 flex items-center justify-center mx-auto mb-6"
                    style={{
                        background: 'rgba(201,165,42,0.12)',
                        border: '1px solid rgba(201,165,42,0.3)',
                        borderRadius: 'var(--radius-md)',
                    }}
                >
                    <span className="font-bold text-2xl" style={{ color: 'var(--amoled-gold)' }}>P</span>
                </div>
                <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--amoled-text)' }}>
                    Portfolio
                </h1>
                <p
                    className="text-sm tracking-wide"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: 'var(--amoled-muted)' }}
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
                        style={{ background: 'var(--amoled-panel)' }}
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
                    <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--amoled-text)' }}>
                        Bem-vindo
                    </h2>
                    <p
                        className="text-sm"
                        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: 'var(--amoled-muted)' }}
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
                        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: 'var(--amoled-muted)' }}
                    >
                        {currentStep}
                    </span>
                    <span
                        className="text-xs font-mono flex-shrink-0 px-2 py-0.5"
                        style={{
                            color: 'var(--amoled-gold)',
                            background: 'rgba(201,165,42,0.08)',
                            border: '1px solid rgba(201,165,42,0.2)',
                            borderRadius: 'var(--radius-sm)',
                        }}
                    >
                        {Math.round(progress)}%
                    </span>
                </div>

                <div
                    className="w-full h-px rounded-full overflow-hidden"
                    style={{ background: 'var(--amoled-border)' }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%`, background: 'var(--amoled-gold)' }}
                    />
                </div>
            </div>

            {/* Version badge */}
            <div className="mt-10">
                <p
                    className="text-xs font-mono inline-block px-3 py-1"
                    style={{
                        color: 'var(--amoled-muted)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-sm)',
                    }}
                >
                    Portfolio v2.0 • Next.js 15 • Apple Glass Edition
                </p>
            </div>
        </div>
```

- [ ] **Step 2: Verificar no browser (reload forçado para ver o splash)**

Abrir http://localhost:3000 em aba anônima ou forçar reload antes do splash expirar. O painel central deve ter vidro dourado com border-radius 28px. Logo "P" com cantos arredondados. Badge de versão com texto atualizado.

- [ ] **Step 3: Commit**

```bash
git add app/components/SplashScreen.tsx
git commit -m "design: apply glass-gold panel to SplashScreen, update radius and version badge"
```

---

## Task 9: Verificação final

- [ ] **Step 1: Rodar o build de produção para checar erros de TypeScript**

```bash
pnpm build
```

Expected: Build bem-sucedido sem erros de tipo.

- [ ] **Step 2: Percorrer todas as abas**

Abrir http://localhost:3000 e verificar sequencialmente:
1. SplashScreen — glass-gold, radius xl
2. Projects (welcome) — steam-panel atualizado, radius lg nos stats
3. Selecionar um projeto — ProjectDetail com glass-panel e glass-gold
4. Profile — hero, stats, about, skills, experience, education, CTA
5. Achievements — cards com glass + raridade intacta
6. Contact — glass-surface no form, glass-gold no hero

Checklist visual por tela:
- Nenhum canto quadrado em painéis principais
- Nenhuma cor azul/roxa remanescente no Profile
- Blur visível nos painéis de vidro (testar sobre fundo branco se necessário)
- Scrollbar fina (6px)
- Transições suaves (200ms)

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "design: Apple Glass redesign complete — glass utilities, radius tokens, all components updated"
```
