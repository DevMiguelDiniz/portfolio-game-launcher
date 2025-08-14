"use client"

import { projects } from '../data/projects'
import ProjectDetail from './ProjectDetail'
import ProjectsWelcome from './ProjectsWelcome'

interface ProjectsViewProps {
  selectedProject: string | null
}

export default function ProjectsView({ selectedProject }: ProjectsViewProps) {
  const project = selectedProject ? projects.find(p => p.id === selectedProject) : null

  return (
    <div className="h-full">
      {project ? (
        <ProjectDetail project={project} />
      ) : (
        <ProjectsWelcome />
      )}
    </div>
  )
}
