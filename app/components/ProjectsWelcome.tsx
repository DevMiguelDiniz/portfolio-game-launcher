"use client"

import { FolderOpen, Star, Code, TrendingUp } from "lucide-react"
import { projects } from "../data/projects"
import { useLanguage } from "@/hooks/use-language"

export default function ProjectsWelcome() {
    const { t } = useLanguage()
    const featuredCount     = projects.filter((p) => p.featured).length
    const totalTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].length

    const stats = [
        { icon: <Code className="w-5 h-5" />,          value: projects.length,    label: t('projects.welcome.totalProjects'), color: 'var(--amoled-text)' },
        { icon: <Star className="w-5 h-5 fill-current" />, value: featuredCount,   label: t('projects.welcome.featuredProjects'), color: 'var(--amoled-gold)' },
        { icon: <TrendingUp className="w-5 h-5" />,     value: totalTechnologies,  label: t('projects.welcome.differentTechnologies'), color: 'var(--amoled-text)' },
    ]

    return (
        <div className="h-full flex items-center justify-center p-4 lg:p-8" style={{ background: 'var(--amoled-black)' }}>
            <div className="text-center max-w-xl animate-fade-in">
                <div
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded flex items-center justify-center mx-auto mb-5"
                    style={{ background: 'var(--amoled-panel)', border: '1px solid var(--amoled-border)' }}
                >
                    <FolderOpen className="w-8 h-8 lg:w-10 lg:h-10" style={{ color: 'var(--amoled-muted)' }} />
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: 'var(--amoled-text)' }}>
                    {t('projects.welcome.title')}
                </h1>

                <p className="text-sm lg:text-base mb-8 px-4" style={{ color: 'var(--amoled-muted)' }}>
                    {t('projects.welcome.subtitle')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="steam-panel steam-hover p-4 lg:p-5"
                        >
                            <div
                                className="w-9 h-9 rounded flex items-center justify-center mx-auto mb-2"
                                style={{ background: 'rgba(201,165,42,0.08)', color: stat.color }}
                            >
                                {stat.icon}
                            </div>
                            <div className="text-xl lg:text-2xl font-bold mb-0.5" style={{ color: stat.color }}>
                                {stat.value}
                            </div>
                            <div className="text-xs" style={{ color: 'var(--amoled-muted)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                <p className="text-xs" style={{ color: 'var(--amoled-muted)' }}>
                    {t('projects.welcome.tip')}
                </p>
            </div>
        </div>
    )
}
