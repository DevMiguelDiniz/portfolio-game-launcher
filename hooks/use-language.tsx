"use client"

import { createContext, useContext, useEffect, useState } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (language: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
    pt: {
        // Navigation
        'nav.projects': 'Projetos',
        'nav.profile': 'Perfil',
        'nav.achievements': 'Conquistas',
        'nav.contact': 'Contato',

        // Achievements specific
        'achievements.firstProject': 'Primeiro Projeto',
        'achievements.firstProjectDesc': 'Completou o primeiro projeto',
        'achievements.techMaster': 'Mestre das Tecnologias',
        'achievements.techMasterDesc': 'Dominou',
        'achievements.techMasterDesc2': 'tecnologias diferentes',
        'achievements.featuredCreator': 'Criador Destacado',
        'achievements.featuredCreatorDesc': 'Criou',
        'achievements.featuredCreatorDesc2': 'projetos em destaque',
        'achievements.fullStackHero': 'Herói Full Stack',
        'achievements.fullStackHeroDesc': 'Completou projetos full stack complexos',
        'achievements.mobilePioneer': 'Pioneiro Mobile',
        'achievements.mobilePioneerDesc': 'Desenvolveu aplicações mobile nativas',
        'achievements.projectCollector': 'Colecionador de Projetos',
        'achievements.projectCollectorDesc': 'Completou',
        'achievements.projectCollectorDesc2': 'projetos únicos',

        // Projects Welcome
        'projects.welcome.title': 'Bem-vindo à Biblioteca',
        'projects.welcome.subtitle': 'Selecione um projeto na barra lateral para explorar detalhes, tecnologias utilizadas, desafios superados e ver demonstrações ao vivo.',
        'projects.welcome.totalProjects': 'Projetos totais',
        'projects.welcome.featuredProjects': 'Projetos em destaque',
        'projects.welcome.differentTechnologies': 'Tecnologias diferentes',
        'projects.welcome.tip': '💡 Use a busca e filtros na barra lateral para encontrar projetos específicos',

        // Sidebar
        'sidebar.library': 'Biblioteca',
        'sidebar.searchPlaceholder': 'Buscar projetos...',
        'sidebar.allCategories': 'Todas as categorias',
        'sidebar.projectsCount': 'projetos',
        'sidebar.total': 'Total:',
        'sidebar.featured': 'Destaques:',

        // Project Detail
        'project.about': 'Sobre este projeto',
        'project.technologies': 'Tecnologias utilizadas',
        'project.features': 'Principais funcionalidades',
        'project.challenges': 'Desafios superados',
        'project.links': 'Links do projeto',
        'project.demo': 'Ver Demo',
        'project.code': 'Ver Código',
        'project.liveDemo': 'Demonstração ao vivo',
        'project.repository': 'Repositório no GitHub',

        // Profile
        'profile.title': 'Sobre mim',
        'profile.bio1': 'Desenvolvedor Full Stack, estudante de Engenharia de Software na PUC Minas, com 2 anos de experiência na área.',
        'profile.bio2': 'Minha expertise inclui desenvolvimento frontend com React e Next.js, backend com SpringBoot e Python, além de experiência em DevOps. Sempre busco aprender novas tecnologias e aplicar as melhores práticas em meus projetos.',
        'profile.bio3': 'Quando não estou codando, gosto de estudar desenvolvimento de jogos, explorar novas linguagens e ler livros sobre tecnologia e inovação.',
        'profile.skills': 'Habilidades técnicas',
        'profile.experience': 'Experiência profissional',
        'profile.proficiency': 'Proficiência',
        'profile.current': 'Atual',
        'profile.downloadCV': 'Download CV',
        'profile.contact': 'Entrar em contato',
        'profile.location': 'Minas Gerais, Brasil',
        'profile.experienceYears': '2 anos de experiência',

        // Achievements
        'achievements.title': 'Conquistas',
        'achievements.subtitle': 'Estatísticas detalhadas e marcos alcançados',
        'achievements.totalProjects': 'Projetos Totais',
        'achievements.featured': 'Em Destaque',
        'achievements.technologies': 'Tecnologias',
        'achievements.completion': 'Conquistas',
        'achievements.unlocked': 'Conquistas Desbloqueadas',
        'achievements.techStats': 'Estatísticas de Tecnologias',
        'achievements.categoryDistribution': 'Distribuição por Categoria',
        'achievements.progressSummary': 'Resumo de Progresso',
        'achievements.totalOf': 'do total',
        'achievements.projectsDeveloped': 'Projetos desenvolvidos',
        'achievements.unlockedAchievements': 'Conquistas Desbloqueadas',
        'achievements.technologiesMastered': 'Tecnologias Dominadas',
        'achievements.projectsCompleted': 'Projetos Completados',
        'achievements.overallProgress': 'Progresso Geral',

        // Contact
        'contact.title': 'Entre em contato',
        'contact.subtitle': 'Tem um projeto em mente? Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.',
        'contact.letsTalk': 'Vamos conversar',
        'contact.email': 'Email',
        'contact.phone': 'Telefone',
        'contact.location': 'Localização',
        'contact.availability': 'Disponibilidade',
        'contact.available': 'Disponível para novos projetos',
        'contact.remote': 'Trabalho remoto ou presencial',
        'contact.freelance': 'Projetos freelance e full-time',
        'contact.consulting': 'Consultoria técnica',
        'contact.sendMessage': 'Envie uma mensagem',
        'contact.name': 'Nome',
        'contact.subject': 'Assunto',
        'contact.message': 'Mensagem',
        'contact.send': 'Enviar mensagem',
        'contact.sending': 'Enviando...',
        'contact.success': 'Mensagem enviada com sucesso! Retornarei em breve.',
        'contact.agreement': 'Ao enviar esta mensagem, você concorda que eu entre em contato sobre seu projeto.',
        'contact.namePlaceholder': 'Seu nome completo',
        'contact.emailPlaceholder': 'seu.email@exemplo.com',
        'contact.subjectPlaceholder': 'Sobre o que você gostaria de conversar?',
        'contact.messagePlaceholder': 'Conte-me sobre seu projeto, suas necessidades e como posso ajudar...',
        'contact.response24h': 'Resposta em até 24 horas',
        'contact.weekdays': 'Seg-Sex, 10h às 15h',
        'contact.remoteAvailable': 'Disponível para trabalho remoto',

        // Splash Screen
        'splash.initializing': 'Inicializando sistema...',
        'splash.loadingLibrary': 'Carregando biblioteca...',
        'splash.configuringInterface': 'Configurando interface...',
        'splash.optimizing': 'Otimizando performance...',
        'splash.finalizing': 'Finalizando...',
        'splash.welcome': 'Bem-vindo',
        'splash.loading': 'Carregando experiência...',
        'splash.progress': 'Progresso',
        'splash.version': 'Portfolio v2.0 • Next.js 15 • Steam Edition',

        // Categories
        'category.web': 'Web',
        'category.mobile': 'Mobile',
        'category.fullstack': 'Full Stack',
        'category.frontend': 'Frontend',
        'category.backend': 'Backend',
        'category.desktop': 'Desktop',

        // Skills
        'skill.frontend': 'Desenvolvimento Frontend',
        'skill.backend': 'Desenvolvimento Backend',
        'skill.mobile': 'Desenvolvimento Mobile',
        'skill.devops': 'DevOps & Cloud',

        // Common
        'common.featured': 'Destaque',
        'common.demo': 'Demo',
        'common.code': 'Código',
        'common.projects': 'projetos',
        'common.close': 'Fechar',
        'common.search': 'Buscar',
        'common.filter': 'Filtrar',
        'common.all': 'Todos',
    },
    en: {
        // Navigation
        'nav.projects': 'Projects',
        'nav.profile': 'Profile',
        'nav.achievements': 'Achievements',
        'nav.contact': 'Contact',

        // Achievements specific
        'achievements.firstProject': 'First Project',
        'achievements.firstProjectDesc': 'Completed the first project',
        'achievements.techMaster': 'Tech Master',
        'achievements.techMasterDesc': 'Mastered',
        'achievements.techMasterDesc2': 'different technologies',
        'achievements.featuredCreator': 'Featured Creator',
        'achievements.featuredCreatorDesc': 'Created',
        'achievements.featuredCreatorDesc2': 'featured projects',
        'achievements.fullStackHero': 'Full Stack Hero',
        'achievements.fullStackHeroDesc': 'Completed complex full stack projects',
        'achievements.mobilePioneer': 'Mobile Pioneer',
        'achievements.mobilePioneerDesc': 'Developed native mobile applications',
        'achievements.projectCollector': 'Project Collector',
        'achievements.projectCollectorDesc': 'Completed',
        'achievements.projectCollectorDesc2': 'unique projects',

        // Projects Welcome
        'projects.welcome.title': 'Welcome to the Library',
        'projects.welcome.subtitle': 'Select a project from the sidebar to explore details, technologies used, challenges overcome, and see live demonstrations.',
        'projects.welcome.totalProjects': 'Total projects',
        'projects.welcome.featuredProjects': 'Featured projects',
        'projects.welcome.differentTechnologies': 'Different technologies',
        'projects.welcome.tip': '💡 Use search and filters in the sidebar to find specific projects',

        // Sidebar
        'sidebar.library': 'Library',
        'sidebar.searchPlaceholder': 'Search projects...',
        'sidebar.allCategories': 'All categories',
        'sidebar.projectsCount': 'projects',
        'sidebar.total': 'Total:',
        'sidebar.featured': 'Featured:',

        // Project Detail
        'project.about': 'About this project',
        'project.technologies': 'Technologies used',
        'project.features': 'Key features',
        'project.challenges': 'Challenges overcome',
        'project.links': 'Project links',
        'project.demo': 'View Demo',
        'project.code': 'View Code',
        'project.liveDemo': 'Live demonstration',
        'project.repository': 'GitHub repository',

        // Profile
        'profile.title': 'About me',
        'profile.bio1': 'Full Stack Developer, Software Engineering student at PUC Minas, with 2 years of experience in the field.',
        'profile.bio2': 'My expertise includes frontend development with React and Next.js, backend with SpringBoot and Python, plus DevOps experience. I always seek to learn new technologies and apply best practices in my projects.',
        'profile.bio3': 'When I\'m not coding, I enjoy studying game development, exploring new languages, and reading books about technology and innovation.',
        'profile.skills': 'Technical skills',
        'profile.experience': 'Professional experience',
        'profile.proficiency': 'Proficiency',
        'profile.current': 'Current',
        'profile.downloadCV': 'Download CV',
        'profile.contact': 'Get in touch',
        'profile.location': 'Minas Gerais, Brazil',
        'profile.experienceYears': '2 years of experience',

        // Achievements
        'achievements.title': 'Achievements',
        'achievements.subtitle': 'Detailed statistics and milestones achieved',
        'achievements.totalProjects': 'Total Projects',
        'achievements.featured': 'Featured',
        'achievements.technologies': 'Technologies',
        'achievements.completion': 'Achievements',
        'achievements.unlocked': 'Unlocked Achievements',
        'achievements.techStats': 'Technology Statistics',
        'achievements.categoryDistribution': 'Category Distribution',
        'achievements.progressSummary': 'Progress Summary',
        'achievements.totalOf': 'of total',
        'achievements.projectsDeveloped': 'Projects developed',
        'achievements.unlockedAchievements': 'Unlocked Achievements',
        'achievements.technologiesMastered': 'Technologies Mastered',
        'achievements.projectsCompleted': 'Projects Completed',
        'achievements.overallProgress': 'Overall Progress',

        // Contact
        'contact.title': 'Get in touch',
        'contact.subtitle': 'Have a project in mind? Let\'s talk about how I can help transform your idea into reality.',
        'contact.letsTalk': 'Let\'s talk',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.availability': 'Availability',
        'contact.available': 'Available for new projects',
        'contact.remote': 'Remote or on-site work',
        'contact.freelance': 'Freelance and full-time projects',
        'contact.consulting': 'Technical consulting',
        'contact.sendMessage': 'Send a message',
        'contact.name': 'Name',
        'contact.subject': 'Subject',
        'contact.message': 'Message',
        'contact.send': 'Send message',
        'contact.sending': 'Sending...',
        'contact.success': 'Message sent successfully! I\'ll get back to you soon.',
        'contact.agreement': 'By sending this message, you agree that I may contact you about your project.',
        'contact.namePlaceholder': 'Your full name',
        'contact.emailPlaceholder': 'your.email@example.com',
        'contact.subjectPlaceholder': 'What would you like to talk about?',
        'contact.messagePlaceholder': 'Tell me about your project, your needs and how I can help...',
        'contact.response24h': 'Response within 24 hours',
        'contact.weekdays': 'Mon-Fri, 10am to 3pm',
        'contact.remoteAvailable': 'Available for remote work',

        // Splash Screen
        'splash.initializing': 'Initializing system...',
        'splash.loadingLibrary': 'Loading library...',
        'splash.configuringInterface': 'Configuring interface...',
        'splash.optimizing': 'Optimizing performance...',
        'splash.finalizing': 'Finalizing...',
        'splash.welcome': 'Welcome',
        'splash.loading': 'Loading experience...',
        'splash.progress': 'Progress',
        'splash.version': 'Portfolio v2.0 • Next.js 15 • Steam Edition',

        // Categories
        'category.web': 'Web',
        'category.mobile': 'Mobile',
        'category.fullstack': 'Full Stack',
        'category.frontend': 'Frontend',
        'category.backend': 'Backend',
        'category.desktop': 'Desktop',

        // Skills
        'skill.frontend': 'Frontend Development',
        'skill.backend': 'Backend Development',
        'skill.mobile': 'Mobile Development',
        'skill.devops': 'DevOps & Cloud',

        // Common
        'common.featured': 'Featured',
        'common.demo': 'Demo',
        'common.code': 'Code',
        'common.projects': 'projects',
        'common.close': 'Close',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.all': 'All',
    }
} as const

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt')

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('portfolio-language') as Language
            if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
                setLanguage(savedLanguage)
            } else {
                const browserLanguage = navigator.language.slice(0, 2)
                setLanguage(browserLanguage === 'pt' ? 'pt' : 'en')
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('portfolio-language', language)
        }
    }, [language])

    const t = (key: string): string => {
        const languageTranslations = translations[language]
        return (languageTranslations as any)[key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}