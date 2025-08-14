"use client"

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Github, ExternalLink, Calendar, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'

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

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="relative h-64 md:h-80">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-slate-800"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full">
                  Destaque
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {project.title}
            </h2>
            {project.date && (
              <div className="flex items-center text-slate-300">
                <Calendar className="w-4 h-4 mr-2" />
                {project.date}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => window.open(project.liveUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ver Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                Ver Código
              </Button>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Sobre o Projeto</h3>
            <p className="text-slate-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          {project.features && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Principais Funcionalidades</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Desafios Superados</h3>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start text-slate-300">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
