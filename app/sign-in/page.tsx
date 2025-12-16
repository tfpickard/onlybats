'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials. Have you joined the colony?')
      } else {
        router.push('/roost-board')
      }
    } catch (err) {
      setError('An error occurred. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to register')
      } else {
        // Auto sign in after registration
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        router.push('/roost-board')
      }
    } catch (err) {
      setError('An error occurred. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-bat-primary bat-glow mb-4">
            {isSignUp ? 'Join the Colony' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {isSignUp
              ? 'Create an account to participate in the bat community'
              : 'Sign in to access the roost board and microchirps'}
          </p>
        </div>

        {/* Auth gate message */}
        <div className="bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-400 text-xl">⚠️</span>
            <div className="text-yellow-200 text-sm">
              <p className="font-bold mb-1">AUTHENTICATION REQUIRED</p>
              <p className="text-yellow-300 text-xs">
                The Roost Board and Microchirps features require colony membership.
                This is a grassroots operation. No corporate surveillance.
                Your data stays in the cave.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-cave-dark border border-cave-light rounded-lg p-8">
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
            {isSignUp && (
              <div>
                <label htmlFor="username" className="block text-bat-secondary text-sm font-medium mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={isSignUp}
                  className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                  placeholder="batfan42"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-bat-secondary text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-bat-secondary text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300 focus:border-bat-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bat-primary hover:bg-bat-secondary text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : isSignUp ? 'Join Colony' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-bat-secondary hover:text-bat-glow text-sm underline"
            >
              {isSignUp ? 'Already a member? Sign in' : 'New here? Join the colony'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <p>Community-run. Independent from Big Bat.</p>
          <p className="mt-2">No cape-themed accounts will be approved.</p>
        </div>
      </div>
    </div>
  )
}
