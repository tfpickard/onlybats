'use client'

import { useEffect, useState } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function KonamiListener() {
  const [keys, setKeys] = useState<string[]>([])
  const [ultrasonicMode, setUltrasonicMode] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-10)

        // Check if konami code is complete
        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          setUltrasonicMode(true)
          setTimeout(() => setUltrasonicMode(false), 10000) // 10 seconds
          return []
        }

        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!ultrasonicMode) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Purple sonar waves */}
      <div className="absolute inset-0 bg-gradient-radial from-bat-primary/30 to-transparent animate-sonar-pulse" />

      {/* Message overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-6xl font-bold text-bat-glow animate-pulse bat-glow">
          ULTRASONIC MODE
        </div>
        <div className="text-2xl text-bat-secondary mt-4">
          🦇 ECHOLOCATION ENHANCED 🦇
        </div>
      </div>

      {/* Floating bat emojis */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-flap"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.7,
            }}
          >
            🦇
          </div>
        ))}
      </div>
    </div>
  )
}
