"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Filter, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
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
        { value: "all", label: t('sidebar.allCategories') },
        { value: "web", label: t('sidebar.web') },
        { value: "mobile", label: t('sidebar.mobile') },
        { value: "fullstack", label: t('sidebar.fullstack') },
        { value: "frontend", label: t('sidebar.frontend') },
        { value: "desktop", label: t('sidebar.desktop') }
    ]

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const handleProjectSelect = (projectId: string) => {
        setSelectedProject(projectId)
        onProjectSelect?.()
    }

    const getCategoryLabel = (category: string) => {
        const categoryMap: { [key: string]: string } = {
            'web': t('category.web'),
            'mobile': t('category.mobile'),
            'fullstack': t('category.fullstack'),
            'frontend': t('category.frontend'),
            'backend': t('category.backend'),
            'desktop': t('category.desktop')
        }
        return categoryMap[category] || category
    }

    return (
        <aside className="w-80 sm:w-72 lg:w-80 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white mb-4">{t('sidebar.library')}</h2>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder={t('sidebar.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600"
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm rounded px-2 py-1 focus:border-blue-600 focus:outline-none"
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 px-2">
                        {filteredProjects.length} {t('sidebar.projectsCount')}
                    </div>

                    {filteredProjects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => handleProjectSelect(project.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 transition-all text-left group ${
                                selectedProject === project.id ? "bg-gray-800 border border-gray-700" : "hover:bg-gray-800/50"
                            }`}
                        >
                            {/* Project Thumbnail */}
                            <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-800">
                                <Image
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Project Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-white font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    {project.featured && <Star className="w-3 h-3 text-blue-400 fill-current flex-shrink-0" />}
                                </div>
                                <p className="text-gray-400 text-xs truncate">{getCategoryLabel(project.category)}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                    {project.technologies.slice(0, 2).map((tech) => (
                                        <span key={tech} className="text-xs bg-gray-800 text-gray-300 px-1 py-0.5 rounded">
                      {tech}
                    </span>
                                    ))}
                                    {project.technologies.length > 2 && (
                                        <span className="text-xs text-gray-500">+{project.technologies.length - 2}</span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                <div className="text-xs text-gray-400 space-y-1">
                    <div className="flex justify-between">
                        <span>{t('sidebar.total')}</span>
                        <span className="text-white">{projects.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{t('sidebar.featured')}</span>
                        <span className="text-blue-400">{projects.filter((p) => p.featured).length}</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}