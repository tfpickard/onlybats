'use client'

import { useEffect, useState } from 'react'
import { createRealtimeAdapter, type RealtimeAdapter } from '@/lib/realtimeAdapter'

export default function LiveStatus() {
  const [viewerCount, setViewerCount] = useState(0)
  const [whispers, setWhispers] = useState<string[]>([])
  const [adapter, setAdapter] = useState<RealtimeAdapter | null>(null)

  useEffect(() => {
    const realtimeAdapter = createRealtimeAdapter()

    realtimeAdapter.onViewerCountUpdate((count) => {
      setViewerCount(count)
    })

    realtimeAdapter.onWhisperReceived((whisper) => {
      setWhispers((prev) => [...prev.slice(-19), whisper])
    })

    realtimeAdapter.connect()
    setAdapter(realtimeAdapter)

    return () => {
      realtimeAdapter.disconnect()
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start justify-center">
      {/* Colony Live */}
      <div className="bg-cave-dark border border-bat-primary rounded-lg px-6 py-4 min-w-[200px]">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 animate-pulse text-2xl">●</span>
          <div>
            <div className="text-bat-secondary text-sm font-medium">Colony Live</div>
            <div className="text-2xl font-bold text-bat-glow">{viewerCount} bats</div>
          </div>
        </div>
      </div>

      {/* Cave Whispers */}
      <div className="bg-cave-dark border border-bat-secondary rounded-lg px-6 py-4 flex-1 max-w-2xl">
        <div className="text-bat-secondary text-sm font-medium mb-2">Cave Whispers</div>
        <div className="h-20 overflow-y-auto space-y-1 text-xs text-gray-400">
          {whispers.length === 0 ? (
            <div className="italic">The cave is quiet...</div>
          ) : (
            whispers.slice(-5).map((whisper, i) => (
              <div key={i} className="opacity-80 hover:opacity-100 transition-opacity">
                🦇 {whisper}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
