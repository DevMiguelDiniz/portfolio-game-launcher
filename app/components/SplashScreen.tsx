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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden">
          <Code className="absolute top-20 left-20 w-6 h-6 text-gray-700 animate-float" />
          <Zap className="absolute top-40 right-32 w-5 h-5 text-gray-700 animate-float-delayed" />
          <Monitor className="absolute bottom-32 left-40 w-7 h-7 text-gray-700 animate-float" />
        </div>

        <div className="text-center z-10 max-w-md w-full px-8">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-gray-400 text-sm">Desenvolvedor Full Stack</p>
          </div>

          {/* Profile Photo */}
          <div className={`mb-8 transition-all duration-1000 ${
              showProfile ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center">
                <Image
                    src="/placeholder.svg?height=120&width=120&text=Sua+Foto"
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-white">Bem-vindo</h2>
              <p className="text-gray-400 text-sm">Carregando experiência...</p>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Progresso</span>
              <span className="text-blue-400 text-sm font-mono">{Math.round(progress)}%</span>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-700">
              <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-8">
            <p className="text-gray-300 text-sm h-5 transition-all duration-300">
              {currentStep}
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* Version Info */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <p className="text-gray-500 text-xs">
              Portfolio v2.0 • Next.js 15 • Steam Edition
            </p>
          </div>
        </div>
      </div>
  )
}
