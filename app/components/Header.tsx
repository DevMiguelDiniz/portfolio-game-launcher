"use client"

import { Github, Linkedin, Mail, User, FolderOpen, MessageCircle, Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import LanguageSwitcher from "./LanguageSwitcher"
import type { TabType } from "../types"

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
            style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(255,255,255,0.06)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
        >
            {/* Left — Logo */}
            <div className="flex items-center gap-3">
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden w-8 h-8"
                        style={{ color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                )}

                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: 'var(--amoled-gold)', borderRadius: 'var(--radius-sm)' }}
                    >
                        P
                    </div>
                    <div className="hidden sm:block">
                        <span className="font-semibold text-base" style={{ color: 'var(--amoled-text)' }}>
                            Portfolio
                        </span>
                        <div className="text-xs font-mono" style={{ color: 'var(--amoled-muted)' }}>
                            Miguel Diniz
                        </div>
                    </div>
                </div>
            </div>

            {/* Center — Navigation */}
            <nav
                className="flex items-center gap-0.5 p-0.5"
                style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-sm)',
                }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-sm font-medium transition-colors"
                            style={{
                                borderRadius: 'calc(var(--radius-sm) - 2px)',
                                background:   isActive ? 'rgba(201,165,42,0.12)' : 'transparent',
                                color:        isActive ? 'var(--amoled-gold)' : 'var(--amoled-muted)',
                                borderBottom: isActive ? `2px solid var(--amoled-gold)` : '2px solid transparent',
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
                        className="w-8 h-8 transition-colors"
                        style={{ color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amoled-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amoled-muted)')}
                        onClick={() => window.open(item.href, '_blank')}
                    >
                        {item.icon}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Contato"
                    className="w-8 h-8 transition-colors"
                    style={{ color: 'var(--amoled-muted)', borderRadius: 'var(--radius-sm)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--amoled-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--amoled-muted)')}
                    onClick={() => setActiveTab('contact')}
                >
                    <Mail className="w-4 h-4" />
                </Button>
                <div className="w-px h-5 mx-1" style={{ background: 'var(--amoled-border)' }} />
                <LanguageSwitcher />
            </div>
        </header>
    )
}
