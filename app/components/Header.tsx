"use client"

import { Github, Linkedin, Mail, User, FolderOpen, MessageCircle, Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "./LanguageSwitcher"
import type { TabType } from "../page"

interface HeaderProps {
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
    sidebarOpen?: boolean
    setSidebarOpen?: (open: boolean) => void
}

const SOCIAL_LINKS = [
    { id: 'github',   label: 'GitHub',   icon: <Github   className="w-4 h-4" />, href: 'https://github.com/DevMiguelDiniz' },
    { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/in/miguel-diniz' },
] as const

export default function Header({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: HeaderProps) {
    const { t } = useLanguage()

    const tabs = [
        { id: "projects" as TabType,     label: t('nav.projects'),     icon: <FolderOpen    className="w-4 h-4" /> },
        { id: "profile" as TabType,      label: t('nav.profile'),      icon: <User          className="w-4 h-4" /> },
        { id: "achievements" as TabType, label: t('nav.achievements'), icon: <Trophy        className="w-4 h-4" /> },
        { id: "contact" as TabType,      label: t('nav.contact'),      icon: <MessageCircle className="w-4 h-4" /> },
    ]

    return (
        <header
            className="h-14 flex items-center justify-between px-4 lg:px-6 border-b"
            style={{ background: 'var(--steam-dark)', borderColor: 'var(--steam-border)' }}
        >
            {/* Left — Logo */}
            <div className="flex items-center gap-3">
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden w-8 h-8 rounded"
                        style={{ color: 'var(--steam-muted)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                )}

                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: 'var(--steam-blue)' }}
                    >
                        P
                    </div>
                    <div className="hidden sm:block">
                        <span className="font-semibold text-base" style={{ color: 'var(--steam-text)' }}>
                            Portfolio
                        </span>
                        <div className="text-xs font-mono" style={{ color: 'var(--steam-muted)' }}>
                            Steam Edition
                        </div>
                    </div>
                </div>
            </div>

            {/* Center — Navigation */}
            <nav
                className="flex items-center gap-0.5 rounded p-0.5"
                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--steam-border)' }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded text-sm font-medium transition-colors"
                            style={{
                                background:   isActive ? 'var(--steam-panel)' : 'transparent',
                                color:        isActive ? 'var(--steam-blue)' : 'var(--steam-muted)',
                                borderBottom: isActive ? `2px solid var(--steam-blue)` : '2px solid transparent',
                            }}
                        >
                            {tab.icon}
                            <span className="hidden sm:block">{tab.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Right — Social + Language */}
            <div className="flex items-center gap-1">
                {SOCIAL_LINKS.map((item) => (
                    <Button
                        key={item.id}
                        variant="ghost"
                        size="icon"
                        aria-label={item.label}
                        className="w-8 h-8 rounded transition-colors"
                        style={{ color: 'var(--steam-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--steam-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--steam-muted)')}
                        onClick={() => window.open(item.href, '_blank')}
                    >
                        {item.icon}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Contato"
                    className="w-8 h-8 rounded transition-colors"
                    style={{ color: 'var(--steam-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--steam-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--steam-muted)')}
                    onClick={() => setActiveTab('contact')}
                >
                    <Mail className="w-4 h-4" />
                </Button>
                <div className="w-px h-5 mx-1" style={{ background: 'var(--steam-border)' }} />
                <LanguageSwitcher />
            </div>
        </header>
    )
}
