"use client"

import Image from "next/image"
import { MapPin, Calendar, Mail, Phone, Download, Code, Database, Smartphone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProfileView() {
  const skills = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS",
      level: 95,
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Backend Development",
      description: "Node.js, Python, PostgreSQL, MongoDB",
      level: 88,
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Development",
      description: "React Native, Flutter, iOS, Android",
      level: 82,
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "DevOps & Cloud",
      description: "Docker, AWS, Vercel, CI/CD",
      level: 75,
    },
  ]

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      period: "2022 - Presente",
      description: "Desenvolvimento de aplicações web e mobile usando React, Node.js e cloud services.",
      current: true,
    },
    {
      title: "Frontend Developer",
      company: "Startup Inc",
      period: "2020 - 2022",
      description: "Criação de interfaces modernas e responsivas com foco na experiência do usuário.",
    },
    {
      title: "Junior Developer",
      company: "Dev Agency",
      period: "2019 - 2020",
      description: "Desenvolvimento de websites e aplicações web para diversos clientes.",
    },
  ]

  return (
      <div className="h-full overflow-y-auto bg-gray-950">
        {/* Hero Section */}
        <div className="relative bg-gray-900 border-b border-gray-800 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-700">
                  <Image
                      src="/placeholder.svg?height=128&width=128&text=Sua+Foto"
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>

              {/* Profile Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">Seu Nome</h1>
                <p className="text-blue-400 text-xl mb-4">Desenvolvedor Full Stack</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>São Paulo, Brasil</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>5+ anos de experiência</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Entrar em contato
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* About */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Sobre mim</h2>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Sou um desenvolvedor full stack apaixonado por criar soluções inovadoras e experiências digitais
                  excepcionais. Com mais de 5 anos de experiência, tenho trabalhado em projetos diversos, desde startups
                  até grandes empresas.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Minha expertise inclui desenvolvimento frontend com React e Next.js, backend com Node.js e Python, além
                  de experiência em desenvolvimento mobile e DevOps. Sempre busco aprender novas tecnologias e aplicar as
                  melhores práticas em meus projetos.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Quando não estou codando, gosto de contribuir para projetos open source, escrever artigos técnicos e
                  participar de eventos da comunidade de desenvolvedores.
                </p>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Habilidades técnicas</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                    <div
                        key={skill.title}
                        className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                          {skill.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{skill.title}</h3>
                          <p className="text-gray-400 text-sm">{skill.description}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Proficiência</span>
                          <span className="text-white">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div className="h-2 rounded-full bg-blue-600" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Experiência profissional</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                    <div
                        key={index}
                        className={`rounded-lg p-6 border transition-colors ${
                            exp.current
                                ? "bg-blue-600/10 border-blue-600/30"
                                : "bg-gray-900 border-gray-800 hover:border-gray-700"
                        }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                          <p className="text-blue-400 font-medium">{exp.company}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2 md:mt-0">
                          <span className="text-gray-400 text-sm">{exp.period}</span>
                          {exp.current && <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Atual</span>}
                        </div>
                      </div>
                      <p className="text-gray-300">{exp.description}</p>
                    </div>
                ))}
              </div>
            </section>

            {/* Contact Info */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-6">Informações de contato</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <p className="text-gray-300">seu.email@exemplo.com</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Telefone</h3>
                      <p className="text-gray-300">+55 (11) 99999-9999</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
  )
}
