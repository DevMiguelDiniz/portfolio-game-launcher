"use client"

import { useState, useEffect } from "react"
import SplashScreen from "./components/SplashScreen"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import ProjectsView from "./components/ProjectsView"
import ProfileView from "./components/ProfileView"
import ContactView from "./components/ContactView"
import AchievementsView from "./components/AchievementsView"

export type TabType = "projects" | "profile" | "contact" | "achievements"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("projects")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectsView selectedProject={selectedProject} />
      case "profile":
        return <ProfileView />
      case "contact":
        return <ContactView />
      case "achievements":
        return <AchievementsView />
      default:
        return <ProjectsView selectedProject={selectedProject} />
    }
  }

  if (isLoading) {
    return <SplashScreen />
  }

  return (
      <div className="min-h-screen bg-gray-950 animate-fade-in">
        <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
        />

        <div className="flex h-[calc(100vh-64px)] relative">
          {activeTab === "projects" && (
              <>
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Sidebar */}
                <div
                    className={`
              fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
              transform transition-transform duration-300 ease-in-out lg:transform-none
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
                >
                  <Sidebar
                      selectedProject={selectedProject}
                      setSelectedProject={setSelectedProject}
                      onProjectSelect={() => setSidebarOpen(false)}
                  />
                </div>
              </>
          )}

          <main className={`flex-1 overflow-y-auto ${activeTab === "projects" ? "" : "w-full"}`}>{renderContent()}</main>
        </div>
      </div>
  )
}
