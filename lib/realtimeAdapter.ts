/**
 * Realtime Adapter Abstraction
 * Supports two modes:
 * 1. LocalFallbackAdapter: polling-based for Vercel serverless
 * 2. RemoteWSAdapter: WebSocket-based for external realtime backend
 */

export interface RealtimeAdapter {
  connect(): Promise<void>
  disconnect(): void
  getViewerCount(): number
  getWhispers(): string[]
  onViewerCountUpdate(callback: (count: number) => void): void
  onWhisperReceived(callback: (whisper: string) => void): void
}

/**
 * Local Fallback Adapter
 * Uses polling to API routes
 */
export class LocalFallbackAdapter implements RealtimeAdapter {
  private viewerCount: number = 0
  private whispers: string[] = []
  private viewerCountCallbacks: ((count: number) => void)[] = []
  private whisperCallbacks: ((whisper: string) => void)[] = []
  private pollingInterval: NodeJS.Timeout | null = null

  async connect(): Promise<void> {
    // Start polling
    this.poll()
    this.pollingInterval = setInterval(() => this.poll(), 5000) // Poll every 5 seconds
  }

  disconnect(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval)
      this.pollingInterval = null
    }
  }

  private async poll(): Promise<void> {
    try {
      // Poll presence
      const presenceRes = await fetch('/api/presence')
      const presenceData = await presenceRes.json()
      if (presenceData.count !== this.viewerCount) {
        this.viewerCount = presenceData.count
        this.viewerCountCallbacks.forEach((cb) => cb(this.viewerCount))
      }

      // Poll whispers
      const whispersRes = await fetch('/api/whispers')
      const whispersData = await whispersRes.json()
      if (whispersData.whispers && whispersData.whispers.length > 0) {
        const newWhispers = whispersData.whispers.filter(
          (w: string) => !this.whispers.includes(w)
        )
        newWhispers.forEach((whisper: string) => {
          this.whispers.push(whisper)
          this.whisperCallbacks.forEach((cb) => cb(whisper))
        })

        // Keep only last 20 whispers
        if (this.whispers.length > 20) {
          this.whispers = this.whispers.slice(-20)
        }
      }
    } catch (error) {
      console.error('Polling error:', error)
    }
  }

  getViewerCount(): number {
    return this.viewerCount
  }

  getWhispers(): string[] {
    return this.whispers
  }

  onViewerCountUpdate(callback: (count: number) => void): void {
    this.viewerCountCallbacks.push(callback)
  }

  onWhisperReceived(callback: (whisper: string) => void): void {
    this.whisperCallbacks.push(callback)
  }
}

/**
 * Remote WebSocket Adapter
 * Connects to external realtime backend
 */
export class RemoteWSAdapter implements RealtimeAdapter {
  private ws: WebSocket | null = null
  private viewerCount: number = 0
  private whispers: string[] = []
  private viewerCountCallbacks: ((count: number) => void)[] = []
  private whisperCallbacks: ((whisper: string) => void)[] = []
  private realtimeUrl: string

  constructor(realtimeUrl: string) {
    this.realtimeUrl = realtimeUrl
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.realtimeUrl)

        this.ws.onopen = () => {
          console.log('WebSocket connected')
          resolve()
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          reject(error)
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)

            if (data.type === 'viewerCount') {
              this.viewerCount = data.count
              this.viewerCountCallbacks.forEach((cb) => cb(this.viewerCount))
            } else if (data.type === 'whisper') {
              this.whispers.push(data.message)
              if (this.whispers.length > 20) {
                this.whispers = this.whispers.slice(-20)
              }
              this.whisperCallbacks.forEach((cb) => cb(data.message))
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        }

        this.ws.onclose = () => {
          console.log('WebSocket disconnected')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  getViewerCount(): number {
    return this.viewerCount
  }

  getWhispers(): string[] {
    return this.whispers
  }

  onViewerCountUpdate(callback: (count: number) => void): void {
    this.viewerCountCallbacks.push(callback)
  }

  onWhisperReceived(callback: (whisper: string) => void): void {
    this.whisperCallbacks.push(callback)
  }
}

/**
 * Factory function to create appropriate adapter
 */
export function createRealtimeAdapter(): RealtimeAdapter {
  const realtimeUrl = process.env.NEXT_PUBLIC_REALTIME_URL

  if (realtimeUrl) {
    console.log('Using RemoteWSAdapter with URL:', realtimeUrl)
    return new RemoteWSAdapter(realtimeUrl)
  } else {
    console.log('Using LocalFallbackAdapter (polling mode)')
    return new LocalFallbackAdapter()
  }
}
