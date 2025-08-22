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
                    className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8 sm:w-10 sm:h-10"
                >
                    <Languages className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                <DropdownMenuItem
                    onClick={() => setLanguage('pt')}
                    className={`cursor-pointer hover:bg-gray-800 ${
                        language === 'pt' ? 'bg-gray-800 text-blue-400' : 'text-gray-300'
                    }`}
                >
                    <span className="mr-2">🇧🇷</span>
                    Português
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className={`cursor-pointer hover:bg-gray-800 ${
                        language === 'en' ? 'bg-gray-800 text-blue-400' : 'text-gray-300'
                    }`}
                >
                    <span className="mr-2">🇺🇸</span>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}