"use client"

import { Github, Linkedin, Mail, User, FolderOpen, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TabType } from '../page'

interface HeaderProps {
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
    const tabs = [
        { id: 'projects' as TabType, label: 'Projetos', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'profile' as TabType, label: 'Perfil', icon: <User className="w-4 h-4" /> },
        { id: 'contact' as TabType, label: 'Contato', icon: <MessageCircle className="w-4 h-4" /> },
    ]

    return (
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                    <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-white font-semibold text-lg">Portfolio</span>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center space-x-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-gray-800 text-white border border-gray-700'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        {tab.icon}
                        <span className="hidden md:block">{tab.label}</span>
                    </button>
                ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <Github className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                    <Mail className="w-4 h-4" />
                </Button>
            </div>
        </header>
    )
}
