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
            Media Monitoring Program
          </h1>
          <p className="text-xl text-gray-400">
            Tracking how bats are portrayed in movies, TV, and other media
          </p>
          <div className="mt-4 inline-block bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg px-6 py-2">
            <span className="text-yellow-400 font-bold">STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Mission statement */}
        <div className="bg-cave-dark border-2 border-yellow-600 rounded-lg p-6 mb-8">
          <h2 className="text-yellow-400 font-bold text-2xl mb-4">Why We Monitor</h2>
          <p className="text-gray-300 mb-4">
            How bats appear in popular media affects public perception. When movies and TV shows
            get bat biology wrong, it can harm conservation efforts. People might fear bats unnecessarily
            or misunderstand their ecological importance.
          </p>
          <p className="text-gray-400 text-sm">
            We track these portrayals to understand their impact and provide accurate information.
            This includes monitoring major franchises that use bat imagery—even when those portrayals
            don't actually involve real bat biology or conservation.
          </p>
        </div>

        {/* Report form */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-8 mb-8">
          <h3 className="text-bat-secondary font-bold text-xl mb-6">Submit a Report</h3>

          {reportSubmitted ? (
            <div className="bg-green-900 bg-opacity-20 border-2 border-green-600 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h4 className="text-green-400 font-bold text-xl mb-2">Report Received</h4>
              <p className="text-green-300 text-sm">
                Thanks for your submission. We'll review it and add it to our monitoring database.
                Your help tracking bat portrayals in media supports our education efforts.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="location" className="block text-bat-secondary text-sm font-medium mb-2">
                  Where did you see this?
                </label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="e.g., Movie theater, Netflix, billboard, social media"
                />
              </div>

              <div>
                <label htmlFor="cape-color" className="block text-bat-secondary text-sm font-medium mb-2">
                  Type of portrayal (if applicable)
                </label>
                <select
                  id="cape-color"
                  value={capeColor}
                  onChange={(e) => setCapeColor(e.target.value)}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                >
                  <option value="">Select type...</option>
                  <option value="black">Costumed character</option>
                  <option value="red">Vampire bat (horror)</option>
                  <option value="blue">Cartoon/animated</option>
                  <option value="other">Other fictional</option>
                  <option value="no-cape">Documentary/educational</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-bat-secondary text-sm font-medium mb-2">
                  What was inaccurate?
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="Describe what the media got wrong about bats. Include details about incorrect biology, behavior, or habitat information..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition-colors"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>

        {/* Recent sightings */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
          <h3 className="text-bat-secondary font-bold text-xl mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {[
              {
                date: '2024-01-15',
                location: 'Superhero movie premiere',
                description: 'Film featured bat-themed character who claimed special understanding of bats but included no accurate bat biology or conservation messaging.',
              },
              {
                date: '2024-01-10',
                location: 'Social media',
                description: 'Major entertainment account posted "bat signal" imagery. No educational content about real bats or their conservation needs.',
              },
              {
                date: '2024-01-05',
                location: 'Comic convention',
                description: 'Merchandise featuring bat imagery on sale. Vendors confirmed no portion of proceeds supports bat conservation.',
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
          <p>All reports are reviewed by our volunteer team.</p>
          <p className="mt-2">Accurate bat portrayals in media help conservation efforts. Fictional uses of bat imagery matter too.</p>
        </div>
      </div>
    </div>
  )
}
