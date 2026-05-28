import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/hooks/use-language'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
    display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
})

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    title: 'Miguel Diniz - Desenvolvedor Full Stack',
    description: 'Portfolio profissional minimalista inspirado na Steam, showcasing projetos de desenvolvimento web, mobile e full stack com design escuro e elegante.',
    keywords: 'desenvolvedor, full stack, react, nextjs, nodejs, portfolio, web development, steam, minimalista',
    authors: [{ name: 'Miguel Diniz' }],
    creator: 'Miguel Diniz',
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://seu-portfolio.vercel.app',
        title: 'Portfolio Steam - Desenvolvedor Full Stack',
        description: 'Portfolio profissional minimalista inspirado na Steam com design escuro e elegante.',
        siteName: 'MiguelDiniz',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio Steam - Desenvolvedor Full Stack',
        description: 'Portfolio profissional minimalista inspirado na Steam com design escuro e elegante.',
        creator: '@DevMiguelDiniz',
    },
    robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
        <body className={`${inter.className} ${jetBrainsMono.variable} antialiased`}>
        <LanguageProvider>
            {children}
        </LanguageProvider>
        </body>
        </html>
    )
}
