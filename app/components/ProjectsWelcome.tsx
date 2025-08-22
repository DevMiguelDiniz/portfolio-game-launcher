"use client"

import { FolderOpen, Star, Code, TrendingUp } from "lucide-react"
import { projects } from "../data/projects"

export default function ProjectsWelcome() {
  const featuredProjects = projects.filter((p) => p.featured)
  const totalTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].length

  return (
      <div className="h-full flex items-center justify-center p-4 lg:p-8 bg-gray-950">
        <div className="text-center max-w-2xl">
          <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4 lg:mb-6 border border-gray-800">
            <FolderOpen className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
          </div>

          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">
            Bem-vindo à <span className="text-blue-400">Biblioteca</span>
          </h1>

          <p className="text-gray-400 text-sm lg:text-lg mb-6 lg:mb-8 px-4">
            Selecione um projeto na barra lateral para explorar detalhes, tecnologias utilizadas, desafios superados e ver
            demonstrações ao vivo.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
              <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg mx-auto mb-2 lg:mb-3">
                <Code className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-white">{projects.length}</div>
              <div className="text-gray-400 text-xs lg:text-sm">Projetos totais</div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
              <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg mx-auto mb-2 lg:mb-3">
                <Star className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-current" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-blue-400">{featuredProjects.length}</div>
              <div className="text-gray-400 text-xs lg:text-sm">Projetos em destaque</div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
              <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg mx-auto mb-2 lg:mb-3">
                <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </div>
              <div className="text-xl lg:text-2xl font-bold text-white">{totalTechnologies}</div>
              <div className="text-gray-400 text-xs lg:text-sm">Tecnologias diferentes</div>
            </div>
          </div>

          <div className="text-gray-500">
            <p className="text-xs lg:text-sm px-4">
              💡 Use a busca e filtros na barra lateral para encontrar projetos específicos
            </p>
          </div>
        </div>
      </div>
  )
}
