"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, Calendar, Code, Star, Play, Video } from "lucide-react"
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

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
    return (
        <h2 className="text-base lg:text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--steam-text)' }}>
            {icon}
            {title}
        </h2>
    )
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
                        <SectionHeader
                            icon={<Code className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />}
                            title="Sobre este projeto"
                        />
                        <div className="steam-panel steam-hover p-5 lg:p-6">
                            <p className="text-sm lg:text-base leading-relaxed" style={{ color: 'var(--steam-text)' }}>
                                {project.longDescription || project.description}
                            </p>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section className="animate-slide-in">
                        <SectionHeader
                            icon={<Code className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />}
                            title="Tecnologias utilizadas"
                        />
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
                            <SectionHeader
                                icon={<Star className="w-4 h-4 fill-current" style={{ color: 'var(--steam-green-text)' }} />}
                                title="Principais funcionalidades"
                            />
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
                            <SectionHeader
                                icon={<Code className="w-4 h-4" style={{ color: 'var(--steam-blue)' }} />}
                                title="Desafios superados"
                            />
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
                                        <button
                                            className="steam-btn-primary flex items-center gap-2 text-sm"
                                            onClick={() => window.open(project.liveUrl, "_blank")}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Demonstração ao vivo
                                        </button>
                                    )}
                                    {project.videoUrl && videoId && (
                                        <button
                                            className="steam-btn-primary flex items-center gap-2 text-sm"
                                            onClick={() => setIsVideoModalOpen(true)}
                                        >
                                            <Video className="w-3.5 h-3.5" />
                                            Vídeo demonstração
                                        </button>
                                    )}
                                    {project.githubUrl && (
                                        <button
                                            className="steam-btn-secondary flex items-center gap-2 text-sm"
                                            onClick={() => window.open(project.githubUrl, "_blank")}
                                        >
                                            <Github className="w-3.5 h-3.5" />
                                            Repositório no GitHub
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
