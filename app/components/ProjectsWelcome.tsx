"use client"

import { FolderOpen, Star, Code, TrendingUp } from "lucide-react"
import { projects } from "../data/projects"
import { useLanguage } from "@/hooks/use-language"

export default function ProjectsWelcome() {
    const { t } = useLanguage()
    const featuredCount     = projects.filter((p) => p.featured).length
    const totalTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].length

    const stats = [
        { icon: <Code className="w-5 h-5" />,          value: projects.length,    label: 'Projetos totais', color: 'var(--steam-text)' },
        { icon: <Star className="w-5 h-5 fill-current" />, value: featuredCount,   label: 'Em destaque',     color: 'var(--steam-blue)' },
        { icon: <TrendingUp className="w-5 h-5" />,     value: totalTechnologies,  label: 'Tecnologias',     color: 'var(--steam-text)' },
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
                            className="steam-panel steam-hover p-4 lg:p-5"
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
