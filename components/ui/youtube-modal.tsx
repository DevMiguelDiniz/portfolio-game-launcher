"use client"

import React from 'react'
import { X, Play } from 'lucide-react'
import { Button } from './button'

interface YouTubeModalProps {
    isOpen: boolean
    onClose: () => void
    videoId: string
    title: string
}

export const YouTubeModal: React.FC<YouTubeModalProps> = ({
                                                              isOpen,
                                                              onClose,
                                                              videoId,
                                                              title
                                                          }) => {
    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-4xl bg-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden animate-bounce-in">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-900">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                        <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-110"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* YouTube Player */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1&playsinline=1`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>

                {/* Footer */}
                <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/50">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm">
                            Assistindo demonstração do projeto
                        </p>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            size="sm"
                            className="border-gray-600/50 text-gray-300 hover:bg-gray-800/60 hover:border-gray-500 bg-transparent"
                        >
                            Fechar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const useYouTubeVideoId = (url: string): string | null => {
    if (!url) return null

    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ]

    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) {
            return match[1]
        }
    }

    return null
}