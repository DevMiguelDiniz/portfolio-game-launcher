"use client"

import Image from "next/image"
import { MapPin, Calendar, Mail, Phone, Download, Code, Database, Smartphone, Globe, Star, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export default function ProfileView() {
    const { t } = useLanguage()

    const skills = [
        {
            icon: <Globe className="w-6 h-6" />,
            title: t('skill.frontend'),
            description: "React, Next.js, TypeScript, Tailwind CSS",
            level: 95,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: t('skill.backend'),
            description: "Node.js, Python, PostgreSQL, MongoDB",
            level: 88,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500/10"
        },
        {
            icon: <Smartphone className="w-6 h-6" />,
            title: t('skill.mobile'),
            description: "React Native, Flutter, iOS, Android",
            level: 82,
            color: "from-purple-500 to-violet-500",
            bgColor: "bg-purple-500/10"
        },
        {
            icon: <Code className="w-6 h-6" />,
            title: t('skill.devops'),
            description: "Docker, AWS, Vercel, CI/CD",
            level: 75,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-500/10"
        },
    ]

    const experience = [
        {
            title: "Estágio em Desenvolvimento Full Stack",
            company: "JdsDev",
            period: "2025 - Presente",
            description: "Desenvolvimento de aplicações web e mobile usando React, Next, SpringBoot, e cloud services.",
            current: true,
            icon: <Briefcase className="w-5 h-5" />
        },
    ]

    const education = [
        {
            title: "Engenharia de Software",
            institution: "PUC Minas",
            period: "2023 - 2027",
            description: "Focado em desenvolvimento de software, arquitetura de sistemas e metodologias ágeis.",
            icon: <GraduationCap className="w-5 h-5" />
        },
    ]

    const personalStats = [
        {
            label: "Anos de Experiência",
            value: "2+",
            icon: <Calendar className="w-5 h-5" />,
            color: "from-blue-500 to-cyan-500"
        },
        {
            label: "Projetos Concluídos",
            value: "15+",
            icon: <Code className="w-5 h-5" />,
            color: "from-green-500 to-emerald-500"
        },
        {
            label: "Tecnologias",
            value: "20+",
            icon: <Database className="w-5 h-5" />,
            color: "from-purple-500 to-violet-500"
        },
        {
            label: "Certificações",
            value: "5+",
            icon: <Star className="w-5 h-5" />,
            color: "from-yellow-500 to-orange-500"
        }
    ]

    const handleContactClick = () => {
        // Aqui você pode implementar a navegação para a página de contato
        // ou abrir um modal de contato
        console.log('Navegando para contato...')
    }

    const handleDownloadCV = () => {
        const { language } = useLanguage();

        const fileName = language === 'pt' ? 'Miguel_Diniz_CV_PT.pdf' : 'Miguel_Diniz_CV_EN.pdf';

        const link = document.createElement('a');
        link.href = `/CV/${fileName}`;
        link.download = fileName;
        link.target = '_blank';

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        console.log(`Fazendo download do CV: ${fileName}`);
    }

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800/50 p-6 lg:p-8 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500 rounded-full blur-2xl animate-float"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                        {/* Profile Image */}
                        <div className="relative group animate-bounce-in">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl animate-pulse opacity-60"></div>
                            <div className="absolute inset-1 bg-gray-900 rounded-2xl"></div>
                            <div className="relative w-36 h-36 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-gray-700/50 shadow-2xl shadow-blue-500/25 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src="/Miguel.jpg"
                                    alt="Profile"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse shadow-lg"></div>

                            {/* Floating particles around profile */}
                            <div className="absolute -top-3 -left-3 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
                            <div
                                className="absolute -bottom-3 -right-8 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-60"
                                style={{ animationDelay: '0.5s' }}
                            ></div>
                        </div>

                        {/* Profile Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-3 animate-fade-in">
                                <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                                    Miguel Diniz
                                </span>
                            </h1>
                            <p className="text-blue-400 text-xl lg:text-2xl mb-4 font-semibold animate-slide-in-right">
                                Desenvolvedor Full Stack
                            </p>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 mb-6 animate-slide-in-right"
                                style={{ animationDelay: '200ms' }}
                            >
                                <div className="flex items-center space-x-2 bg-gray-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-700/50">
                                    <MapPin className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm lg:text-base">{t('profile.location')}</span>
                                </div>
                                <div className="flex items-center space-x-2 bg-gray-800/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-700/50">
                                    <Calendar className="w-4 h-4 text-green-400" />
                                    <span className="text-sm lg:text-base">{t('profile.experienceYears')}</span>
                                </div>
                            </div>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-3 animate-slide-in-right"
                                style={{ animationDelay: '400ms' }}
                            >
                                <Button
                                    onClick={handleDownloadCV}
                                    className="btn-enhanced bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                                >
                                    <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                    {t('profile.downloadCV')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleContactClick}
                                    className="border-2 border-gray-600/50 text-gray-300 hover:bg-gray-800/60 hover:border-blue-500/50 bg-gray-900/40 backdrop-blur-sm group"
                                >
                                    <Mail className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                    {t('profile.contact')}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {personalStats.map((stat, index) => (
                            <div
                                key={index}
                                className="project-card-enhanced p-4 text-center group hover:scale-105"
                                style={{ animationDelay: `${600 + index * 100}ms` }}
                            >
                                <div className={`w-10 h-10 mx-auto mb-2 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                    <div className="text-white">
                                        {stat.icon}
                                    </div>
                                </div>
                                <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-xs lg:text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
                <div className="max-w-6xl mx-auto space-y-12">
                    {/* About */}
                    <section className="animate-fade-in">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4 flex items-center justify-center">
                                <Star className="w-5 h-5 text-white" />
                            </div>
                            {t('profile.title')}
                        </h2>
                        <div className="project-card-enhanced p-6 lg:p-8">
                            <div className="space-y-4">
                                <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                                    {t('profile.bio1')}
                                </p>
                                <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                                    {t('profile.bio2')}
                                </p>
                                <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                                    {t('profile.bio3')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4 flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            {t('profile.skills')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.title}
                                    className="project-card-enhanced p-6 group hover:scale-105"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                                            <div className="text-white">
                                                {skill.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                {skill.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm">{skill.description}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">{t('profile.proficiency')}</span>
                                            <span className={`font-mono bg-gradient-to-r ${skill.color} bg-clip-text text-transparent font-bold`}>
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 relative overflow-hidden`}
                                                style={{ width: `${skill.level}%` }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '400ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl mr-4 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            {t('profile.experience')}
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className={`project-card-enhanced p-6 transition-all duration-400 group hover:scale-105 ${
                                        exp.current
                                            ? "border-2 border-green-500/50 shadow-green-500/20"
                                            : ""
                                    }`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                                            exp.current
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                                : "bg-gradient-to-r from-gray-600 to-gray-700"
                                        }`}>
                                            <div className="text-white">
                                                {exp.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-blue-400 font-medium">{exp.company}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                                                    <span className="text-gray-400 text-sm">{exp.period}</span>
                                                    {exp.current && (
                                                        <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs rounded-lg border border-green-500/30 font-medium animate-pulse">
                                                            {t('profile.current')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '600ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mr-4 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            Educação
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="project-card-enhanced p-6 group hover:scale-105"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                                            <div className="text-white">
                                                {edu.icon}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                                                        {edu.title}
                                                    </h3>
                                                    <p className="text-yellow-400 font-medium">{edu.institution}</p>
                                                </div>
                                                <span className="text-gray-400 text-sm mt-2 md:mt-0">{edu.period}</span>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed">{edu.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                        <div className="project-card-enhanced p-8 lg:p-10 text-center">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                Interessado em trabalhar juntos?
                            </h3>
                            <p className="text-gray-400 text-base lg:text-lg mb-6 max-w-2xl mx-auto">
                                Estou sempre aberto a novos desafios e oportunidades.
                                Vamos conversar sobre como posso ajudar no seu próximo projeto!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    onClick={handleContactClick}
                                    className="btn-enhanced bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                                >
                                    <Mail className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                    Entre em Contato
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleDownloadCV}
                                    className="border-2 border-gray-600/50 text-gray-300 hover:bg-gray-800/60 hover:border-blue-500/50 bg-gray-900/40 backdrop-blur-sm group"
                                >
                                    <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                                    Download CV
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}