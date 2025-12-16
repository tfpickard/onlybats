'use client'

import { useEffect, useState } from 'react'

export default function GuanoEconomyPage() {
  const [metrics, setMetrics] = useState({
    totalGuano: 0,
    dailyProduction: 0,
    conversionRate: 0,
    marketCap: 0,
  })

  useEffect(() => {
    // Generate nonsense but consistent-looking data
    const interval = setInterval(() => {
      setMetrics({
        totalGuano: Math.floor(Math.random() * 100000) + 500000,
        dailyProduction: Math.floor(Math.random() * 5000) + 10000,
        conversionRate: Math.random() * 0.5 + 0.5,
        marketCap: Math.floor(Math.random() * 10000000) + 50000000,
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            🦇 GUANO ECONOMY DASHBOARD 🦇
          </h1>
          <p className="text-xl text-gray-400">
            Real-time metrics from the circular bat economy
          </p>
          <p className="text-sm text-yellow-400 mt-2">
            (Easter egg unlocked by clicking the logo 13 times)
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-cave-dark border-2 border-bat-primary rounded-lg p-6">
            <div className="text-bat-secondary text-sm font-medium mb-2">Total Guano Reserves</div>
            <div className="text-4xl font-bold text-bat-glow">
              {metrics.totalGuano.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">metric tons</div>
          </div>

          <div className="bg-cave-dark border-2 border-green-600 rounded-lg p-6">
            <div className="text-green-400 text-sm font-medium mb-2">Daily Production</div>
            <div className="text-4xl font-bold text-green-300">
              {metrics.dailyProduction.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">kg/day</div>
          </div>

          <div className="bg-cave-dark border-2 border-yellow-600 rounded-lg p-6">
            <div className="text-yellow-400 text-sm font-medium mb-2">Conversion Rate</div>
            <div className="text-4xl font-bold text-yellow-300">
              {metrics.conversionRate.toFixed(3)}
            </div>
            <div className="text-xs text-gray-500 mt-2">bats per pellet</div>
          </div>

          <div className="bg-cave-dark border-2 border-purple-600 rounded-lg p-6">
            <div className="text-purple-400 text-sm font-medium mb-2">Market Cap</div>
            <div className="text-4xl font-bold text-purple-300">
              ${(metrics.marketCap / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-gray-500 mt-2">theoretical value</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
            <h3 className="text-bat-secondary font-bold mb-4">Production Trends</h3>
            <div className="h-64 flex items-end justify-around space-x-2">
              {[...Array(12)].map((_, i) => {
                const height = Math.random() * 100
                return (
                  <div
                    key={i}
                    className="flex-1 bg-bat-primary rounded-t-lg relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-bat-glow">
                      {Math.floor(height)}%
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>

          <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
            <h3 className="text-bat-secondary font-bold mb-4">Colony Distribution</h3>
            <div className="space-y-4">
              {[
                { name: 'Maternity Colonies', percent: 35, color: 'bg-pink-500' },
                { name: 'Bachelor Colonies', percent: 28, color: 'bg-blue-500' },
                { name: 'Mixed Colonies', percent: 25, color: 'bg-purple-500' },
                { name: 'Solitary (Anti-Social)', percent: 12, color: 'bg-gray-500' },
              ].map((colony) => (
                <div key={colony.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{colony.name}</span>
                    <span className="text-bat-glow">{colony.percent}%</span>
                  </div>
                  <div className="w-full bg-cave-medium rounded-full h-2">
                    <div
                      className={`${colony.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${colony.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6 mb-12">
          <h3 className="text-bat-secondary font-bold mb-6">Economic Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Sonar Efficiency Index</span>
                <span className="text-green-400">↑ 12.3%</span>
              </div>
              <div className="text-2xl font-bold text-bat-glow">94.7</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Collective Mood</span>
                <span className="text-green-400">↑ Positive</span>
              </div>
              <div className="text-2xl font-bold text-bat-glow">Optimistic</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Cape Sightings</span>
                <span className="text-yellow-400">→ Stable</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">Low</div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 rounded-lg p-6">
          <h3 className="text-yellow-400 font-bold mb-3">Important Notice</h3>
          <p className="text-yellow-200 text-sm mb-2">
            All data on this dashboard is procedurally generated nonsense with no basis in reality.
          </p>
          <p className="text-yellow-300 text-xs">
            The guano economy is a conceptual framework for illustrating the circular,
            sustainable resource management that bats have naturally perfected. It is not a tradeable commodity.
          </p>
          <p className="text-gray-500 text-xs mt-4">
            No financial decisions should be made based on this data. Seriously.
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-bat-secondary hover:text-bat-glow underline"
          >
            ← Return to the cave
          </a>
        </div>
      </div>
    </div>
  )
}
