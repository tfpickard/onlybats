export default function MicrochirpsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Microchirps Research Feed
          </h1>
          <p className="text-xl text-gray-400">
            140-character professional microblogging platform. Content categorization for optimal knowledge dissemination.
          </p>
        </div>

        {/* Auth gate */}
        <div className="bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 rounded-lg p-8 text-center mb-12">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Authenticated Research Access Required
          </h2>
          <p className="text-yellow-200 mb-6 max-w-2xl mx-auto">
            The Microchirps platform requires verified membership to ensure content quality standards.
            Access controls prevent contamination from non-scientific sources and maintain
            the academic integrity of chiropteran discourse.
          </p>
          <a
            href="/sign-in"
            className="inline-block px-8 py-3 bg-bat-primary hover:bg-bat-secondary text-white font-bold rounded-lg transition-colors"
          >
            Professional Login Portal
          </a>
        </div>

        {/* Filters preview */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6 mb-8 opacity-60">
          <h3 className="text-bat-secondary font-bold mb-4">Available Filters</h3>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-purple-900 bg-opacity-30 border border-purple-500 rounded-lg text-purple-300">
              🔊 High Impact Research
            </div>
            <div className="px-4 py-2 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg text-green-300">
              🌿 Data-Focused Content
            </div>
            <div className="px-4 py-2 bg-red-900 bg-opacity-30 border border-red-500 rounded-lg text-red-300">
              🚫 Misinformation Alerts
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Advanced content categorization enables efficient knowledge filtering and priority-based feed curation.
          </p>
        </div>

        {/* Sample chirps */}
        <div className="space-y-4">
          <h3 className="text-bat-secondary font-bold mb-4">Sample Chirps (Public Preview)</h3>

          {[
            {
              user: 'batfan2024',
              filter: 'Low Drama',
              chirp: 'Just learned that some bats can eat half their body weight in insects every night. The efficiency is remarkable.',
              time: '2h ago',
            },
            {
              user: 'echolocation_expert',
              filter: 'High Sonar',
              chirp: 'New paper on frequency modulation in horseshoe bats. The adaptive signal processing is next-level engineering.',
              time: '5h ago',
            },
            {
              user: 'guano_economist',
              filter: 'Low Drama',
              chirp: 'The circular economy of a bat colony is a masterclass in sustainable resource management. No waste, all value.',
              time: '8h ago',
            },
            {
              user: 'poser_watch_official',
              filter: 'Anti-Cape',
              chirp: 'Reminder: Real bat work requires no costume budget. If you see cape-based bat appropriation, report it.',
              time: '12h ago',
            },
          ].map((chirp, i) => (
            <div
              key={i}
              className="bg-cave-dark border border-cave-light rounded-lg p-6 hover:border-bat-secondary transition-colors opacity-60"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-bat-primary flex items-center justify-center text-white font-bold">
                    {chirp.user[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-bat-glow font-medium">{chirp.user}</div>
                    <div className="text-gray-500 text-xs">{chirp.time}</div>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 bg-cave-medium rounded text-gray-400">
                  {chirp.filter}
                </div>
              </div>
              <p className="text-gray-300">{chirp.chirp}</p>
              <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                <button className="hover:text-bat-glow transition-colors">
                  ↑ Chirp
                </button>
                <button className="hover:text-red-400 transition-colors">
                  ↓ Hiss
                </button>
                <button className="hover:text-bat-secondary transition-colors">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="mt-12 bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold mb-3">Platform Usage Standards</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Strict 140-character limit for optimal information density</li>
            <li>• Mandatory content categorization via filter selection</li>
            <li>• Prohibited: entertainment industry references, non-scientific branding</li>
            <li>• Evidence-based assertions required; speculation must be explicitly labeled</li>
            <li>• Constructive peer review encouraged over dismissive criticism</li>
            <li>• Active reporting of misinformation and non-scientific content infiltration</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
