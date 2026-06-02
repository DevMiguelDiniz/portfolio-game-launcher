import type { Metadata } from 'next'
import LandingPage from './landing/LandingPage'

export const metadata: Metadata = {
  title: 'Miguel Diniz — Full Stack Developer',
  description: 'Portfolio profissional de Miguel Diniz, desenvolvedor Full Stack especializado em React, Next.js, Node.js e Flutter.',
  keywords: 'desenvolvedor, full stack, react, nextjs, nodejs, flutter, portfolio',
  authors: [{ name: 'Miguel Diniz' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Miguel Diniz — Full Stack Developer',
    description: 'Portfolio profissional de Miguel Diniz, desenvolvedor Full Stack especializado em React, Next.js, Node.js e Flutter.',
  },
}

export default function Home() {
  return <LandingPage />
}
