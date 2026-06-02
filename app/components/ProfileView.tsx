"use client"

import Image from "next/image"
import { MapPin, Calendar, Mail, Download, Code, Database, Smartphone, Globe, Star, Briefcase, GraduationCap } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function ProfileView() {
    const { t, language } = useLanguage()

    const skills = [
        {
            icon: <Globe className="w-5 h-5" />,
            title: t('skill.frontend'),
            description: "React, Next.js, TypeScript, Tailwind CSS",
            level: 95,
        },
        {
            icon: <Database className="w-5 h-5" />,
            title: t('skill.backend'),
            description: "Node.js, Python, PostgreSQL, MongoDB",
            level: 88,
        },
        {
            icon: <Smartphone className="w-5 h-5" />,
            title: t('skill.mobile'),
            description: "React Native, Flutter, iOS, Android",
            level: 82,
        },
        {
            icon: <Code className="w-5 h-5" />,
            title: t('skill.devops'),
            description: "Docker, AWS, Vercel, CI/CD",
            level: 75,
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
        { label: "Anos de Experiência", value: "2+",  icon: <Calendar className="w-5 h-5" /> },
        { label: "Projetos Concluídos",  value: "15+", icon: <Code className="w-5 h-5" /> },
        { label: "Tecnologias",          value: "20+", icon: <Database className="w-5 h-5" /> },
        { label: "Certificações",        value: "5+",  icon: <Star className="w-5 h-5" /> },
    ]

    const handleContactClick = () => {
        console.log('Navegando para contato...')
    }

    const handleDownloadCV = () => {
        const fileName = language === 'pt' ? 'Miguel_Diniz_CV_PT.pdf' : 'Miguel_Diniz_CV_EN.pdf'
        const link = document.createElement('a')
        link.href = `/CV/${fileName}`
        link.download = fileName
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="h-full overflow-y-auto" style={{ background: 'var(--amoled-black)' }}>

            {/* Hero Section */}
            <div
                className="relative border-b p-6 lg:p-8 overflow-hidden"
                style={{ background: 'var(--amoled-black)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">

                        {/* Profile Image */}
                        <div className="relative">
                            <div
                                className="w-36 h-36 lg:w-40 lg:h-40 overflow-hidden border-2"
                                style={{
                                    borderRadius: '20px',
                                    borderColor: 'rgba(201,165,42,0.4)',
                                    boxShadow: '0 0 40px rgba(201,165,42,0.15), 0 20px 60px rgba(0,0,0,0.8)',
                                }}
                            >
                                <Image
                                    src="/Miguel.jpg"
                                    alt="Profile"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                className="absolute -bottom-2 -right-2 w-7 h-7 border-4"
                                style={{
                                    background: 'var(--amoled-green-text)',
                                    borderRadius: '50%',
                                    borderColor: 'var(--amoled-black)',
                                }}
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-3 animate-fade-in" style={{ color: 'var(--amoled-text)' }}>
                                Miguel Diniz
                            </h1>
                            <p className="text-xl lg:text-2xl mb-4 font-semibold animate-slide-in-right" style={{ color: 'var(--amoled-gold)' }}>
                                Desenvolvedor Full Stack
                            </p>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-4 mb-6 animate-slide-in-right"
                                style={{ animationDelay: '200ms' }}
                            >
                                <div
                                    className="glass-gold flex items-center space-x-2 px-3 py-2"
                                    style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
                                >
                                    <MapPin className="w-4 h-4" style={{ color: 'var(--amoled-gold)' }} />
                                    <span className="text-sm lg:text-base">{t('profile.location')}</span>
                                </div>
                                <div
                                    className="glass-gold flex items-center space-x-2 px-3 py-2"
                                    style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
                                >
                                    <Calendar className="w-4 h-4" style={{ color: 'var(--amoled-gold)' }} />
                                    <span className="text-sm lg:text-base">{t('profile.experienceYears')}</span>
                                </div>
                            </div>

                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-3 animate-slide-in-right"
                                style={{ animationDelay: '400ms' }}
                            >
                                <button onClick={handleDownloadCV} className="steam-btn-primary flex items-center gap-2 px-4 py-2">
                                    <Download className="w-4 h-4" />
                                    {t('profile.downloadCV')}
                                </button>
                                <button onClick={handleContactClick} className="steam-btn-secondary flex items-center gap-2 px-4 py-2">
                                    <Mail className="w-4 h-4" />
                                    {t('profile.contact')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {personalStats.map((stat, index) => (
                            <div
                                key={index}
                                className="glass-panel steam-hover p-4 text-center"
                                style={{ animationDelay: `${600 + index * 100}ms` }}
                            >
                                <div
                                    className="w-10 h-10 mx-auto mb-2 flex items-center justify-center"
                                    style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                                >
                                    {stat.icon}
                                </div>
                                <div className="text-xl lg:text-2xl font-bold" style={{ color: 'var(--amoled-gold)' }}>
                                    {stat.value}
                                </div>
                                <div className="text-xs" style={{ color: 'var(--amoled-muted)' }}>{stat.label}</div>
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
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <Star className="w-5 h-5" />
                            </div>
                            {t('profile.title')}
                        </h2>
                        <div className="glass-panel p-6 lg:p-8">
                            <div className="space-y-4">
                                <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{t('profile.bio1')}</p>
                                <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{t('profile.bio2')}</p>
                                <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{t('profile.bio3')}</p>
                            </div>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <Code className="w-5 h-5" />
                            </div>
                            {t('profile.skills')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {skills.map((skill, index) => (
                                <div key={index} className="steam-panel steam-hover p-4 lg:p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(201,165,42,0.08)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                                        >
                                            {skill.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold" style={{ color: 'var(--amoled-text)' }}>{skill.title}</h3>
                                            <p className="text-xs" style={{ color: 'var(--amoled-muted)' }}>{skill.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="flex-1 h-1.5 rounded-full overflow-hidden"
                                            style={{ background: 'var(--amoled-border)' }}
                                        >
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${skill.level}%`, background: 'var(--amoled-gold)' }}
                                            />
                                        </div>
                                        <span
                                            className="text-xs flex-shrink-0"
                                            style={{ color: 'var(--amoled-muted)', fontFamily: 'var(--font-jetbrains-mono)' }}
                                        >
                                            {skill.level}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '400ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <Briefcase className="w-5 h-5" />
                            </div>
                            {t('profile.experience')}
                        </h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="glass-panel steam-hover p-6"
                                    style={{
                                        borderLeftWidth: exp.current ? '2px' : undefined,
                                        borderLeftColor: exp.current ? 'var(--amoled-green-text)' : undefined,
                                        animationDelay: `${index * 150}ms`,
                                    }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: exp.current ? 'rgba(164,208,7,0.15)' : 'rgba(255,255,255,0.06)',
                                                borderRadius: 'var(--radius-sm)',
                                                color: exp.current ? 'var(--amoled-green-text)' : 'var(--amoled-muted)',
                                            }}
                                        >
                                            {exp.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold" style={{ color: 'var(--amoled-text)' }}>
                                                        {exp.title}
                                                    </h3>
                                                    <p className="font-medium" style={{ color: 'var(--amoled-gold)' }}>{exp.company}</p>
                                                </div>
                                                <div className="flex items-center space-x-2 mt-2 md:mt-0">
                                                    <span className="text-sm" style={{ color: 'var(--amoled-muted)' }}>{exp.period}</span>
                                                    {exp.current && (
                                                        <span
                                                            className="px-3 py-1 text-xs font-medium"
                                                            style={{
                                                                background: 'rgba(164,208,7,0.1)',
                                                                color: 'var(--amoled-green-text)',
                                                                borderRadius: 'var(--radius-sm)',
                                                                border: '1px solid rgba(164,208,7,0.2)',
                                                            }}
                                                        >
                                                            {t('profile.current')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{exp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="animate-slide-in-right" style={{ animationDelay: '600ms' }}>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center" style={{ color: 'var(--amoled-text)' }}>
                            <div
                                className="w-8 h-8 mr-4 flex items-center justify-center"
                                style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                            >
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            Educação
                        </h2>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="glass-panel steam-hover p-6"
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(201,165,42,0.12)', borderRadius: 'var(--radius-sm)', color: 'var(--amoled-gold)' }}
                                        >
                                            {edu.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                                <div>
                                                    <h3 className="text-xl font-semibold" style={{ color: 'var(--amoled-text)' }}>{edu.title}</h3>
                                                    <p className="font-medium" style={{ color: 'var(--amoled-gold)' }}>{edu.institution}</p>
                                                </div>
                                                <span className="text-sm mt-2 md:mt-0" style={{ color: 'var(--amoled-muted)' }}>{edu.period}</span>
                                            </div>
                                            <p className="leading-relaxed" style={{ color: 'var(--amoled-muted)' }}>{edu.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Call to Action */}
                    <section className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                        <div className="glass-gold p-8 lg:p-10 text-center" style={{ borderRadius: 'var(--radius-xl)' }}>
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: 'var(--amoled-text)' }}>
                                Interessado em trabalhar juntos?
                            </h3>
                            <p className="text-base lg:text-lg mb-6 max-w-2xl mx-auto" style={{ color: 'var(--amoled-muted)' }}>
                                Estou sempre aberto a novos desafios e oportunidades.
                                Vamos conversar sobre como posso ajudar no seu próximo projeto!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button onClick={handleContactClick} className="steam-btn-primary flex items-center gap-2 px-5 py-2.5">
                                    <Mail className="w-4 h-4" />
                                    Entre em Contato
                                </button>
                                <button onClick={handleDownloadCV} className="steam-btn-secondary flex items-center gap-2 px-5 py-2.5">
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    )
}
