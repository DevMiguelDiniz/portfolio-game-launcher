import type { Metadata } from 'next'
import { Source_Code_Pro } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/hooks/use-language'
import {Orbitron} from "next/font/google";
import {Share_Tech_Mono} from "next/font/google";
import {JetBrains_Mono} from "next/font/google";

const sourceCodePro = Source_Code_Pro({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // Todos os pesos disponíveis
    style: ['normal', 'italic'], // Normal e itálico
    variable: '--font-source-code-pro', // Variável CSS personalizada
    display: 'swap', // Otimização de carregamento
})

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'], // Todos os pesos disponíveis
    style: ['normal'], // Normal
    variable: '--font-orbitron', // Variável CSS personalizada
    display: 'swap', // Otimização de carregamento
})

const shareTechMono = Share_Tech_Mono({
    subsets: ['latin'],
    weight: ["400"], // Todos os pesos disponíveis
    style: ['normal'], // Normal
    variable: '--font-share-tech-mono', // Variável CSS personalizada
    display: 'swap', // Otimização de carregamento
})

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // Pesos mais comuns
    style: ['normal', 'italic'], // Normal e itálico
    variable: '--font-jetbrains-mono', // Variável CSS personalizada
    display: 'swap', // Otimização de carregamento
})

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
        <body className={`${jetBrainsMono.className} antialiased`}>
        <LanguageProvider>
            {children}
        </LanguageProvider>
        </body>
        </html>
    )
}