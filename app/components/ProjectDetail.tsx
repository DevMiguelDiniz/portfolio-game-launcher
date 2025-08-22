"use client"

import Image from "next/image"
import { ExternalLink, Github, Calendar, Code, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

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
    featured?: boolean
    date?: string
    challenges?: string[]
    features?: string[]
}

interface ProjectDetailProps {
    project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Hero Section */}
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-float"></div>
                    <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-float-delayed"></div>
                    <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-50 animate-float"></div>
                </div>

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-wrap items-center gap-3 mb-4 animate-slide-in-right">
                <span className="px-3 py-1.5 bg-gray-800/80 backdrop-blur-sm text-gray-300 text-xs lg:text-sm rounded-xl border border-gray-700/50 font-medium uppercase tracking-wide">
                  {project.category}
                </span>
                            {project.featured && (
                                <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs lg:text-sm rounded-xl flex items-center font-medium shadow-lg shadow-yellow-500/25 animate-pulse">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      DESTAQUE
                    </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 animate-fade-in">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {project.title}
                </span>
                        </h1>

                        {project.date && (
                            <div className="flex items-center text-gray-400 mb-4 animate-slide-in-right" style={{animationDelay: '200ms'}}>
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="text-sm lg:text-base font-medium">{project.date}</span>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 animate-slide-in-right" style={{animationDelay: '400ms'}}>
                            {project.liveUrl && (
                                <Button
                                    size="sm"
                                    className="btn-enhanced bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs lg:text-sm font-semibold shadow-lg shadow-green-500/25"
                                    onClick={() => window.open(project.liveUrl, "_blank")}
                                >
                                    <Play className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                                    Ver Demo
                                </Button>
                            )}
                            {project.githubUrl && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-2 border-gray-600/50 text-gray-300 hover:bg-gray-800/60 hover:border-gray-500 text-xs lg:text-sm bg-gray-900/60 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                                    onClick={() => window.open(project.githubUrl, "_blank")}
                                >
                                    <Github className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                                    Ver Código
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-8 lg:space-y-12">
                    {/* Description */}
                    <section className="animate-fade-in">
                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                            Sobre este projeto
                        </h2>
                        <div className="project-card-enhanced p-6 lg:p-8">
                            <p className="text-gray-300 text-sm lg:text-lg leading-relaxed">
                                {project.longDescription || project.description}
                            </p>
                        </div>
                    </section>

                    {/* Technologies */}
                    <section className="animate-slide-in-right" style={{animationDelay: '200ms'}}>
                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center">
                            <Code className="w-5 h-5 lg:w-6 lg:h-6 mr-3 text-blue-400" />
                            Tecnologias utilizadas
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                            {project.technologies.map((tech, index) => (
                                <div
                                    key={tech}
                                    className="project-card-enhanced p-3 lg:p-4 text-center group cursor-pointer"
                                    style={{animationDelay: `${index * 100}ms`}}
                                >
                      <span className="text-gray-300 font-medium text-xs lg:text-sm group-hover:text-blue-400 transition-colors duration-300">
                        {tech}
                      </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Features */}
                    {project.features && (
                        <section className="animate-slide-in-right" style={{animationDelay: '400ms'}}>
                            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center">
                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-lg mr-3 flex items-center justify-center">
                                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-white fill-current" />
                                </div>
                                Principais funcionalidades
                            </h2>
                            <div className="project-card-enhanced p-6 lg:p-8">
                                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                                    {project.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start space-x-3 group"
                                            style={{animationDelay: `${index * 150}ms`}}
                                        >
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                                            <span className="text-gray-300 text-sm lg:text-base group-hover:text-white transition-colors duration-300">
                              {feature}
                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                        <section className="animate-slide-in-right" style={{animationDelay: '600ms'}}>
                            <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center">
                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-orange-500 rounded-lg mr-3 flex items-center justify-center">
                                    <Code className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                                </div>
                                Desafios superados
                            </h2>
                            <div className="project-card-enhanced p-6 lg:p-8">
                                <div className="space-y-4">
                                    {project.challenges.map((challenge, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start space-x-3 group"
                                            style={{animationDelay: `${index * 150}ms`}}
                                        >
                                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                                            <span className="text-gray-300 text-sm lg:text-base group-hover:text-white transition-colors duration-300">
                              {challenge}
                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Links */}
                    <section className="animate-fade-in" style={{animationDelay: '800ms'}}>
                        <div className="project-card-enhanced p-6 lg:p-8">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <ExternalLink className="w-5 h-5 text-purple-400 mr-3" />
                                Links do projeto
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {project.liveUrl && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-2 border-green-600/50 text-green-400 hover:bg-green-600/20 hover:border-green-500 text-xs lg:text-sm bg-transparent rounded-xl font-semibold transition-all duration-300 hover:scale-105 steam-glow group"
                                        onClick={() => window.open(project.liveUrl, "_blank")}
                                    >
                                        <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                                        Demonstração ao vivo
                                    </Button>
                                )}
                                {project.githubUrl && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-2 border-gray-600/50 text-gray-300 hover:bg-gray-600/20 hover:border-gray-500 text-xs lg:text-sm bg-transparent rounded-xl font-semibold transition-all duration-300 hover:scale-105 steam-glow group"
                                        onClick={() => window.open(project.githubUrl, "_blank")}
                                    >
                                        <Github className="w-3 h-3 lg:w-4 lg:h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                                        Repositório no GitHub
                                    </Button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}