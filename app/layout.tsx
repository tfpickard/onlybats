import type { Metadata } from 'next'
import Script from 'next/script'
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
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          src="https://plausible.io/js/pa-0b2wtQMmeOhV79t9HTkSH.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
            plausible.init()
          `}
        </Script>

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
