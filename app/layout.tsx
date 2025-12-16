import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import KonamiListener from '@/components/KonamiListener'
import LogoClickListener from '@/components/LogoClickListener'

export const metadata: Metadata = {
  title: 'OnlyBats.org - No Capes. No Billionaires. Just Bats.',
  description: 'Independent from Big Bat and their anti-bat agenda. A grassroots community dedicated to bats and only bats.',
  keywords: ['bats', 'chiroptera', 'echolocation', 'guano', 'cave', 'community'],
  authors: [{ name: 'OnlyBats Community' }],
  openGraph: {
    title: 'OnlyBats.org',
    description: 'No Capes. No Billionaires. Just Bats.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cave-darkest cave-texture">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <KonamiListener />
        <LogoClickListener />
      </body>
    </html>
  )
}
