import CaveSimulation from '@/components/CaveSimulation'
import LiveStatus from '@/components/LiveStatus'

export default function Home() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Live Bat Colony Simulation
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch a simulated bat colony navigate their cave using echolocation.
            This model helps us understand how bats coordinate and communicate.
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
          <h3 className="text-bat-primary font-bold mb-4">What You're Seeing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-bat-primary rounded-full"></div>
                <span className="text-gray-300 font-medium">Echolocation Signals</span>
              </div>
              <p className="text-gray-500 text-xs">
                Purple dots show where bats are using sonar to navigate. They work together to avoid collisions.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-guano-light rounded-full"></div>
                <span className="text-gray-300 font-medium">Movement Trails</span>
              </div>
              <p className="text-gray-500 text-xs">
                Brownish areas mark where bats have traveled. In real caves, this would be guano buildup.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-300 font-medium">Disturbances</span>
              </div>
              <p className="text-gray-500 text-xs">
                Red ripples show disruptions to the colony. Click anywhere to create one and watch how bats respond.
              </p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 text-center text-gray-500 text-sm max-w-2xl mx-auto">
          <p>
            This simulation runs continuously, showing how bat colonies behave in their natural habitat.
            The bats use echolocation to navigate, avoid walls, and respond to disturbances—just like real bats do.
          </p>
          <p className="mt-4 text-gray-600 font-medium">
            Supporting bat conservation through education and research.
          </p>
        </div>
      </div>
    </div>
  )
}
