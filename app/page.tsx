"use client"

import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProjectsView from './components/ProjectsView'
import ProfileView from './components/ProfileView'
import ContactView from './components/ContactView'

export type TabType = 'projects' | 'profile' | 'contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>('projects')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsView selectedProject={selectedProject} />
      case 'profile':
        return <ProfileView />
      case 'contact':
        return <ContactView />
      default:
        return <ProjectsView selectedProject={selectedProject} />
    }
  }

  if (isLoading) {
    return <SplashScreen />
  }

  return (
      <div className="min-h-screen bg-gray-950 animate-fade-in">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex h-[calc(100vh-64px)]">
          {activeTab === 'projects' && (
              <Sidebar
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
              />
          )}

          <main className={`flex-1 overflow-y-auto ${activeTab === 'projects' ? '' : 'w-full'}`}>
            {renderContent()}
          </main>
        </div>
      </div>
  )
}
