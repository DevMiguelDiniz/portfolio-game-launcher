"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState('')
    const [showProfile, setShowProfile] = useState(false)

    const loadingSteps = [
        { text: 'Inicializando sistema...', duration: 800 },
        { text: 'Carregando biblioteca...', duration: 1000 },
        { text: 'Configurando interface...', duration: 700 },
        { text: 'Otimizando performance...', duration: 800 },
        { text: 'Finalizando...', duration: 700 },
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
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: '#000000' }}
        >
            <div className="text-center z-10 max-w-sm w-full px-8">

                {/* Logo */}
                <div className="mb-8 animate-bounce-in">
                    <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6"
                        style={{ background: '#0d0d0d', border: '1px solid rgba(201,165,42,0.5)' }}
                    >
                        <span className="font-bold text-2xl" style={{ color: '#ffffff' }}>P</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
                        Portfolio
                    </h1>
                    <p
                        className="text-sm tracking-wide"
                        style={{
                            fontFamily: 'var(--font-jetbrains-mono), monospace',
                            color: '#606060',
                        }}
                    >
                        Desenvolvedor Full Stack
                    </p>
                </div>

                {/* Profile Photo */}
                <div
                    className={`mb-8 transition-all duration-1000 ${
                        showProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
                >
                    <div className="relative w-24 h-24 mx-auto">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{ border: '1px solid rgba(201,165,42,0.4)' }}
                        />
                        <div
                            className="absolute inset-1 rounded-full overflow-hidden"
                            style={{ background: '#0d0d0d' }}
                        >
                            <Image
                                src="/placeholder.svg?height=88&width=88&text=Foto"
                                alt="Profile"
                                width={88}
                                height={88}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-1" style={{ color: '#ffffff' }}>
                            Bem-vindo
                        </h2>
                        <p
                            className="text-sm"
                            style={{
                                fontFamily: 'var(--font-jetbrains-mono), monospace',
                                color: '#606060',
                            }}
                        >
                            Carregando experiência...
                        </p>
                    </div>
                </div>

                {/* Loading Bar */}
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className="text-xs truncate mr-3"
                            style={{
                                fontFamily: 'var(--font-jetbrains-mono), monospace',
                                color: '#606060',
                            }}
                        >
                            {currentStep}
                        </span>
                        <span
                            className="text-xs font-mono flex-shrink-0 px-2 py-0.5 rounded"
                            style={{
                                color: '#c9a52a',
                                background: 'rgba(201,165,42,0.08)',
                                border: '1px solid rgba(201,165,42,0.2)',
                            }}
                        >
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div
                        className="w-full h-px rounded-full overflow-hidden"
                        style={{ background: '#1c1c1c' }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%`, background: '#c9a52a' }}
                        />
                    </div>
                </div>

                {/* Version badge */}
                <div className="mt-10">
                    <p
                        className="text-xs font-mono inline-block px-3 py-1 rounded"
                        style={{
                            color: '#606060',
                            background: '#0d0d0d',
                            border: '1px solid #1c1c1c',
                        }}
                    >
                        Portfolio v2.0 • Next.js 15 • AMOLED Edition
                    </p>
                </div>

            </div>
        </div>
    )
}
