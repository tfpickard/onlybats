'use client'

import { useState, useEffect } from 'react'

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
    `   /\\_/\\
  (  ◕‿◕)
   > ω <
  /|   |\\
 (_|   |_)`,
    `    /\\___/\\
   ( ´ ∀ \` )
    > ~ <
   /|     |\\
  (_|     |_)`,
    `   /\\_/\\
  ( •ᴗ• )
   > ◡ <
  /|   |\\
 (_|   |_)`,
    `    /\\___/\\
   (  ✿◠‿◠ )
    > ∇ <
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
    `     /\\  /\\
    /  \\/  \\
   | (●)(●) |
    \\  ▼  /
     \\/  \\/
    /|    |\\
   /_|    |_\\`,
    `      /\\  /\\
     /  \\/  \\
    | (-)(-)  |
     \\  Λ  /
      \\/  \\/
     /|    |\\
    /_|    |_\\`,
    `     /\\  /\\
    /  \\/  \\
   | (◉)(◉) |
    \\  <  /
     \\/  \\/
    /|    |\\
   /_|    |_\\`,
    `      /\\  /\\
     /  \\/  \\
    | (✖)(✖) |
     \\  ~  /
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
    `   ^...^
  /     \\
 | ಠ_ಠ |
  \\  -  /
   -----
  /|   |\\
 / |   | \\`,
    `   ^???^
  /     \\
 | o.O |
  \\  ?  /
   -----
  /|   |\\
 / |   | \\`,
    `   ^...^
  /     \\
 | -.- |
  \\  ~  /
   -----
  /|   |\\
 / |   | \\`,
    `   ^???^
  /     \\
 | O_o |
  \\  ¿  /
   -----
  /|   |\\
 / |   | \\`,
  ],
  flying: [
    `  ^   ^
 /\\   /\\
((o)(o))
 \\  ∇  /
  \\/\\/\\/
  /|  |\\
 / |  | \\`,
    `  ^     ^
 /\\     /\\
((◕)(◕))
 \\   ▽   /
  \\/\\/\\/\\/
  /|    |\\
 / |    | \\`,
    `  ^  ^
 /\\  /\\
((^)(^))
 \\  ~  /
  \\/\\/\\/
  /|  |\\
 / |  | \\`,
    `   ^    ^
  /\\    /\\
 ((•)(•))
  \\  Δ  /
   \\/\\/\\/
   /|  |\\
  / |  | \\`,
    `  ^   ^
 /\\   /\\
((⊙)(⊙))
 \\  ◡  /
  \\/\\/\\/
  /|  |\\
 / |  | \\`,
  ],
  sleeping: [
    `  \\___/
  (zzZ)
   > - <
  /|   |\\
 (_|   |_)`,
    `  \\___/
  (˘ᴗ˘)
   > ~ <
  /|   |\\
 (_|   |_)`,
    `  \\___/
  ( -.- )
   > _ <
  /|   |\\
 (_|   |_)`,
    `  \\___/
  (¬_¬)
   > - <
  /|   |\\
 (_|   |_)`,
  ],
  excited: [
    `    /\\___/\\
   (  O.O  )!!
    > ∀ <
   /|     |\\
  (_|     |_)`,
    `    /\\___/\\
   (  ☆‿☆ )!!
    > ▽ <
   /|     |\\
  (_|     |_)`,
    `    /\\___/\\
   (  @.@  )!!
    > ◡ <
   /|     |\\
  (_|     |_)`,
    `    /\\___/\\
   (  ✧‿✧ )!!
    > ∇ <
   /|     |\\
  (_|     |_)`,
  ],
  derp: [
    `   /\\_/\\
  ( ō_ō)
   > ╹ <
  /|   |\\
 (_|   |_)`,
    `   /\\_/\\
  ( •_•)>⌐■-■
   > ∎ <
  /|   |\\
 (_|   |_)`,
    `   /\\_/\\
  ( ↀДↀ)
   > ≡ <
  /|   |\\
 (_|   |_)`,
    `   /\\_/\\
  ( ͡° ͜ʖ ͡°)
   > ~ <
  /|   |\\
 (_|   |_)`,
    `   /\\_/\\
  ( ಠ ∩ಠ)
   > ▿ <
  /|   |\\
 (_|   |_)`,
  ],
  vampire: [
    `    /\\___/\\
   (  ⊙.⊙ )
    >  v <
   /|     |\\
  (_|     |_)
     V V`,
    `      /\\  /\\
     /  \\/  \\
    | (▼)(▼) |
     \\   ∀   /
      \\/  \\/
     /|    |\\
    /_|    |_\\
      V  V`,
    `   /\\_/\\
  ( ◉‿◉ )
   >  w <
  /|   |\\
 (_|   |_)
    V V`,
    `    /\\___/\\
   (  ◕_◕ )
    > ▼ <
   /|     |\\
  (_|     |_)
     ∀∀`,
  ],
  tiny: [
    `^v^
/|\\`,
    `°v°
/|\\`,
    `^-^
/|\\`,
    `^ω^
/|\\`,
    `^◡^
/|\\`,
    `^∀^
/|\\`,
    `^▽^
/|\\`,
    `^ᴗ^
/|\\`,
  ],
  upside_down: [
    `(_|   |_)
  \\|   |/
   > ^ <
  ( o.o )
   \\___/`,
    `(_|   |_)
  \\|   |/
   > v <
  ( ^.^ )
   \\___/`,
    `(_|   |_)
  \\|   |/
   > ◡ <
  ( •ᴗ• )
   \\___/`,
    `(_|   |_)
  \\|   |/
   > ~ <
  ( ´∀\` )
   \\___/`,
  ],
  dramatic: [
    `      ╱╲
     ╱◉ ◉╲
    ╱  ▼  ╲
   ╱___△___╲
  ╱|       |╲
 ╱_|       |_╲`,
    `      ╱╲
     ╱● ●╲
    ╱  ▽  ╲
   ╱___≡___╲
  ╱|       |╲
 ╱_|       |_╲`,
    `      ╱╲
     ╱⊙ ⊙╲
    ╱  Δ  ╲
   ╱___∇___╲
  ╱|       |╲
 ╱_|       |_╲`,
  ],
}

