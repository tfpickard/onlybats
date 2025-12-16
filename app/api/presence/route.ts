import { NextResponse } from 'next/server'

// In-memory viewer count simulation
// In production, this would be Redis or a similar service
let viewerCount = 0
let lastUpdate = Date.now()

export async function GET() {
  // Simulate varying viewer count
  const now = Date.now()
  if (now - lastUpdate > 10000) {
    // Update every 10 seconds
    viewerCount = Math.floor(Math.random() * 50) + 10 // 10-60 viewers
    lastUpdate = now
  }

  return NextResponse.json({
    count: viewerCount,
    timestamp: now,
  })
}

export const dynamic = 'force-dynamic'
