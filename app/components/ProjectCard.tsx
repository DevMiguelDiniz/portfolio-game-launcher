"use client"

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Github, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`group relative bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
        project.featured ? 'ring-2 ring-blue-500/50' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Destaque
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-4">
            {project.liveUrl && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.liveUrl, '_blank')
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(project.githubUrl, '_blank')
                }}
              >
                <Github className="w-4 h-4 mr-2" />
                Código
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
            {project.category}
          </span>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
