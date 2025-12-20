import Stripe from 'stripe'

// Lazy initialization to handle build time when env vars may not be set
let _stripe: Stripe | null = null

export const getStripe = (): Stripe => {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }
  return _stripe
}

// For backward compatibility
export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    const stripeInstance = getStripe()
    return stripeInstance[prop as keyof Stripe]
  }
})

export const DONATION_TIERS = {
  'single-pellet': {
    name: 'Single Pellet',
    amount: 500, // $5 in cents
    description: 'A small but meaningful contribution to the guano economy',
  },
  'respectable-pile': {
    name: 'Respectable Pile',
    amount: 2000, // $20 in cents
    description: 'A substantial pile that shows commitment',
  },
  'cathedral-of-guano': {
    name: 'Cathedral of Guano',
    amount: 10000, // $100 in cents
    description: 'An architectural marvel of support',
  },
} as const

export type DonationTierId = keyof typeof DONATION_TIERS
