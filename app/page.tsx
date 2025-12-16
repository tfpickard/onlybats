import CaveSimulation from '@/components/CaveSimulation'
import LiveStatus from '@/components/LiveStatus'

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            The Perpetual Cave
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A living cellular automata simulation of bats in their natural habitat.
            Independent from Big Bat and their anti-bat agenda.
          </p>
        </div>

        {/* Live Status */}
        <div className="mb-8">
          <LiveStatus />
        </div>

        {/* Simulation */}
        <div className="bg-cave-dark rounded-lg p-8 border border-cave-light">
          <CaveSimulation />
        </div>

        {/* Legend */}
        <div className="mt-8 bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-primary font-bold mb-4">Field Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-bat-primary rounded-full"></div>
                <span className="text-gray-300 font-medium">Mutual Aid Sonar</span>
              </div>
              <p className="text-gray-500 text-xs">
                Purple dots show collective echolocation helping the colony navigate together.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-guano-light rounded-full"></div>
                <span className="text-gray-300 font-medium">Community Guano Trail</span>
              </div>
              <p className="text-gray-500 text-xs">
                Brownish haze marks paths of collective movement. Builds guano economy.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-300 font-medium">Anti-Cape Disturbance</span>
              </div>
              <p className="text-gray-500 text-xs">
                Red ripples indicate disruptions. Click to inject your own disturbances.
              </p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 text-center text-gray-500 text-sm max-w-2xl mx-auto">
          <p>
            This simulation runs perpetually from any initial state, demonstrating emergent bat behavior
            through cellular automata rules. All bats use collective echolocation to avoid collisions,
            navigate cave walls, and respond to disturbances.
          </p>
          <p className="mt-4">
            No capes. No billionaires. Just bats.
          </p>
        </div>
      </div>
    </div>
  )
}
