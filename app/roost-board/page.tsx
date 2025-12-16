export default function RoostBoardPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Roost Board
          </h1>
          <p className="text-xl text-gray-400">
            Community forum for bat enthusiasts. Chirp or hiss to vote.
          </p>
        </div>

        {/* Auth gate */}
        <div className="bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Colony Membership Required
          </h2>
          <p className="text-yellow-200 mb-6 max-w-2xl mx-auto">
            The Roost Board is a protected space for verified bat enthusiasts.
            To participate in discussions, you must join the colony first.
            This keeps out cape-themed spam and maintains community quality.
          </p>
          <div className="space-y-4">
            <a
              href="/sign-in"
              className="inline-block px-8 py-3 bg-bat-primary hover:bg-bat-secondary text-white font-bold rounded-lg transition-colors"
            >
              Sign In to Access
            </a>
            <p className="text-gray-400 text-sm">
              No account yet? Registration is free and cape-free.
            </p>
          </div>
        </div>

        {/* Preview categories (visible without auth) */}
        <div className="mt-12">
          <h3 className="text-bat-secondary font-bold text-xl mb-6">
            Forum Categories (Preview)
          </h3>
          <div className="space-y-4">
            {[
              {
                name: 'General Bat Discussion',
                description: 'All things chiroptera',
                threads: 142,
                color: 'border-bat-primary',
              },
              {
                name: 'Echolocation Theory',
                description: 'Deep dives into sonar science',
                threads: 89,
                color: 'border-purple-500',
              },
              {
                name: 'Guano Economy',
                description: 'Circular resource management',
                threads: 67,
                color: 'border-yellow-600',
              },
              {
                name: 'Cave Maintenance',
                description: 'Community infrastructure discussion',
                threads: 34,
                color: 'border-green-500',
              },
              {
                name: 'Anti-Poser Operations',
                description: 'Cape sighting coordination',
                threads: 156,
                color: 'border-red-500',
              },
            ].map((category) => (
              <div
                key={category.name}
                className={`bg-cave-dark border-l-4 ${category.color} rounded-lg p-6 opacity-60`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-bat-glow font-bold text-lg mb-1">
                      {category.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-bat-secondary font-bold">{category.threads}</div>
                    <div className="text-gray-500 text-xs">threads</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold mb-3">Forum Guidelines</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Stay on topic (bats and only bats)</li>
            <li>• Vote with chirps (upvote) or hisses (downvote)</li>
            <li>• No cape-themed content or billionaire worship</li>
            <li>• Be respectful of different bat species and opinions</li>
            <li>• Report spam and poser infiltration attempts</li>
            <li>• Community-moderated, independently operated</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
