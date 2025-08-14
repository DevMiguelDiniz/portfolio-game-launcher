import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio Steam - Desenvolvedor Full Stack',
  description: 'Portfolio profissional minimalista inspirado na Steam, showcasing projetos de desenvolvimento web, mobile e full stack com design escuro e elegante.',
  keywords: 'desenvolvedor, full stack, react, nextjs, nodejs, portfolio, web development, steam, minimalista',
  authors: [{ name: 'Seu Nome' }],
  creator: 'Seu Nome',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://seu-portfolio.vercel.app',
    title: 'Portfolio Steam - Desenvolvedor Full Stack',
    description: 'Portfolio profissional minimalista inspirado na Steam com design escuro e elegante.',
    siteName: 'Portfolio Steam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Steam - Desenvolvedor Full Stack',
    description: 'Portfolio profissional minimalista inspirado na Steam com design escuro e elegante.',
    creator: '@seuusuario',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
      {children}
      </body>
      </html>
  )
}
