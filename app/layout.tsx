import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import ThemeProvider from './theme/theme-provider'
import AppLayout from '@/components/AppContent/AppLayout'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ReadingProvider } from '@/context/ReadingContext'

// Fontes
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-serif',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

// Metadados
export const metadata: Metadata = {
  title: 'Eu-Chingo',
  description: 'Um website para consulta e divinação com I Ching',
  keywords:
    'Hexagramas, I Ching, Filosofia Chinesa, Yin-Yang, Trigramas, Divinação',
  icons: { icon: '/yin-yang.svg' },
}

// Layout principal
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col bg-white dark:bg-stone-900 text-stone-900 dark:text-gray-200 transition-colors font-sans min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ReadingProvider>
              <AppLayout>
                {children}
                <SpeedInsights />
              </AppLayout>
            </ReadingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
