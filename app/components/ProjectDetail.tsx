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
      <div className="h-full overflow-y-auto bg-gray-950">
        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
              <span className="px-2 lg:px-3 py-1 bg-gray-800 text-gray-300 text-xs lg:text-sm rounded border border-gray-700">
                {project.category.toUpperCase()}
              </span>
                {project.featured && (
                    <span className="px-2 lg:px-3 py-1 bg-blue-600 text-white text-xs lg:text-sm rounded flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  DESTAQUE
                </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">{project.title}</h1>

              {project.date && (
                  <div className="flex items-center text-gray-400 mb-3 lg:mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm lg:text-base">{project.date}</span>
                  </div>
              )}

              <div className="flex flex-wrap gap-2 lg:gap-3">
                {project.liveUrl && (
                    <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <Play className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      Ver Demo
                    </Button>
                )}
                {project.githubUrl && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs lg:text-sm bg-transparent"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
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
            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">Sobre este projeto</h2>
              <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
                <p className="text-gray-300 text-sm lg:text-lg leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </div>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4 flex items-center">
                <Code className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                Tecnologias utilizadas
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
                {project.technologies.map((tech) => (
                    <div
                        key={tech}
                        className="bg-gray-900 border border-gray-800 rounded-lg p-2 lg:p-3 text-center hover:border-gray-700 transition-colors"
                    >
                      <span className="text-gray-300 font-medium text-xs lg:text-sm">{tech}</span>
                    </div>
                ))}
              </div>
            </section>

            {/* Features */}
            {project.features && (
                <section>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">Principais funcionalidades</h2>
                  <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
                    <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
                      {project.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm lg:text-base">{feature}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </section>
            )}

            {/* Challenges */}
            {project.challenges && (
                <section>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">Desafios superados</h2>
                  <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
                    <div className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300 text-sm lg:text-base">{challenge}</span>
                          </div>
                      ))}
                    </div>
                  </div>
                </section>
            )}

            {/* Links */}
            <section className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3 lg:mb-4">Links do projeto</h3>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                {project.liveUrl && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs lg:text-sm bg-transparent"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      Demonstração ao vivo
                    </Button>
                )}
                {project.githubUrl && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs lg:text-sm bg-transparent"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      Repositório no GitHub
                    </Button>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
  )
}
