"use client"

import { FolderOpen, Star, Code, TrendingUp } from "lucide-react"
import { projects } from "../data/projects"
import { useLanguage } from "@/hooks/use-language"

export default function ProjectsWelcome() {
    const { t } = useLanguage()
    const featuredProjects = projects.filter((p) => p.featured)
    const totalTechnologies = [...new Set(projects.flatMap((p) => p.technologies))].length

    return (
        <div className="h-full flex items-center justify-center p-4 lg:p-8 bg-gray-950">
            <div className="text-center max-w-2xl">
                <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4 lg:mb-6 border border-gray-800">
                    <FolderOpen className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
                </div>

                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">
                    {t('projects.welcome.title')}
                </h1>

                <p className="text-gray-400 text-sm lg:text-lg mb-6 lg:mb-8 px-4">
                    {t('projects.welcome.subtitle')}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                    <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
                        <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg mx-auto mb-2 lg:mb-3">
                            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-white">{totalTechnologies}</div>
                        <div className="text-gray-400 text-xs lg:text-sm">{t('projects.welcome.differentTechnologies')}</div>
                    </div>
                </div>

                <div className="text-gray-500">
                    <p className="text-xs lg:text-sm px-4">
                        {t('projects.welcome.tip')}
                    </p>
                </div>
            </div>
        </div>
    )
}