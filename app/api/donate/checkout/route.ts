import { NextRequest, NextResponse } from 'next/server'
import { getStripe, DONATION_TIERS, type DonationTierId } from '@/lib/stripe'
import { z } from 'zod'

const checkoutSchema = z.object({
  tierId: z.enum(['single-pellet', 'respectable-pile', 'cathedral-of-guano', 'custom']),
  customAmount: z.number().min(100).optional(), // Minimum $1
  message: z.string().max(500).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tierId, customAmount, message } = checkoutSchema.parse(body)

    // Determine amount
    let amount: number
    let description: string

    if (tierId === 'custom' && customAmount) {
      amount = customAmount
      description = 'Custom donation to OnlyBats.org'
    } else if (tierId in DONATION_TIERS) {
      const tier = DONATION_TIERS[tierId as DonationTierId]
      amount = tier.amount
      description = tier.description
    } else {
      return NextResponse.json(
        { error: 'Invalid donation tier' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tierId === 'custom' ? 'Custom Guano Donation' : DONATION_TIERS[tierId as DonationTierId].name,
              description: description,
              images: ['https://onlybats.org/bat-icon.png'], // You can add a real image URL
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || req.nextUrl.origin}/donate-guano?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || req.nextUrl.origin}/donate-guano?canceled=true`,
      metadata: {
        tierId: tierId,
        message: message || '',
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
