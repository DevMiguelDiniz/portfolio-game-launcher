// app/components/Header.tsx
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

export default function Header({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: HeaderProps) {
    const { t } = useLanguage()

    const tabs = [
        { id: "projects" as TabType, label: t('nav.projects'), icon: <FolderOpen className="w-4 h-4" /> },
        { id: "profile" as TabType, label: t('nav.profile'), icon: <User className="w-4 h-4" /> },
        { id: "achievements" as TabType, label: t('nav.achievements'), icon: <Trophy className="w-4 h-4" /> },
        { id: "contact" as TabType, label: t('nav.contact'), icon: <MessageCircle className="w-4 h-4" /> },
    ]

    return (
        <header className="h-16 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 border-b border-gray-800/50 flex items-center justify-between px-4 lg:px-6 backdrop-blur-sm">
            {/* Left Section */}
            <div className="flex items-center space-x-3">
                {/* Mobile Menu Button */}
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-xl transition-all duration-300 hover:scale-105"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                )}

                {/* Logo */}
                <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center border-2 border-gray-700/50 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/25 hover-lift">
                        <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-white font-semibold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Portfolio
                        </span>
                        <div className="text-xs text-gray-400 font-mono">v2.0 Steam Edition</div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center space-x-1 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-1 border border-gray-700/50">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 group overflow-hidden ${
                            activeTab === tab.id
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500/50"
                                : "text-gray-400 hover:text-white hover:bg-gray-700/60 border border-transparent hover:border-gray-600/50"
                        }`}
                        style={{
                            animationDelay: `${index * 100}ms`
                        }}
                    >
                        {/* Background glow effect */}
                        {activeTab === tab.id && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
                        )}

                        {/* Shimmer effect on hover */}
                        {activeTab !== tab.id && (
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                            </div>
                        )}

                        <div className="relative z-10 flex items-center space-x-2">
                            <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'}`}>
                                {tab.icon}
                            </div>
                            <span className="hidden sm:block text-sm lg:text-base font-medium">
                                {tab.label}
                            </span>
                        </div>

                        {/* Active indicator */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-white rounded-full animate-pulse"></div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Social Links and Language Switcher */}
            <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800/60 w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105 steam-glow group"
                    onClick={() => window.open('https://github.com/DevMiguelDiniz', '_blank')}
                >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800/60 w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105 steam-glow group"
                    onClick={() => window.open('https://linkedin.com/in/miguel-diniz', '_blank')}
                >
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800/60 w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105 steam-glow group"
                    onClick={() => setActiveTab('contact')}
                >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" />
                </Button>
                <div className="w-px h-6 bg-gray-700/50 mx-1"></div>
                <LanguageSwitcher />
            </div>
        </header>
    )
}