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
        <aside className="w-80 sm:w-72 lg:w-80 sidebar-enhanced flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-gray-800/50">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 animate-glow-pulse">
                        <span className="text-white font-bold text-sm">L</span>
                    </div>
                    {t('sidebar.library')}
                </h2>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder={t('sidebar.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-enhanced pl-10 text-white placeholder-gray-400"
                    />
                </div>

                {/* Filter */}
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center">
                        <Filter className="w-4 h-4 text-gray-400" />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="flex-1 bg-gray-800/60 border-2 border-gray-700/50 text-white text-sm rounded-xl px-3 py-2 focus:border-blue-600 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-gray-800/80"
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value} className="bg-gray-800">
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-3 px-2 flex items-center justify-between">
                        <span>{filteredProjects.length} {t('sidebar.projectsCount')}</span>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>

                    <div className="space-y-2">
                        {filteredProjects.map((project, index) => (
                            <button
                                key={project.id}
                                onClick={() => handleProjectSelect(project.id)}
                                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${
                                    selectedProject === project.id
                                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50 steam-glow-strong"
                                        : "hover:bg-gray-800/60 border-2 border-transparent hover:border-gray-700/50"
                                }`}
                                style={{
                                    animationDelay: `${index * 50}ms`
                                }}
                            >
                                {/* Shimmer effect */}
                                {selectedProject !== project.id && (
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                                    </div>
                                )}

                                {/* Project Thumbnail */}
                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 ring-2 ring-gray-700/50 transition-all duration-300 group-hover:ring-blue-500/50">
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h3 className="text-white font-medium text-sm truncate group-hover:text-blue-400 transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        {project.featured && (
                                            <div className="relative">
                                                <Star className="w-3 h-3 text-yellow-400 fill-current animate-pulse" />
                                                <div className="absolute inset-0 w-3 h-3 text-yellow-400 animate-ping opacity-30">
                                                    <Star className="w-full h-full fill-current" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-xs truncate mb-2 group-hover:text-gray-300 transition-colors duration-300">
                                        {getCategoryLabel(project.category)}
                                    </p>
                                    <div className="flex items-center space-x-1">
                                        {project.technologies.slice(0, 2).map((tech, techIndex) => (
                                            <span
                                                key={tech}
                                                className="text-xs bg-gray-800/80 text-gray-300 px-2 py-0.5 rounded-lg border border-gray-700/50 transition-all duration-300 hover:bg-blue-600/20 hover:border-blue-500/50"
                                                style={{
                                                    animationDelay: `${(index * 50) + (techIndex * 25)}ms`
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 2 && (
                                            <span className="text-xs text-gray-500 bg-gray-800/50 px-1.5 py-0.5 rounded-md">
                                                +{project.technologies.length - 2}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Selection indicator */}
                                {selectedProject === project.id && (
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="p-4 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
                <div className="text-xs text-gray-400 space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded-lg border border-gray-700/30">
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            {t('sidebar.total')}
                        </span>
                        <span className="text-white font-mono bg-blue-600/20 px-2 py-0.5 rounded-md">
                            {projects.length}
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-800/30 rounded-lg border border-gray-700/30">
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                            {t('sidebar.featured')}
                        </span>
                        <span className="text-yellow-400 font-mono bg-yellow-600/20 px-2 py-0.5 rounded-md">
                            {projects.filter((p) => p.featured).length}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    )
}