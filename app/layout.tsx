import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Art de Carrelage | Expert en pose de carrelage à Cannes',
  description: 'Art de Carrelage - Votre expert en pose de carrelage, faïence et rénovation intérieure à Cannes. Plus de 10 ans d\'expérience. Devis gratuit.',
  keywords: ['carrelage', 'Cannes', 'pose carrelage', 'faïence', 'rénovation', 'salle de bain', 'terrasse', 'cuisine'],
  authors: [{ name: 'Art de Carrelage' }],
  openGraph: {
    title: 'Art de Carrelage | Expert en pose de carrelage',
    description: 'Pose de carrelage, faïence et rénovation intérieure pour particuliers et professionnels à Cannes.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export const viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
