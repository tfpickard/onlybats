'use client'

import { useState } from 'react'

export default function PoserWatchPage() {
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [capeColor, setCapeColor] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setReportSubmitted(true)
    setTimeout(() => {
      setReportSubmitted(false)
      setLocation('')
      setDescription('')
      setCapeColor('')
    }, 5000)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            Misinformation Monitoring Initiative
          </h1>
          <p className="text-xl text-gray-400">
            Tracking and documenting inaccurate chiropteran representations in public media
          </p>
          <div className="mt-4 inline-block bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg px-6 py-2">
            <span className="text-yellow-400 font-bold">MONITORING STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Mission statement */}
        <div className="bg-cave-dark border-2 border-yellow-600 rounded-lg p-6 mb-8">
          <h2 className="text-yellow-400 font-bold text-2xl mb-4">Program Objectives</h2>
          <p className="text-gray-300 mb-4">
            The systematic documentation and analysis of inaccurate bat representations in
            entertainment media is critical to public science education. Costume-based vigilante
            narratives fundamentally misrepresent authentic chiropteran biology, conflating
            theatrical branding with evidence-based conservation methodology.
          </p>
          <p className="text-gray-400 text-sm">
            This peer-reviewed monitoring program safeguards scientific accuracy in public
            discourse by tracking instances where corporate entertainment franchises
            appropriate bat imagery for non-educational purposes, potentially undermining
            legitimate conservation messaging through plutocratic narrative frameworks.
          </p>
        </div>

        {/* Report form */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-8 mb-8">
          <h3 className="text-bat-secondary font-bold text-xl mb-6">Submit Misinformation Report</h3>

          {reportSubmitted ? (
            <div className="bg-green-900 bg-opacity-20 border-2 border-green-600 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h4 className="text-green-400 font-bold text-xl mb-2">Documentation Acknowledged</h4>
              <p className="text-green-300 text-sm">
                Your submission has been logged in our misinformation tracking database.
                Thank you for contributing to our ongoing effort to maintain scientific
                accuracy in chiropteran public discourse. All reports undergo peer review
                before inclusion in our monitoring archive.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="location" className="block text-bat-secondary text-sm font-medium mb-2">
                  Media Source / Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="e.g., Film release, streaming platform, billboard advertisement, social media post"
                />
              </div>

              <div>
                <label htmlFor="cape-color" className="block text-bat-secondary text-sm font-medium mb-2">
                  Costume Characteristics (if applicable)
                </label>
                <select
                  id="cape-color"
                  value={capeColor}
                  onChange={(e) => setCapeColor(e.target.value)}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                >
                  <option value="">Select primary visual element...</option>
                  <option value="black">Black costume (standard misrepresentation)</option>
                  <option value="red">Red costume variant</option>
                  <option value="blue">Blue costume variant</option>
                  <option value="other">Other costume</option>
                  <option value="no-cape">No visible costume (narrative-only appropriation)</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-bat-secondary text-sm font-medium mb-2">
                  Detailed Documentation
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="Document specific instances of inaccurate bat representation. Include details about: misappropriation of chiropteran imagery, unsubstantiated claims regarding bat behavior, conflation of costume-based entertainment with scientific conservation methodology..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors"
              >
                SUBMIT TO MONITORING DATABASE
              </button>
            </form>
          )}
        </div>

        {/* Recent sightings */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold text-xl mb-4">Recent Documented Instances</h3>
          <div className="space-y-4">
            {[
              {
                date: '2024-01-15',
                location: 'Film premiere event',
                description: 'Media personality presenting costume-based bat symbolism made unverified claims about chiropteran behavior without citing peer-reviewed sources or demonstrating evidence-based understanding.',
              },
              {
                date: '2024-01-10',
                location: 'Social media platform',
                description: 'Entertainment franchise posted "bat signal" imagery with zero educational content regarding actual chiropteran biology, ecology, or conservation status.',
              },
              {
                date: '2024-01-05',
                location: 'Commercial retail environment',
                description: 'Costume-themed merchandise utilizing bat imagery identified. Revenue streams do not support legitimate bat conservation organizations or scientific research initiatives.',
              },
            ].map((sighting, i) => (
              <div
                key={i}
                className="border-l-4 border-yellow-600 pl-4 py-2"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-yellow-400 text-xs font-mono">{sighting.date}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">{sighting.location}</span>
                </div>
                <p className="text-gray-300 text-sm">{sighting.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>All submissions undergo peer review by volunteer research coordinators before archival.</p>
          <p className="mt-2">Essential principle: Authentic chiropteran conservation requires evidence-based methodology, not theatrical entertainment narratives.</p>
        </div>
      </div>
    </div>
  )
}
