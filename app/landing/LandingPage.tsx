import Image from 'next/image'
import Link from 'next/link'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { projects } from '../data/projects'
import CVButton from './CVButton'

const STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'Flutter', 'PostgreSQL', 'Docker', 'SpringBoot',
]

export default function LandingPage() {
  const totalProjects = projects.length
  const uniqueTechs = [...new Set(projects.flatMap((p) => p.technologies))].length

  const stats = [
    { value: String(totalProjects), label: 'PROJETOS' },
    { value: `${uniqueTechs}+`,     label: 'TECHS' },
    { value: '2+',                  label: 'ANOS' },
    { value: '5+',                  label: 'CERTS' },
  ]

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-8"
      style={{ background: '#000000' }}
    >
      {/* Background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,165,42,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="w-full relative flex flex-col" style={{ maxWidth: '640px', gap: '12px' }}>

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-1">
          <div
            className="w-7 h-7 flex items-center justify-center font-bold text-sm"
            style={{ background: 'var(--amoled-gold)', borderRadius: 'var(--radius-sm)', color: '#000' }}
          >
            P
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DevMiguelDiniz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-yellow-500"
              style={{ color: '#3a3a3a' }}
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/miguel-diniz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-yellow-500"
              style={{ color: '#3a3a3a' }}
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <Link
              href="/app"
              className="flex items-center gap-1.5 text-xs transition-colors hover:text-yellow-500"
              style={{ color: '#3a3a3a' }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Contato</span>
            </Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <div
          className="glass-gold flex items-center gap-5 p-6 sm:p-7"
          style={{ borderRadius: 'var(--radius-xl)' }}
        >
          <div
            className="overflow-hidden flex-shrink-0 border-2"
            style={{
              width: 'clamp(60px, 10vw, 80px)',
              height: 'clamp(60px, 10vw, 80px)',
              borderRadius: '20px',
              borderColor: 'rgba(201,165,42,0.4)',
              boxShadow: '0 0 24px rgba(201,165,42,0.15)',
            }}
          >
            <Image
              src="/Miguel.jpg"
              alt="Miguel Diniz"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1
              className="font-extrabold mb-1 leading-tight"
              style={{
                fontSize: 'clamp(20px, 4vw, 26px)',
                letterSpacing: '-0.03em',
                color: 'var(--amoled-text)',
              }}
            >
              Miguel Diniz
            </h1>
            <p
              className="font-semibold mb-3"
              style={{ fontSize: '14px', color: 'var(--amoled-gold)' }}
            >
              Full Stack Developer
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="glass-surface flex items-center gap-1.5 px-2.5 py-1 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-green-text)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--amoled-green-text)' }}
                />
                Disponível
              </span>
              <span
                className="glass-surface px-2.5 py-1 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
              >
                📍 Belo Horizonte
              </span>
              <span
                className="glass-surface px-2.5 py-1 text-xs"
                style={{ borderRadius: 'var(--radius-sm)', color: 'var(--amoled-muted)' }}
              >
                🎓 PUC Minas
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel text-center p-3"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <div
                className="font-extrabold"
                style={{ fontSize: '20px', color: 'var(--amoled-gold)', letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </div>
              <div
                className="mt-0.5 uppercase tracking-wider"
                style={{ fontSize: '9px', color: 'var(--amoled-muted)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Experiência ── */}
        <div className="glass-panel p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <p
            className="uppercase tracking-widest mb-3"
            style={{ fontSize: '10px', color: 'var(--amoled-muted)' }}
          >
            Experiência
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: 'var(--amoled-gold)',
                boxShadow: '0 0 8px rgba(201,165,42,0.5)',
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: 'var(--amoled-text)' }}>
                Estágio Full Stack — JdsDev
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--amoled-muted)' }}>
                React · Next.js · SpringBoot · 2025 – presente
              </p>
            </div>
            <span
              className="flex-shrink-0 text-xs px-2 py-0.5"
              style={{
                background: 'rgba(164,208,7,0.1)',
                border: '1px solid rgba(164,208,7,0.2)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--amoled-green-text)',
              }}
            >
              Atual
            </span>
          </div>
        </div>

        {/* ── Stack ── */}
        <div className="glass-panel p-5" style={{ borderRadius: 'var(--radius-lg)' }}>
          <p
            className="uppercase tracking-widest mb-3"
            style={{ fontSize: '10px', color: 'var(--amoled-muted)' }}
          >
            Stack Principal
          </p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((tech) => (
              <span key={tech} className="steam-tag">{tech}</span>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex gap-2.5">
          <Link
            href="/app"
            className="steam-btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
            style={{
              borderRadius: 'var(--radius-md)',
              padding: '14px 24px',
              boxShadow: '0 4px 20px rgba(201,165,42,0.3)',
            }}
          >
            Acessar Portfolio <span aria-hidden>→</span>
          </Link>
          <CVButton />
        </div>

        {/* ── Footer ── */}
        <p
          className="text-center"
          style={{
            fontSize: '10px',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            color: '#2a2a2a',
            letterSpacing: '0.05em',
          }}
        >
          portfolio v2.0 · apple glass edition · next.js 15
        </p>

      </div>
    </div>
  )
}
