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
          <div className="text-6xl mb-4">🔭</div>
          <h1 className="text-5xl font-bold text-yellow-400 mb-4">
            POSER WATCH
          </h1>
          <p className="text-xl text-gray-400">
            Report cape sightings and protect the integrity of bat culture
          </p>
          <div className="mt-4 inline-block bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg px-6 py-2">
            <span className="text-yellow-400 font-bold">STATUS: ACTIVE 🦇🔭</span>
          </div>
        </div>

        {/* Mission statement */}
        <div className="bg-cave-dark border-2 border-yellow-600 rounded-lg p-6 mb-8">
          <h2 className="text-yellow-400 font-bold text-2xl mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            Cape-based branding is not echolocation. Real bat work doesn't require a utility belt.
            We monitor and document instances of bat culture appropriation by cape-wearing influencers.
          </p>
          <p className="text-gray-400 text-sm">
            This is a grassroots effort to preserve authentic bat appreciation and prevent
            the commodification of bat symbolism by billionaire cosplayers.
          </p>
        </div>

        {/* Report form */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-8 mb-8">
          <h3 className="text-bat-secondary font-bold text-xl mb-6">Submit a Sighting</h3>

          {reportSubmitted ? (
            <div className="bg-green-900 bg-opacity-20 border-2 border-green-600 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h4 className="text-green-400 font-bold text-xl mb-2">Report Received</h4>
              <p className="text-green-300 text-sm">
                Thank you for your vigilance. The colony appreciates your contribution
                to protecting bat culture from poser infiltration.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="location" className="block text-bat-secondary text-sm font-medium mb-2">
                  Location of Sighting
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="e.g., Comic convention, social media, billboard"
                />
              </div>

              <div>
                <label htmlFor="cape-color" className="block text-bat-secondary text-sm font-medium mb-2">
                  Cape Color (if applicable)
                </label>
                <select
                  id="cape-color"
                  value={capeColor}
                  onChange={(e) => setCapeColor(e.target.value)}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                >
                  <option value="">Select color...</option>
                  <option value="black">Black (classic poser)</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="other">Other</option>
                  <option value="no-cape">No cape (suspicious)</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-bat-secondary text-sm font-medium mb-2">
                  Description of Incident
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="Describe the poser activity. Include details about bat symbolism misuse, false claims of bat knowledge, or appropriation of echolocation concepts..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors"
              >
                SUBMIT REPORT
              </button>
            </form>
          )}
        </div>

        {/* Recent sightings */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold text-xl mb-4">Recent Verified Sightings</h3>
          <div className="space-y-4">
            {[
              {
                date: '2024-01-15',
                location: 'Movie premiere',
                description: 'Individual in cape claimed to "understand bats" while providing zero actual bat facts.',
              },
              {
                date: '2024-01-10',
                location: 'Social media',
                description: 'Cape influencer posted "bat signal" content without any mention of actual chiroptera.',
              },
              {
                date: '2024-01-05',
                location: 'Convention center',
                description: 'Spotted: cape-based merchandise using bat imagery. No proceeds going to bat conservation.',
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
          <p>All reports are reviewed by community moderators.</p>
          <p className="mt-2">Remember: Real bats do the work. Capes are just theater.</p>
        </div>
      </div>
    </div>
  )
}
