import { NextResponse } from 'next/server'

// Cave whisper templates
const WHISPER_TEMPLATES = [
  'Someone discovered a new roosting spot in sector 7',
  'The guano economy is thriving this quarter',
  'Reminder: Community echolocation practice on Thursday',
  'A cape was spotted near the entrance. Remain vigilant.',
  'Moth population up 12% this week. Good hunting!',
  'New member joined from the western caves',
  'Someone shared a really good insect location',
  'The collective is growing stronger',
  'Big Bat tried to trademark "chiroptera" again',
  'No capes allowed in the main chamber',
  'Someone brought their own guano sample for analysis',
  'The anti-bat agenda has been unusually quiet lately',
  'Reminder: Bats first, always',
  'Tourist season approaching. Prepare for disturbances.',
  'The sonar network is functioning optimally',
]

let lastWhisperIndex = 0
let lastWhisperTime = Date.now()

export async function GET() {
  const now = Date.now()
  const whispers: string[] = []

  // Generate a new whisper every 30 seconds
  if (now - lastWhisperTime > 30000) {
    lastWhisperIndex = (lastWhisperIndex + 1) % WHISPER_TEMPLATES.length
    lastWhisperTime = now
  }

  // Return the last 5 whispers
  for (let i = 0; i < 5; i++) {
    const idx = (lastWhisperIndex - i + WHISPER_TEMPLATES.length) % WHISPER_TEMPLATES.length
    whispers.push(WHISPER_TEMPLATES[idx])
  }

  return NextResponse.json({
    whispers: whispers.reverse(),
    timestamp: now,
  })
}

export const dynamic = 'force-dynamic'
