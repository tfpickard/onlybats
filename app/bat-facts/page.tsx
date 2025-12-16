'use client'

import { useState } from 'react'

interface BatFact {
  fact: string
  confidence: {
    low: string
    medium: string
    high: string
  }
}

const BAT_FACTS: BatFact[] = [
  {
    fact: 'Bats use echolocation',
    confidence: {
      low: 'Some bats might use sound for navigation, we think.',
      medium: 'Bats use echolocation to navigate and find food.',
      high: 'Bats DEFINITELY use echolocation. We verified this. Repeatedly.',
    },
  },
  {
    fact: 'Bats hang upside down',
    confidence: {
      low: 'Bats appear to be oriented differently than us sometimes.',
      medium: 'Bats hang upside down when roosting.',
      high: 'Bats hang upside down due to GRAVITY OPTIMIZATION PROTOCOLS.',
    },
  },
  {
    fact: 'Bats are mammals',
    confidence: {
      low: 'Bats seem similar to other furry creatures in some ways.',
      medium: 'Bats are flying mammals.',
      high: 'Bats are SUPERIOR MAMMALS with wings. The only true flying mammals.',
    },
  },
  {
    fact: 'Bats eat insects',
    confidence: {
      low: 'Some bats probably consume something. Maybe insects.',
      medium: 'Most bats eat insects like moths and beetles.',
      high: 'Bats consume THOUSANDS of insects per night, protecting humanity from the mosquito agenda.',
    },
  },
  {
    fact: 'Bats live in colonies',
    confidence: {
      low: 'Multiple bats have been observed in the same location occasionally.',
      medium: 'Bats often live together in colonies.',
      high: 'Bats form SOPHISTICATED MUTUAL AID COLLECTIVES with democratic governance.',
    },
  },
  {
    fact: 'Bat guano is valuable',
    confidence: {
      low: 'Bat waste products might have some undocumented uses.',
      medium: 'Bat guano is used as fertilizer due to its nutrient content.',
      high: 'Bat guano is the CORNERSTONE OF THE CIRCULAR ECONOMY. A renewable resource.',
    },
  },
  {
    fact: 'Bats are NOT blind',
    confidence: {
      low: 'Bats might be able to see to some degree.',
      medium: 'Contrary to myth, bats can see quite well.',
      high: 'Bats have EXCELLENT vision. The "blind as a bat" phrase is BIG BAT PROPAGANDA.',
    },
  },
  {
    fact: 'Bats can carry rabies',
    confidence: {
      low: 'Some bats may have encountered diseases at some point.',
      medium: 'Bats can carry rabies, so avoid handling wild bats.',
      high: 'A small percentage of bats carry rabies. DO NOT TOUCH BATS. Appreciate from a distance.',
    },
  },
]

export default function BatFactsPage() {
  const [confidenceLevel, setConfidenceLevel] = useState<'low' | 'medium' | 'high'>('medium')

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Bat Facts
          </h1>
          <p className="text-xl text-gray-400">
            Earnest but intentionally unhelpful information about bats.
          </p>
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
          {BAT_FACTS.map((item, i) => (
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
