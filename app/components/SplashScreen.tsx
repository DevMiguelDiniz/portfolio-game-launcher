"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Code, Zap, Monitor } from 'lucide-react'

export default function SplashScreen() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState('')
    const [showProfile, setShowProfile] = useState(false)

    const loadingSteps = [
        { text: 'Inicializando sistema...', duration: 800 },
        { text: 'Carregando biblioteca...', duration: 1000 },
        { text: 'Configurando interface...', duration: 700 },
        { text: 'Otimizando performance...', duration: 800 },
        { text: 'Finalizando...', duration: 700 }
    ]

    useEffect(() => {
        const profileTimer = setTimeout(() => setShowProfile(true), 500)

        let currentProgress = 0
        let stepIndex = 0

        const updateProgress = () => {
            if (stepIndex < loadingSteps.length) {
                const step = loadingSteps[stepIndex]
                setCurrentStep(step.text)

                const stepProgress = 100 / loadingSteps.length
                const targetProgress = (stepIndex + 1) * stepProgress

                const progressInterval = setInterval(() => {
                    currentProgress += 2
                    setProgress(Math.min(currentProgress, targetProgress))

                    if (currentProgress >= targetProgress) {
                        clearInterval(progressInterval)
                        stepIndex++

                        setTimeout(() => {
                            if (stepIndex < loadingSteps.length) {
                                updateProgress()
                            }
                        }, 150)
                    }
                }, step.duration / (stepProgress / 2))
            }
        }

        const startTimer = setTimeout(updateProgress, 1000)

        return () => {
            clearTimeout(profileTimer)
            clearTimeout(startTimer)
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30" />
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-float opacity-30" />
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-float-delayed opacity-20" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" />
            </div>

            {/* Floating icons */}
            <div className="absolute inset-0 overflow-hidden">
                <Code className="absolute top-20 left-20 w-6 h-6 text-blue-400/40 animate-float" />
                <Zap className="absolute top-40 right-32 w-5 h-5 text-purple-400/40 animate-float-delayed" />
                <Monitor className="absolute bottom-32 left-40 w-7 h-7 text-cyan-400/40 animate-float" />
                <div className="absolute top-60 right-60 w-4 h-4 bg-blue-400/30 rounded-full animate-float" />
                <div className="absolute bottom-60 left-60 w-3 h-3 bg-purple-400/30 rounded-full animate-float-delayed" />
            </div>

            <div className="text-center z-10 max-w-md w-full px-8">
                {/* Logo */}
                <div className="mb-8 animate-bounce-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border-4 border-gray-700/50 shadow-2xl shadow-blue-500/25 steam-glow-strong">
                        <span className="text-white font-bold text-2xl">P</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Portfolio
                    </h1>
                    <p className="text-gray-400 text-sm font-mono tracking-wide">
                        Desenvolvedor Full Stack
                    </p>
                </div>

                {/* Profile Photo */}
                <div className={`mb-8 transition-all duration-1000 ${
                    showProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                    <div className="relative w-32 h-32 mx-auto">
                        {/* Animated rings */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse opacity-60 animate-glow-pulse"></div>
                        <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
                        <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-gray-700/50">
                            <Image
                                src="/placeholder.svg?height=120&width=120&text=Sua+Foto"
                                alt="Profile"
                                width={120}
                                height={120}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>

                        {/* Floating particles around profile */}
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
                        <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-white">Bem-vindo</h2>
                        <p className="text-gray-400 text-sm">Carregando experiência...</p>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-400 text-sm font-medium">Progresso</span>
                        <span className="text-blue-400 text-sm font-mono bg-blue-600/20 px-2 py-1 rounded-lg">
                {Math.round(progress)}%
              </span>
                    </div>

                    <div className="w-full bg-gray-800/60 rounded-full h-3 overflow-hidden border border-gray-700/50 backdrop-blur-sm">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-80"></div>
                        </div>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="mb-8">
                    <p className="text-gray-300 text-sm h-6 transition-all duration-300 font-medium">
                        {currentStep}
                    </p>
                </div>

                {/* Loading Dots */}
                <div className="flex justify-center space-x-2 mb-8">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        />
                    ))}
                </div>

                {/* Version Info */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-800/50">
                        <p className="text-gray-500 text-xs font-mono">
                            Portfolio v2.0 • Next.js 15 • Steam Edition
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}