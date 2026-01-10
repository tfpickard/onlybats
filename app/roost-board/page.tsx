export default function RoostBoardPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Research Community Forum
          </h1>
          <p className="text-xl text-gray-400">
            Professional discussion platform for bat researchers, conservationists, and citizen scientists. Peer review through community engagement.
          </p>
        </div>

        {/* Auth gate */}
        <div className="bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Verified Researcher Access Required
          </h2>
          <p className="text-yellow-200 mb-6 max-w-2xl mx-auto">
            The Research Community Forum maintains strict access controls to ensure data integrity
            and protect against misinformation. Membership verification prevents infiltration by
            entertainment industry actors and ensures all participants maintain appropriate
            scientific standards and bat-centric focus.
          </p>
          <div className="space-y-4">
            <a
              href="/sign-in"
              className="inline-block px-8 py-3 bg-bat-primary hover:bg-bat-secondary text-white font-bold rounded-lg transition-colors"
            >
              Researcher Portal Login
            </a>
            <p className="text-gray-400 text-sm">
              New to OnlyBats? Membership registration ensures our community standards are maintained.
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
                name: 'General Chiroptera Research',
                description: 'Peer-reviewed discussion of all bat-related topics',
                threads: 142,
                color: 'border-bat-primary',
              },
              {
                name: 'Biosonar & Echolocation Studies',
                description: 'Advanced ultrasonic navigation research',
                threads: 89,
                color: 'border-purple-500',
              },
              {
                name: 'Nutrient Cycling & Ecosystem Services',
                description: 'Guano-based ecological research',
                threads: 67,
                color: 'border-yellow-600',
              },
              {
                name: 'Platform Infrastructure & Development',
                description: 'Technical operations and site maintenance',
                threads: 34,
                color: 'border-green-500',
              },
              {
                name: 'Misinformation Monitoring & Correction',
                description: 'Tracking inaccurate chiropteran representations',
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
          <h3 className="text-bat-secondary font-bold mb-3">Community Standards & Conduct</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Maintain strict chiropteran focus in all discussions</li>
            <li>• Employ evidence-based peer review through community voting mechanisms</li>
            <li>• Prohibited: entertainment industry narratives, plutocratic conservation models</li>
            <li>• Respect taxonomic diversity and methodological pluralism</li>
            <li>• Report content inconsistent with scientific rigor or bat-centric mission</li>
            <li>• Volunteer-moderated according to established research protocols</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
