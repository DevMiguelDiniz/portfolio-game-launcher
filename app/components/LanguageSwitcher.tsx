"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-gray-800/60 w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105 steam-glow group relative overflow-hidden"
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                    </div>

                    <Languages className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12 relative z-10" />
                    <span className="sr-only">Change language</span>

                    {/* Language indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                            {language.toUpperCase()}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="bg-gray-900/95 backdrop-blur-sm border-gray-700/50 rounded-xl p-1 shadow-2xl shadow-black/50 min-w-[160px]"
            >
                <DropdownMenuItem
                    onClick={() => setLanguage('pt')}
                    className={`cursor-pointer rounded-lg m-1 p-3 transition-all duration-300 hover:bg-gray-800/60 group ${
                        language === 'pt'
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                            : 'text-gray-300 hover:text-white'
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">🇧🇷</span>
                        <div className="flex-1">
                            <div className="font-medium">Português</div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300">Brasil</div>
                        </div>
                        {language === 'pt' && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                    </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className={`cursor-pointer rounded-lg m-1 p-3 transition-all duration-300 hover:bg-gray-800/60 group ${
                        language === 'en'
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                            : 'text-gray-300 hover:text-white'
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">🇺🇸</span>
                        <div className="flex-1">
                            <div className="font-medium">English</div>
                            <div className="text-xs text-gray-400 group-hover:text-gray-300">United States</div>
                        </div>
                        {language === 'en' && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        )}
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}