"use client"

import { Github, Linkedin, Mail, User, FolderOpen, MessageCircle, Trophy, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TabType } from "../page"

interface HeaderProps {
    activeTab: TabType
    setActiveTab: (tab: TabType) => void
    sidebarOpen?: boolean
    setSidebarOpen?: (open: boolean) => void
}

export default function Header({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: HeaderProps) {
    const tabs = [
        { id: "projects" as TabType, label: "Projetos", icon: <FolderOpen className="w-4 h-4" /> },
        { id: "profile" as TabType, label: "Perfil", icon: <User className="w-4 h-4" /> },
        { id: "achievements" as TabType, label: "Conquistas", icon: <Trophy className="w-4 h-4" /> },
        { id: "contact" as TabType, label: "Contato", icon: <MessageCircle className="w-4 h-4" /> },
    ]

    return (
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-3">
                {/* Mobile Menu Button */}
                {setSidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                )}

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center border border-gray-700">
                        <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <span className="text-white font-semibold text-lg hidden sm:block">Portfolio</span>
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center space-x-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 ${
                            activeTab === tab.id
                                ? "bg-gray-800 text-white border border-gray-700"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                    >
                        {tab.icon}
                        <span className="hidden sm:block text-sm lg:text-base">{tab.label}</span>
                    </button>
                ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center space-x-1 sm:space-x-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8 sm:w-10 sm:h-10"
                >
                    <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8 sm:w-10 sm:h-10"
                >
                    <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8 sm:w-10 sm:h-10"
                >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
            </div>
        </header>
    )
}
