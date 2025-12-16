export default function NotBatmanPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            On Cape-Based Cosplay Economics
          </h1>
          <p className="text-xl text-gray-400">
            A Deadpan Analysis of Performative Bat Appreciation
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          <section className="bg-cave-dark border border-cave-light rounded-lg p-8">
            <h2 className="text-2xl font-bold text-bat-secondary mb-4">
              The Problem
            </h2>
            <p className="text-gray-300 mb-4">
              There exists a certain class of individuals who drape themselves in bat imagery
              while contributing nothing to actual bat welfare, education, or conservation.
            </p>
            <p className="text-gray-400 text-sm">
              These individuals often possess:
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-2 mt-2 ml-4">
              <li>Expensive capes (functionality: decorative)</li>
              <li>Utility belts (contents: unclear, possibly just gadgets)</li>
              <li>Brooding demeanor (bat-adjacent, not bat-accurate)</li>
              <li>Zero published papers on chiroptera</li>
              <li>No demonstrated echolocation abilities</li>
            </ul>
          </section>

          <section className="bg-cave-dark border border-cave-light rounded-lg p-8">
            <h2 className="text-2xl font-bold text-bat-secondary mb-4">
              Real Bats Do the Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-bat-glow font-bold mb-2">Actual Bats:</h3>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✓ Pollinate plants</li>
                  <li>✓ Control insect populations</li>
                  <li>✓ Generate valuable guano</li>
                  <li>✓ Navigate via echolocation</li>
                  <li>✓ Exist in cooperative colonies</li>
                  <li>✓ Require no branding budget</li>
                </ul>
              </div>
              <div>
                <h3 className="text-yellow-400 font-bold mb-2">Cape Cosplayers:</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>✗ Pollinate nothing</li>
                  <li>✗ Increase insurance costs</li>
                  <li>✗ Generate trademark disputes</li>
                  <li>✗ Navigate via expensive technology</li>
                  <li>✗ Work alone (usually)</li>
                  <li>✗ Massive merchandising apparatus</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-cave-dark border border-cave-light rounded-lg p-8">
            <h2 className="text-2xl font-bold text-bat-secondary mb-4">
              The Economics of Bat Symbolism
            </h2>
            <p className="text-gray-300 mb-4">
              When bat imagery is appropriated for cape-based branding, the economic benefits
              flow entirely to corporations and merchandising. Meanwhile, actual bat conservation
              organizations operate on shoestring budgets.
            </p>
            <div className="bg-cave-darkest border border-bat-primary rounded-lg p-4 mt-4">
              <p className="text-bat-glow text-sm font-mono">
                Annual Revenue from Bat-Themed Cape Merchandise: ~$1,000,000,000+
              </p>
              <p className="text-bat-glow text-sm font-mono mt-2">
                Average Annual Budget of Bat Conservation Org: ~$50,000
              </p>
              <p className="text-yellow-400 text-xs mt-4">
                This is a 20,000:1 ratio. The math is concerning.
              </p>
            </div>
          </section>

          <section className="bg-cave-dark border border-cave-light rounded-lg p-8">
            <h2 className="text-2xl font-bold text-bat-secondary mb-4">
              Our Position
            </h2>
            <p className="text-gray-300 mb-4">
              We harbor no ill will toward individual cosplayers. Everyone needs a hobby.
              However, we maintain that:
            </p>
            <ol className="list-decimal list-inside text-gray-300 space-y-3 ml-4">
              <li>
                Cape-based vigilantism is not a substitute for community organizing
              </li>
              <li>
                Bat symbolism should benefit actual bats
              </li>
              <li>
                Echolocation cannot be purchased, only evolved over millions of years
              </li>
              <li>
                The guano economy is more sustainable than billionaire philanthropy
              </li>
              <li>
                Real bat work requires no costume budget
              </li>
            </ol>
          </section>

          <section className="bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Call to Action
            </h2>
            <p className="text-yellow-200 mb-4">
              If you encounter cape-based bat appropriation:
            </p>
            <ol className="list-decimal list-inside text-yellow-300 space-y-2 ml-4">
              <li>Document the incident</li>
              <li>Report via <a href="/poser-watch" className="underline hover:text-bat-glow">Poser Watch</a></li>
              <li>Redirect attention to actual bats</li>
              <li>Support bat conservation directly</li>
              <li>Remember: no capes, no billionaires, just bats</li>
            </ol>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>This analysis is presented in good faith and mild satire.</p>
          <p className="mt-2">Independent from Big Bat and their anti-bat agenda.</p>
          <p className="mt-4 text-xs">
            No fictional characters were harmed in the making of this page.
          </p>
        </div>
      </div>
    </div>
  )
}
