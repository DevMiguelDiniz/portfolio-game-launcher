"use client"

import {
    Trophy,
    Star,
    Code,
    Database,
    Smartphone,
    Globe,
    Calendar,
    TrendingUp,
    Award,
    Target,
    Zap,
    Crown,
} from "lucide-react"
import { projects } from "../data/projects"

export default function AchievementsView() {
    // Calculate statistics from projects
    const totalProjects = projects.length
    const featuredProjects = projects.filter((p) => p.featured).length
    const allTechnologies = projects.flatMap((p) => p.technologies)
    const uniqueTechnologies = [...new Set(allTechnologies)]

    // Technology usage statistics
    const technologyStats = uniqueTechnologies
        .map((tech) => {
            const usage = allTechnologies.filter((t) => t === tech).length
            const percentage = Math.round((usage / totalProjects) * 100)
            return { name: tech, usage, percentage }
        })
        .sort((a, b) => b.usage - a.usage)

    // Category statistics
    const categoryStats = [
        {
            name: "Frontend",
            count: projects.filter((p) => p.category === "frontend").length,
            icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "text-blue-400",
        },
        {
            name: "Backend",
            count: projects.filter((p) => p.category === "backend").length,
            icon: <Database className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "text-green-400",
        },
        {
            name: "Mobile",
            count: projects.filter((p) => p.category === "mobile").length,
            icon: <Smartphone className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "text-purple-400",
        },
        {
            name: "Full Stack",
            count: projects.filter((p) => p.category === "fullstack").length,
            icon: <Code className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "text-orange-400",
        },
        {
            name: "Web",
            count: projects.filter((p) => p.category === "web").length,
            icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "text-cyan-400",
        },
    ].filter((cat) => cat.count > 0)

    // Achievements/Badges
    const achievements = [
        {
            id: "first-project",
            title: "Primeiro Projeto",
            description: "Completou o primeiro projeto",
            icon: <Star className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: true,
            rarity: "common",
            date: "Jul 2023",
        },
        {
            id: "tech-master",
            title: "Mestre das Tecnologias",
            description: `Dominou ${uniqueTechnologies.length} tecnologias diferentes`,
            icon: <Code className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: uniqueTechnologies.length >= 10,
            rarity: "rare",
            date: "Nov 2023",
        },
        {
            id: "featured-creator",
            title: "Criador Destacado",
            description: `Criou ${featuredProjects} projetos em destaque`,
            icon: <Crown className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: featuredProjects >= 2,
            rarity: "epic",
            date: "Dez 2023",
        },
        {
            id: "full-stack-hero",
            title: "Herói Full Stack",
            description: "Completou projetos full stack complexos",
            icon: <Zap className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: projects.filter((p) => p.category === "fullstack").length >= 2,
            rarity: "legendary",
            date: "Jan 2024",
        },
        {
            id: "mobile-pioneer",
            title: "Pioneiro Mobile",
            description: "Desenvolveu aplicações mobile nativas",
            icon: <Smartphone className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: projects.filter((p) => p.category === "mobile").length >= 1,
            rarity: "rare",
            date: "Out 2023",
        },
        {
            id: "project-collector",
            title: "Colecionador de Projetos",
            description: `Completou ${totalProjects} projetos únicos`,
            icon: <Trophy className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: totalProjects >= 5,
            rarity: "epic",
            date: "Dez 2023",
        },
    ]

    const unlockedAchievements = achievements.filter((a) => a.unlocked)
    const completionRate = Math.round((unlockedAchievements.length / achievements.length) * 100)

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "common":
                return "text-gray-400 border-gray-600"
            case "rare":
                return "text-blue-400 border-blue-600"
            case "epic":
                return "text-purple-400 border-purple-600"
            case "legendary":
                return "text-yellow-400 border-yellow-600"
            default:
                return "text-gray-400 border-gray-600"
        }
    }

    return (
        <div className="h-full overflow-y-auto bg-gray-950">
            {/* Hero Section */}
            <div className="bg-gray-900 border-b border-gray-800 p-4 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-yellow-600 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl lg:text-4xl font-bold text-white">Conquistas</h1>
                            <p className="text-gray-400 text-sm lg:text-lg">Estatísticas detalhadas e marcos alcançados</p>
                        </div>
                    </div>

                    {/* Overall Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                        <div className="bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-700">
                            <div className="text-xl lg:text-2xl font-bold text-white">{totalProjects}</div>
                            <div className="text-gray-400 text-xs lg:text-sm">Projetos Totais</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-700">
                            <div className="text-xl lg:text-2xl font-bold text-blue-400">{featuredProjects}</div>
                            <div className="text-gray-400 text-xs lg:text-sm">Em Destaque</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-700">
                            <div className="text-xl lg:text-2xl font-bold text-green-400">{uniqueTechnologies.length}</div>
                            <div className="text-gray-400 text-xs lg:text-sm">Tecnologias</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 lg:p-4 border border-gray-700">
                            <div className="text-xl lg:text-2xl font-bold text-yellow-400">{completionRate}%</div>
                            <div className="text-gray-400 text-xs lg:text-sm">Conquistas</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-8 lg:space-y-12">
                    {/* Achievements Grid */}
                    <section>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center">
                            <Award className="w-6 h-6 lg:w-8 lg:h-8 mr-2 lg:mr-3 text-yellow-400" />
                            Conquistas Desbloqueadas
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            {achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className={`rounded-lg p-4 lg:p-6 border-2 transition-all duration-300 ${
                                        achievement.unlocked
                                            ? `bg-gray-900 ${getRarityColor(achievement.rarity)} hover:scale-105`
                                            : "bg-gray-900/50 border-gray-700 opacity-50"
                                    }`}
                                >
                                    <div className="flex items-start space-x-3 lg:space-x-4">
                                        <div
                                            className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${
                                                achievement.unlocked
                                                    ? achievement.rarity === "legendary"
                                                        ? "bg-yellow-600"
                                                        : achievement.rarity === "epic"
                                                            ? "bg-purple-600"
                                                            : achievement.rarity === "rare"
                                                                ? "bg-blue-600"
                                                                : "bg-gray-600"
                                                    : "bg-gray-700"
                                            }`}
                                        >
                                            <div className={achievement.unlocked ? "text-white" : "text-gray-500"}>{achievement.icon}</div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                <h3
                                                    className={`font-bold text-sm lg:text-base ${achievement.unlocked ? "text-white" : "text-gray-500"}`}
                                                >
                                                    {achievement.title}
                                                </h3>
                                                {achievement.unlocked && (
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded mt-1 sm:mt-0 ${
                                                            achievement.rarity === "legendary"
                                                                ? "bg-yellow-600/20 text-yellow-400"
                                                                : achievement.rarity === "epic"
                                                                    ? "bg-purple-600/20 text-purple-400"
                                                                    : achievement.rarity === "rare"
                                                                        ? "bg-blue-600/20 text-blue-400"
                                                                        : "bg-gray-600/20 text-gray-400"
                                                        }`}
                                                    >
                            {achievement.rarity}
                          </span>
                                                )}
                                            </div>
                                            <p
                                                className={`text-xs lg:text-sm mb-2 ${achievement.unlocked ? "text-gray-300" : "text-gray-500"}`}
                                            >
                                                {achievement.description}
                                            </p>
                                            {achievement.unlocked && achievement.date && (
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {achievement.date}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technology Statistics */}
                    <section>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center">
                            <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 mr-2 lg:mr-3 text-blue-400" />
                            Estatísticas de Tecnologias
                        </h2>
                        <div className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800">
                            <div className="grid gap-3 lg:gap-4">
                                {technologyStats.slice(0, 10).map((tech, index) => (
                                    <div key={tech.name} className="flex items-center space-x-3 lg:space-x-4">
                                        <div className="w-6 lg:w-8 text-gray-400 text-xs lg:text-sm font-mono">#{index + 1}</div>
                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                                <span className="text-white font-medium text-sm lg:text-base">{tech.name}</span>
                                                <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                                                    <span className="text-gray-400 text-xs lg:text-sm">{tech.usage} projetos</span>
                                                    <span className="text-blue-400 text-xs lg:text-sm font-mono">{tech.percentage}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full bg-blue-600 transition-all duration-1000"
                                                    style={{ width: `${tech.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Category Distribution */}
                    <section>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex items-center">
                            <Target className="w-6 h-6 lg:w-8 lg:h-8 mr-2 lg:mr-3 text-green-400" />
                            Distribuição por Categoria
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            {categoryStats.map((category) => (
                                <div
                                    key={category.name}
                                    className="bg-gray-900 rounded-lg p-4 lg:p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-3 lg:space-x-4 mb-4">
                                        <div
                                            className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gray-800 flex items-center justify-center ${category.color}`}
                                        >
                                            {category.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg lg:text-xl font-bold text-white">{category.name}</h3>
                                            <p className="text-gray-400 text-xs lg:text-sm">Projetos desenvolvidos</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl lg:text-3xl font-bold text-white mb-2">{category.count}</div>
                                    <div className="w-full bg-gray-800 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-1000 ${
                                                category.color.includes("blue")
                                                    ? "bg-blue-600"
                                                    : category.color.includes("green")
                                                        ? "bg-green-600"
                                                        : category.color.includes("purple")
                                                            ? "bg-purple-600"
                                                            : category.color.includes("orange")
                                                                ? "bg-orange-600"
                                                                : "bg-cyan-600"
                                            }`}
                                            style={{ width: `${Math.round((category.count / totalProjects) * 100)}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-gray-400 text-xs lg:text-sm mt-2">
                                        {Math.round((category.count / totalProjects) * 100)}% do total
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Progress Summary */}
                    <section className="bg-gray-900 rounded-lg p-6 lg:p-8 border border-gray-800">
                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6 text-center">Resumo de Progresso</h2>
                        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 text-center">
                            <div>
                                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">
                                    {unlockedAchievements.length}/{achievements.length}
                                </div>
                                <div className="text-gray-400 text-sm lg:text-base">Conquistas Desbloqueadas</div>
                            </div>
                            <div>
                                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">{uniqueTechnologies.length}</div>
                                <div className="text-gray-400 text-sm lg:text-base">Tecnologias Dominadas</div>
                            </div>
                            <div>
                                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">{totalProjects}</div>
                                <div className="text-gray-400 text-sm lg:text-base">Projetos Completados</div>
                            </div>
                        </div>

                        <div className="mt-6 lg:mt-8">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-white font-medium text-sm lg:text-base">Progresso Geral</span>
                                <span className="text-blue-400 font-mono text-sm lg:text-base">{completionRate}%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                                <div
                                    className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
                                    style={{ width: `${completionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
