'use client'

import { useState, useEffect, useMemo } from 'react'
import { type BatFact, getAllFacts, getRandomFacts } from '@/lib/batFacts'

export default function BatFactsPage() {
  const [confidenceLevel, setConfidenceLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [displayMode, setDisplayMode] = useState<'random' | 'all'>('random')
  const [randomCount, setRandomCount] = useState(20)
  const [refreshKey, setRefreshKey] = useState(0)

  // Get facts based on display mode
  const displayedFacts = useMemo(() => {
    if (displayMode === 'all') {
      return getAllFacts()
    }
    return getRandomFacts(randomCount)
  }, [displayMode, randomCount, refreshKey])

  const totalFactCount = getAllFacts().length

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Bat Facts
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Earnest but intentionally unhelpful information about bats.
          </p>
          <p className="text-sm text-bat-secondary">
            {totalFactCount} community-verified facts available
          </p>
        </div>

        {/* Display Mode Controls */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setDisplayMode('random')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  displayMode === 'random'
                    ? 'bg-bat-primary text-white'
                    : 'bg-cave-medium text-gray-400 hover:bg-cave-light border border-cave-light'
                }`}
              >
                Random Selection
              </button>
              <button
                onClick={() => setDisplayMode('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  displayMode === 'all'
                    ? 'bg-bat-primary text-white'
                    : 'bg-cave-medium text-gray-400 hover:bg-cave-light border border-cave-light'
                }`}
              >
                Show All ({totalFactCount})
              </button>
            </div>

            {displayMode === 'random' && (
              <div className="flex gap-3 items-center">
                <label className="text-sm text-gray-400">
                  Facts to display:
                  <input
                    type="number"
                    min="5"
                    max={totalFactCount}
                    value={randomCount}
                    onChange={(e) => setRandomCount(Math.min(totalFactCount, Math.max(5, parseInt(e.target.value) || 5)))}
                    className="ml-2 w-20 px-3 py-1 bg-cave-medium border border-cave-light rounded text-gray-300 focus:border-bat-primary focus:outline-none"
                  />
                </label>
                <button
                  onClick={() => setRefreshKey(k => k + 1)}
                  className="px-4 py-2 bg-bat-secondary hover:bg-bat-primary text-white rounded-lg transition-colors text-sm font-medium"
                >
                  🔄 Shuffle
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Fact Quality Slider */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6 mb-8">
          <h3 className="text-bat-secondary font-bold mb-4">Fact Quality Slider</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Uncertain</span>
              <span>Confident</span>
              <span>EXTREMELY Confident</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              value={confidenceLevel === 'low' ? 0 : confidenceLevel === 'medium' ? 1 : 2}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                setConfidenceLevel(val === 0 ? 'low' : val === 1 ? 'medium' : 'high')
              }}
              className="w-full"
            />
            <div className="text-center text-bat-glow font-medium">
              Current tone: {confidenceLevel.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Facts */}
        <div className="space-y-6 mb-12">
          {displayedFacts.map((item, i) => (
            <div
              key={i}
              className="bg-cave-dark border border-bat-secondary rounded-lg p-6 hover:border-bat-primary transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🦇</div>
                <div className="flex-1">
                  <h3 className="text-bat-secondary font-bold mb-2">Fact #{i + 1}</h3>
                  <p className="text-gray-300 text-lg">{item.confidence[confidenceLevel]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Poser Watch Sidebar */}
        <div className="bg-cave-darkest border-2 border-yellow-600 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400 text-2xl">🔭</span>
            <h3 className="text-yellow-400 font-bold text-xl">POSER WATCH</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-400">
            <p>
              <strong className="text-yellow-300">Status:</strong> ACTIVE
            </p>
            <p>
              Recent sighting: A cape-wearing influencer was spotted claiming to understand "bat symbolism"
              while providing zero actual bat facts.
            </p>
            <p>
              <strong className="text-yellow-300">Reminder:</strong> Real bat work doesn't require a utility belt.
              Just echolocation and community support.
            </p>
            <p className="pt-4 border-t border-yellow-900">
              <a href="/poser-watch" className="text-bat-secondary hover:text-bat-glow underline">
                Report cape sightings →
              </a>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>All facts are presented in good faith with varying levels of certainty.</p>
          <p className="mt-2">No affiliation with Big Bat or their anti-bat agenda.</p>
        </div>
      </div>
    </div>
  )
}
