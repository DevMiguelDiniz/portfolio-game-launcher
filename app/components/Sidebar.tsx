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
                    className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
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
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--steam-muted)' }} />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="steam-input flex-1 px-2 py-1.5 text-sm"
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
                                            <span
                                                className="text-sm font-medium truncate"
                                                style={{ color: isActive ? 'var(--steam-blue)' : 'var(--steam-text)' }}
                                            >
                                                {project.title}
                                            </span>
                                            {project.featured && (
                                                <Star
                                                    className="w-3 h-3 flex-shrink-0"
                                                    style={{ color: 'var(--steam-green-text)', fill: 'var(--steam-green-text)' }}
                                                />
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
