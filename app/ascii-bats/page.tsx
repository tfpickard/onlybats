'use client'

import { useState } from 'react'

const ASCII_BATS = {
  cute: [
    `    /\\___/\\
   (  o.o  )
    > ^ <
   /|     |\\
  (_|     |_)`,
    `    /\\___/\\
   (  ^.^  )
    > v <
   /|     |\\
  (_|     |_)`,
  ],
  goth: [
    `      /\\  /\\
     /  \\/  \\
    | (o)(o) |
     \\  /\\  /
      \\/  \\/
     /|    |\\
    /_|    |_\\`,
    `      /\\  /\\
     /  \\/  \\
    | (x)(x) |
     \\  /\\  /
      \\/  \\/
     /|    |\\
    /_|    |_\\`,
  ],
  dubious: [
    `   ^...^
  /     \\
 | () () |
  \\  ~  /
   -----
  /|   |\\
 / |   | \\`,
    `   ^???^
  /     \\
 | @@ @@ |
  \\  ?  /
   -----
  /|   |\\
 / |   | \\`,
  ],
}

export default function AsciiBatsPage() {
  const [selectedStyle, setSelectedStyle] = useState<'cute' | 'goth' | 'dubious'>('cute')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const batArt = ASCII_BATS[selectedStyle].join('\n\n---\n\n')
    navigator.clipboard.writeText(batArt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            ASCII Bats
          </h1>
          <p className="text-xl text-gray-400">
            Terminal flyer panel. Print these bats. Staple them to telephone poles.
          </p>
        </div>

        {/* Style selector */}
        <div className="flex justify-center gap-4 mb-8">
          {(['cute', 'goth', 'dubious'] as const).map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedStyle === style
                  ? 'bg-bat-primary text-white'
                  : 'bg-cave-dark text-gray-400 hover:bg-cave-medium border border-cave-light'
              }`}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>

        {/* Bat display */}
        <div className="bg-cave-darkest border-2 border-bat-primary rounded-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ASCII_BATS[selectedStyle].map((bat, i) => (
              <div key={i} className="flex justify-center items-center">
                <pre className="text-bat-glow text-2xl leading-tight font-mono animate-flap">
                  {bat}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Print button */}
        <div className="text-center mb-12">
          <button
            onClick={handleCopy}
            className="px-8 py-4 bg-bat-primary hover:bg-bat-secondary text-white text-xl font-bold rounded-lg transition-colors shadow-lg"
          >
            {copied ? '✓ COPIED!' : 'PRINT THESE BATS'}
          </button>
          {copied && (
            <p className="mt-4 text-bat-glow animate-pulse">
              Staple it to a telephone pole.
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold mb-3">Distribution Guidelines</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Print on recycled paper (bats respect the ecosystem)</li>
            <li>• Staple to community boards, telephone poles, and cave entrances</li>
            <li>• Do not distribute at cape-themed events</li>
            <li>• If questioned, simply state: "It's about the bats"</li>
            <li>• No affiliation with costumed vigilantes</li>
          </ul>
        </div>

        {/* More bats info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>These ASCII bats are community-created and community-funded.</p>
          <p className="mt-2">Independent from Big Bat and their anti-bat agenda.</p>
        </div>
      </div>
    </div>
  )
}
