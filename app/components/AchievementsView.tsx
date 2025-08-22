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
import { useLanguage } from "@/hooks/use-language"

export default function AchievementsView() {
    const { t } = useLanguage()

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
            name: t('category.frontend'),
            count: projects.filter((p) => p.category === "frontend").length,
            icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/20",
        },
        {
            name: t('category.backend'),
            count: projects.filter((p) => p.category === "backend").length,
            icon: <Database className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500/20",
        },
        {
            name: t('category.mobile'),
            count: projects.filter((p) => p.category === "mobile").length,
            icon: <Smartphone className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "from-purple-500 to-violet-500",
            bgColor: "bg-purple-500/20",
        },
        {
            name: t('category.fullstack'),
            count: projects.filter((p) => p.category === "fullstack").length,
            icon: <Code className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-500/20",
        },
        {
            name: t('category.web'),
            count: projects.filter((p) => p.category === "web").length,
            icon: <Globe className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "from-cyan-500 to-teal-500",
            bgColor: "bg-cyan-500/20",
        },
        {
            name: t('category.desktop'),
            count: projects.filter((p) => p.category === "desktop").length,
            icon: <Code className="w-4 h-4 lg:w-5 lg:h-5" />,
            color: "from-yellow-500 to-amber-500",
            bgColor: "bg-yellow-500/20",
        },
    ].filter((cat) => cat.count > 0)

    // Achievements/Badges
    const achievements = [
        {
            id: "first-project",
            title: t('achievements.firstProject') || "Primeiro Projeto",
            description: t('achievements.firstProjectDesc') || "Completou o primeiro projeto",
            icon: <Star className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: true,
            rarity: "common",
            date: "Jul 2023",
            color: "from-gray-500 to-gray-600"
        },
        {
            id: "tech-master",
            title: t('achievements.techMaster') || "Mestre das Tecnologias",
            description: `${t('achievements.techMasterDesc') || "Dominou"} ${uniqueTechnologies.length} ${t('achievements.techMasterDesc2') || "tecnologias diferentes"}`,
            icon: <Code className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: uniqueTechnologies.length >= 10,
            rarity: "rare",
            date: "Nov 2023",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: "featured-creator",
            title: t('achievements.featuredCreator') || "Criador Destacado",
            description: `${t('achievements.featuredCreatorDesc') || "Criou"} ${featuredProjects} ${t('achievements.featuredCreatorDesc2') || "projetos em destaque"}`,
            icon: <Crown className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: featuredProjects >= 2,
            rarity: "epic",
            date: "Dez 2023",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: "full-stack-hero",
            title: t('achievements.fullStackHero') || "Herói Full Stack",
            description: t('achievements.fullStackHeroDesc') || "Completou projetos full stack complexos",
            icon: <Zap className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: projects.filter((p) => p.category === "fullstack").length >= 2,
            rarity: "legendary",
            date: "Jan 2024",
            color: "from-yellow-500 to-yellow-600"
        },
        {
            id: "mobile-pioneer",
            title: t('achievements.mobilePioneer') || "Pioneiro Mobile",
            description: t('achievements.mobilePioneerDesc') || "Desenvolveu aplicações mobile nativas",
            icon: <Smartphone className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: projects.filter((p) => p.category === "mobile").length >= 1,
            rarity: "rare",
            date: "Out 2023",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: "project-collector",
            title: t('achievements.projectCollector') || "Colecionador de Projetos",
            description: `${t('achievements.projectCollectorDesc') || "Completou"} ${totalProjects} ${t('achievements.projectCollectorDesc2') || "projetos únicos"}`,
            icon: <Trophy className="w-5 h-5 lg:w-6 lg:h-6" />,
            unlocked: totalProjects >= 5,
            rarity: "epic",
            date: "Dez 2023",
            color: "from-purple-500 to-purple-600"
        },
    ]

    const unlockedAchievements = achievements.filter((a) => a.unlocked)
    const completionRate = Math.round((unlockedAchievements.length / achievements.length) * 100)

    const getRarityStyles = (rarity: string) => {
        switch (rarity) {
            case "common":
                return {
                    border: "border-gray-500/50",
                    glow: "shadow-gray-500/20",
                    bg: "from-gray-500/10 to-gray-600/10"
                }
            case "rare":
                return {
                    border: "border-blue-500/50",
                    glow: "shadow-blue-500/30",
                    bg: "from-blue-500/10 to-blue-600/10"
                }
            case "epic":
                return {
                    border: "border-purple-500/50",
                    glow: "shadow-purple-500/30",
                    bg: "from-purple-500/10 to-purple-600/10"
                }
            case "legendary":
                return {
                    border: "border-yellow-500/50",
                    glow: "shadow-yellow-500/40 animate-glow-pulse",
                    bg: "from-yellow-500/10 to-yellow-600/10"
                }
            default:
                return {
                    border: "border-gray-500/50",
                    glow: "shadow-gray-500/20",
                    bg: "from-gray-500/10 to-gray-600/10"
                }
        }
    }

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800/50 p-4 lg:p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-500 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-float-delayed"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/25 animate-bounce-in">
                            <Trophy className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-fade-in">
                                {t('achievements.title')}
                            </h1>
                            <p className="text-gray-400 text-sm lg:text-lg mt-2 animate-slide-in-right">
                                {t('achievements.subtitle')}
                            </p>
                        </div>
                    </div>

                    {/* Overall Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {[
                            {
                                value: totalProjects,
                                label: t('achievements.totalProjects'),
                                color: "from-blue-500 to-cyan-500",
                                icon: <Code className="w-5 h-5" />
                            },
                            {
                                value: featuredProjects,
                                label: t('achievements.featured'),
                                color: "from-yellow-500 to-orange-500",
                                icon: <Star className="w-5 h-5" />
                            },
                            {
                                value: uniqueTechnologies.length,
                                label: t('achievements.technologies'),
                                color: "from-green-500 to-emerald-500",
                                icon: <Database className="w-5 h-5" />
                            },
                            {
                                value: `${completionRate}%`,
                                label: t('achievements.completion'),
                                color: "from-purple-500 to-violet-500",
                                icon: <Trophy className="w-5 h-5" />
                            }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="project-card-enhanced p-4 lg:p-6 group hover:scale-105"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                        {stat.icon}
                                    </div>
                                    <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                        {stat.value}
                                    </div>
                                </div>
                                <div className="text-gray-400 text-xs lg:text-sm font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Achievements Grid */}
                    <section>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center animate-fade-in">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mr-3 flex items-center justify-center">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                            {t('achievements.unlocked')}
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            {achievements.map((achievement, index) => {
                                const styles = getRarityStyles(achievement.rarity)
                                return (
                                    <div
                                        key={achievement.id}
                                        className={`achievement-card p-4 lg:p-6 border-2 transition-all duration-400 group ${
                                            achievement.unlocked
                                                ? `${styles.border} ${styles.glow} hover:scale-105 hover:-translate-y-2`
                                                : "border-gray-700/30 opacity-50"
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div
                                                className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                    achievement.unlocked
                                                        ? `bg-gradient-to-r ${achievement.color} shadow-lg group-hover:scale-110 group-hover:rotate-12`
                                                        : "bg-gray-700"
                                                }`}
                                            >
                                                <div className={achievement.unlocked ? "text-white" : "text-gray-500"}>
                                                    {achievement.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                    <h3 className={`font-bold text-sm lg:text-base mb-1 sm:mb-0 ${
                                                        achievement.unlocked ? "text-white" : "text-gray-500"
                                                    }`}>
                                                        {achievement.title}
                                                    </h3>
                                                    {achievement.unlocked && (
                                                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                                                            achievement.rarity === "legendary"
                                                                ? "bg-yellow-600/20 text-yellow-400 border border-yellow-500/30"
                                                                : achievement.rarity === "epic"
                                                                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                                                                    : achievement.rarity === "rare"
                                                                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                                                                        : "bg-gray-600/20 text-gray-400 border border-gray-500/30"
                                                        }`}>
                                                            {achievement.rarity.toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={`text-xs lg:text-sm mb-3 leading-relaxed ${
                                                    achievement.unlocked ? "text-gray-300" : "text-gray-500"
                                                }`}>
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

                                        {/* Unlock effect */}
                                        {achievement.unlocked && (
                                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className={`absolute inset-0 bg-gradient-to-r ${styles.bg} rounded-xl`}></div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Technology Statistics */}
                    <section>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center animate-fade-in">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-3 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            {t('achievements.techStats')}
                        </h2>
                        <div className="project-card-enhanced p-6 lg:p-8">
                            <div className="grid gap-4 lg:gap-6">
                                {technologyStats.slice(0, 10).map((tech, index) => (
                                    <div
                                        key={tech.name}
                                        className="group hover:bg-gray-800/30 p-3 rounded-xl transition-all duration-300"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="flex items-center space-x-4 mb-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-mono text-sm text-white font-bold group-hover:scale-110 transition-transform duration-300">
                                                #{index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                    <span className="text-white font-medium text-sm lg:text-base group-hover:text-blue-400 transition-colors duration-300">
                                                        {tech.name}
                                                    </span>
                                                    <div className="flex items-center space-x-3 mt-1 sm:mt-0">
                                                        <span className="text-gray-400 text-xs lg:text-sm">
                                                            {tech.usage} {t('common.projects')}
                                                        </span>
                                                        <span className="text-blue-400 text-xs lg:text-sm font-mono bg-blue-600/20 px-2 py-1 rounded-lg">
                                                            {tech.percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 relative overflow-hidden"
                                                        style={{ width: `${tech.percentage}%` }}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Category Distribution */}
                    <section>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center animate-fade-in">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-3 flex items-center justify-center">
                                <Target className="w-5 h-5 text-white" />
                            </div>
                            {t('achievements.categoryDistribution')}
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                            {categoryStats.map((category, index) => (
                                <div
                                    key={category.name}
                                    className="project-card-enhanced p-6 group hover:scale-105"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                            <div className="text-white">
                                                {category.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-400 text-xs lg:text-sm">{t('achievements.projectsDeveloped')}</p>
                                        </div>
                                    </div>
                                    <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-3`}>
                                        {category.count}
                                    </div>
                                    <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden mb-2">
                                        <div
                                            className={`h-3 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 relative overflow-hidden`}
                                            style={{ width: `${Math.round((category.count / totalProjects) * 100)}%` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-xs lg:text-sm">
                                        {Math.round((category.count / totalProjects) * 100)}% {t('achievements.totalOf')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Progress Summary */}
                    <section className="animate-fade-in">
                        <div className="project-card-enhanced p-8 lg:p-10 text-center">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 flex items-center justify-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-3 flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                {t('achievements.progressSummary')}
                            </h2>

                            <div className="grid sm:grid-cols-3 gap-8 mb-8">
                                {[
                                    {
                                        value: `${unlockedAchievements.length}/${achievements.length}`,
                                        label: t('achievements.unlockedAchievements'),
                                        color: "from-blue-500 to-cyan-500"
                                    },
                                    {
                                        value: uniqueTechnologies.length,
                                        label: t('achievements.technologiesMastered'),
                                        color: "from-green-500 to-emerald-500"
                                    },
                                    {
                                        value: totalProjects,
                                        label: t('achievements.projectsCompleted'),
                                        color: "from-yellow-500 to-orange-500"
                                    }
                                ].map((stat, index) => (
                                    <div key={index} className="group">
                                        <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="max-w-md mx-auto">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-white font-medium text-sm lg:text-base">{t('achievements.overallProgress')}</span>
                                    <span className="text-blue-400 font-mono text-sm lg:text-base bg-blue-600/20 px-3 py-1 rounded-lg">
                                        {completionRate}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-800/60 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 relative overflow-hidden"
                                        style={{ width: `${completionRate}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}