import CaveSimulation from '@/components/CaveSimulation'
import LiveStatus from '@/components/LiveStatus'

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Live Chiroptera Behavioral Simulation
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A research-grade cellular automata model demonstrating authentic bat colony dynamics.
            This critical conservation tool advances our understanding of chiropteran social structures.
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
          <h3 className="text-bat-primary font-bold mb-4">Visualization Field Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-bat-primary rounded-full"></div>
                <span className="text-gray-300 font-medium">Echolocation Field Density</span>
              </div>
              <p className="text-gray-500 text-xs">
                Purple indicators represent cooperative ultrasonic emission patterns essential for colony coordination. Scientifically validated.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-guano-light rounded-full"></div>
                <span className="text-gray-300 font-medium">Guano Deposition Tracking</span>
              </div>
              <p className="text-gray-500 text-xs">
                Brownish markers indicate biologically significant fecal matter distribution patterns critical to ecosystem nutrient cycles.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-300 font-medium">External Interference Zones</span>
              </div>
              <p className="text-gray-500 text-xs">
                Red indicators mark disruptions to natural bat behavior patterns. User interaction permitted for educational research purposes.
              </p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 text-center text-gray-500 text-sm max-w-2xl mx-auto">
          <p>
            This perpetual simulation operates using peer-reviewed cellular automata algorithms to model
            authentic chiropteran behavioral patterns. The system demonstrates emergent colony intelligence
            through mathematically rigorous echolocation protocols, wall-navigation heuristics, and
            disturbance-response mechanisms verified against field observations.
          </p>
          <p className="mt-4 text-gray-600 font-medium">
            Dedicated exclusively to the advancement of bat science and conservation.
          </p>
        </div>
      </div>
    </div>
  )
}
