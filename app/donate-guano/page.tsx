'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const DONATION_TIERS = [
  {
    id: 'single-pellet',
    name: 'Single Pellet',
    amount: 500, // $5
    description: 'A small but meaningful contribution to the guano economy',
    benefits: [
      'Warm feeling of supporting real bats',
      'Knowledge that your pellet matters',
      'One digital "thank you" chirp',
    ],
  },
  {
    id: 'respectable-pile',
    name: 'Respectable Pile',
    amount: 2000, // $20
    description: 'A substantial pile that shows commitment',
    benefits: [
      'All Single Pellet benefits',
      'Recognition in the cave whispers',
      'Exclusive "Guano Contributor" badge',
      'Advance notice of colony events',
    ],
  },
  {
    id: 'cathedral-of-guano',
    name: 'Cathedral of Guano',
    amount: 10000, // $100
    description: 'An architectural marvel of support',
    benefits: [
      'All Respectable Pile benefits',
      'Your name in the Cave of Honor',
      'Lifetime "Guano Architect" status',
      'Personal thank-you from a community moderator',
      'Priority access to new bat facts',
    ],
  },
]

function DonateGuanoContent() {
  const searchParams = useSearchParams()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCanceled, setShowCanceled] = useState(false)

  // Check for success/canceled query params
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 10000)
    }
    if (searchParams.get('canceled') === 'true') {
      setShowCanceled(true)
      setTimeout(() => setShowCanceled(false), 5000)
    }
  }, [searchParams])

  const handleDonate = async () => {
    setIsProcessing(true)

    try {
      // Determine donation details
      let tierId: string
      let customAmountCents: number | undefined

      if (selectedTier) {
        tierId = selectedTier
      } else if (customAmount) {
        tierId = 'custom'
        customAmountCents = Math.round(parseFloat(customAmount) * 100)
      } else {
        alert('Please select a tier or enter a custom amount')
        setIsProcessing(false)
        return
      }

      // Create checkout session
      const response = await fetch('/api/donate/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tierId,
          customAmount: customAmountCents,
          message: message.trim() || undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Donation error:', error)
      alert(error instanceof Error ? error.message : 'Failed to process donation')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-bat-primary bat-glow mb-4">
            Donate Guano
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            This keeps the cave lights off and the bats on.
            Community-funded. No corporate sponsors. No cape money.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {DONATION_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`bg-cave-dark border-2 rounded-lg p-6 cursor-pointer transition-all ${
                selectedTier === tier.id
                  ? 'border-bat-primary shadow-lg shadow-bat-primary/20'
                  : 'border-cave-light hover:border-bat-secondary'
              }`}
            >
              <h3 className="text-2xl font-bold text-bat-secondary mb-2">
                {tier.name}
              </h3>
              <div className="text-4xl font-bold text-bat-glow mb-4">
                ${(tier.amount / 100).toFixed(0)}
              </div>
              <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
              <ul className="space-y-2 text-sm text-gray-500">
                {tier.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-bat-primary">🦇</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom amount */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-6 mb-8">
          <h3 className="text-bat-secondary font-bold mb-4">Custom Amount</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="custom-amount" className="block text-sm text-gray-400 mb-2">
                Enter your own amount (minimum $1)
              </label>
              <input
                type="number"
                id="custom-amount"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                Optional message
              </label>
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={100}
                className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                placeholder="For the bats..."
              />
            </div>
          </div>
        </div>

        {/* Success/Canceled messages */}
        {showSuccess && (
          <div className="mb-8 bg-green-900/20 border-2 border-green-500 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🦇✨</div>
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              DONATION SUCCESSFUL!
            </h3>
            <p className="text-gray-300">
              Thank you for supporting the bat community! Your contribution helps keep the cave
              lights off and the bats on. No capes required.
            </p>
          </div>
        )}

        {showCanceled && (
          <div className="mb-8 bg-yellow-900/20 border-2 border-yellow-500 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🦇</div>
            <p className="text-gray-300">
              Donation canceled. No worries! The bats will still appreciate you from afar.
            </p>
          </div>
        )}

        {/* Donate button */}
        <div className="text-center mb-12">
          <button
            onClick={handleDonate}
            disabled={(!selectedTier && !customAmount) || isProcessing}
            className="px-8 py-4 bg-bat-primary hover:bg-bat-secondary text-white text-xl font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isProcessing ? 'PROCESSING...' : 'DONATE WITH STRIPE'}
          </button>
          {isProcessing && (
            <p className="mt-4 text-bat-glow animate-pulse">
              Redirecting to secure payment...
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500">
            Powered by Stripe • Secure payment processing
          </p>
        </div>

        {/* Info boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cave-dark border border-cave-light rounded-lg p-6">
            <h3 className="text-bat-secondary font-bold mb-3">Where Does This Go?</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Server costs (keeping the cave online)</li>
              <li>• Community moderation</li>
              <li>• Bat fact research and verification</li>
              <li>• ASCII art development</li>
              <li>• Anti-cape surveillance operations</li>
            </ul>
          </div>

          <div className="bg-cave-darkest border-2 border-bat-primary rounded-lg p-6">
            <h3 className="text-bat-primary font-bold mb-3">The Guano Economy</h3>
            <p className="text-sm text-gray-400 mb-3">
              Guano is a renewable resource. By contributing to the guano economy,
              you're participating in the circular, sustainable model that bats have
              perfected over millions of years.
            </p>
            <p className="text-xs text-gray-500">
              No billionaires. No capes. Just mutual aid.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>Real payments are processed securely through Stripe.</p>
          <p className="mt-2">Independent from Big Bat and their anti-bat agenda.</p>
          <p className="mt-2">100% of donations go to bat conservation efforts (minus payment processing fees).</p>
        </div>
      </div>
    </div>
  )
}

export default function DonateGuanoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-bat-primary text-xl">Loading...</div>
      </div>
    }>
      <DonateGuanoContent />
    </Suspense>
  )
}