type BatStyle = keyof typeof ASCII_BATS

// Get all bats from all categories
const ALL_BATS = Object.values(ASCII_BATS).flat()

interface DancingBat {
  id: number
  bat: string
  x: number
  y: number
  rotation: number
  scale: number
  speed: number
  direction: number
}

function DancingBatsDisplay() {
  const [bats, setBats] = useState<DancingBat[]>([])

  useEffect(() => {
    // Initialize 50 random dancing bats
    const initialBats: DancingBat[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      bat: ALL_BATS[Math.floor(Math.random() * ALL_BATS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      speed: 0.5 + Math.random() * 1.5,
      direction: Math.random() * Math.PI * 2,
    }))
    setBats(initialBats)

    // Animate bats
    const interval = setInterval(() => {
      setBats(prevBats =>
        prevBats.map(bat => {
          // Update position
          let newX = bat.x + Math.cos(bat.direction) * bat.speed
          let newY = bat.y + Math.sin(bat.direction) * bat.speed
          let newDirection = bat.direction

          // Bounce off walls
          if (newX < 0 || newX > 100) {
            newDirection = Math.PI - newDirection
            newX = Math.max(0, Math.min(100, newX))
          }
          if (newY < 0 || newY > 100) {
            newDirection = -newDirection
            newY = Math.max(0, Math.min(100, newY))
          }

          // Random direction changes
          if (Math.random() < 0.05) {
            newDirection += (Math.random() - 0.5) * Math.PI / 2
          }

          // Random bat changes
          const newBat = Math.random() < 0.02
            ? ALL_BATS[Math.floor(Math.random() * ALL_BATS.length)]
            : bat.bat

          return {
            ...bat,
            bat: newBat,
            x: newX,
            y: newY,
            direction: newDirection,
            rotation: (bat.rotation + bat.speed * 2) % 360,
          }
        })
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-cave-darkest border-2 border-bat-primary rounded-lg p-4 mb-8 relative overflow-hidden" style={{ height: '600px' }}>
      <div className="absolute inset-0">
        {bats.map(bat => (
          <div
            key={bat.id}
            className="absolute transition-none"
            style={{
              left: `${bat.x}%`,
              top: `${bat.y}%`,
              transform: `translate(-50%, -50%) rotate(${bat.rotation}deg) scale(${bat.scale})`,
              willChange: 'transform',
            }}
          >
            <pre
              className="text-bat-glow leading-tight font-mono text-xs whitespace-pre"
              style={{
                textShadow: '0 0 10px rgba(255, 179, 0, 0.8)',
              }}
            >
              {bat.bat}
            </pre>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-bat-primary text-6xl font-bold opacity-20">
          CHAOS
        </div>
      </div>
    </div>
  )
}

export default function AsciiBatsPage() {
  const [selectedStyle, setSelectedStyle] = useState<BatStyle>('cute')
  const [copied, setCopied] = useState(false)
  const [isDancing, setIsDancing] = useState(false)

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
            Educational ASCII Resources
          </h1>
          <p className="text-xl text-gray-400">
            Text-based chiropteran visual aids for public education and community outreach. Optimized for print distribution and grassroots awareness campaigns.
          </p>
        </div>

        {/* Dancing Mode Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsDancing(!isDancing)}
            className={`px-8 py-4 rounded-lg font-bold text-xl transition-all ${
              isDancing
                ? 'bg-bat-primary text-white shadow-lg shadow-bat-primary/50 animate-pulse'
                : 'bg-cave-dark text-bat-secondary hover:bg-cave-medium border-2 border-bat-primary'
            }`}
          >
            {isDancing ? '🦇 DANCING! 🦇' : 'START BAT DANCE'}
          </button>
        </div>

        {/* Style selector */}
        {!isDancing && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(Object.keys(ASCII_BATS) as BatStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  selectedStyle === style
                    ? 'bg-bat-primary text-white'
                    : 'bg-cave-dark text-gray-400 hover:bg-cave-medium border border-cave-light'
                }`}
              >
                {style.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        )}

        {/* Bat display */}
        {isDancing ? (
          <DancingBatsDisplay />
        ) : (
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
        )}

        {/* Print button */}
        <div className="text-center mb-12">
          <button
            onClick={handleCopy}
            className="px-8 py-4 bg-bat-primary hover:bg-bat-secondary text-white text-xl font-bold rounded-lg transition-colors shadow-lg"
          >
            {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY EDUCATIONAL MATERIALS'}
          </button>
          {copied && (
            <p className="mt-4 text-bat-glow animate-pulse">
              Ready for print distribution to community bulletin boards.
            </p>
          )}
        </div>

        {/* Info */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold mb-3">Public Distribution Protocols</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• Utilize recycled paper stock to align with ecological conservation values</li>
            <li>• Approved posting locations: community bulletin boards, public information kiosks, research facility notice areas</li>
            <li>• Avoid distribution at entertainment industry venues or costume-themed gatherings</li>
            <li>• When questioned by public: "This is educational material about chiropteran conservation"</li>
            <li>• Materials are independent from commercial wildlife entertainment enterprises</li>
          </ul>
        </div>

        {/* More bats info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>All ASCII resources developed through volunteer community collaboration and donor-supported operations.</p>
          <p className="mt-2">OnlyBats maintains financial and organizational independence from corporate media franchises.</p>
        </div>
      </div>
    </div>
  )
}
