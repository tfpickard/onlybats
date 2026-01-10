/**
 * Bat Cave Audio Engine
 * Web Audio-based sonification of the bat simulation state
 * Produces context-aware sounds based on behavior modes and metrics
 */

import type { SimulationMetrics, BehaviorMode } from './batCaveSimulation'

export interface AudioConfig {
  enabled: boolean
  masterVolume: number // 0-1
  ambientVolume: number // 0-1
  sonarVolume: number // 0-1
  flutterVolume: number // 0-1
  chaosVolume: number // 0-1
}

export class BatCaveAudioEngine {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private ambientGain: GainNode | null = null
  private sonarGain: GainNode | null = null
  private flutterGain: GainNode | null = null
  private chaosGain: GainNode | null = null

  // Oscillators for continuous sounds
  private ambientOscillators: OscillatorNode[] = [] // 3 drones with chaotic detuning
  private lorenzState: { x: number; y: number; z: number } = { x: 1, y: 1, z: 1 }
  private chaosOscillators: OscillatorNode[] = []

  // Scheduling
  private lastSonarTime = 0
  private lastFlutterTime = 0
  private lastLorenzUpdate = 0

  private config: AudioConfig = {
    enabled: false,
    masterVolume: 0.3,
    ambientVolume: 0.6,
    sonarVolume: 0.4,
    flutterVolume: 0.5,
    chaosVolume: 0.3,
  }

  constructor(config?: Partial<AudioConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
  }

  /**
   * Initialize audio context and create graph
   */
  async initialize(): Promise<void> {
    if (this.audioContext) return

    // Create audio context
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Create gain nodes
    this.masterGain = this.audioContext.createGain()
    this.masterGain.gain.value = this.config.masterVolume
    this.masterGain.connect(this.audioContext.destination)

    this.ambientGain = this.audioContext.createGain()
    this.ambientGain.gain.value = this.config.ambientVolume
    this.ambientGain.connect(this.masterGain)

    this.sonarGain = this.audioContext.createGain()
    this.sonarGain.gain.value = this.config.sonarVolume
    this.sonarGain.connect(this.masterGain)

    this.flutterGain = this.audioContext.createGain()
    this.flutterGain.gain.value = this.config.flutterVolume
    this.flutterGain.connect(this.masterGain)

    this.chaosGain = this.audioContext.createGain()
    this.chaosGain.gain.value = this.config.chaosVolume
    this.chaosGain.connect(this.masterGain)

    // Start ambient drone
    this.startAmbientDrone()

    this.config.enabled = true
  }

  /**
   * Start the ambient background drone with 3 chaotically detuning oscillators
   */
  private startAmbientDrone(): void {
    if (!this.audioContext || !this.ambientGain) return

    // Create 3 oscillators all starting at the same frequency
    const baseFreq = 90 // All start at 90 Hz

    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator()
      osc.type = 'triangle' // Triangle wave for richer harmonics
      osc.frequency.value = baseFreq

      // Individual gain for mixing
      const gain = this.audioContext.createGain()
      gain.gain.value = 0.3 // Equal mix

      osc.connect(gain)
      gain.connect(this.ambientGain)
      osc.start()

      this.ambientOscillators.push(osc)
    }
  }

  /**
   * Update audio based on current simulation metrics
   */
  update(metrics: SimulationMetrics): void {
    if (!this.config.enabled || !this.audioContext) return

    const now = this.audioContext.currentTime

    // Update Lorenz attractor for chaotic detuning
    if (now - this.lastLorenzUpdate > 0.05) {
      this.updateLorenzAttractor()
      this.lastLorenzUpdate = now
    }

    // Update ambient drone with chaotic detuning
    this.updateAmbientDrone(metrics, now)

    // Trigger sonar pings based on bat density
    if (now - this.lastSonarTime > this.getSonarInterval(metrics)) {
      this.triggerSonarPing(metrics)
      this.lastSonarTime = now
    }

    // Trigger flutter sounds based on velocity
    if (now - this.lastFlutterTime > this.getFlutterInterval(metrics)) {
      this.triggerFlutter(metrics)
      this.lastFlutterTime = now
    }

    // Update chaos tones
    this.updateChaosTones(metrics)

    // Handle disturbance alerts
    if (metrics.totalDisturbance > 50) {
      this.triggerDisturbanceAlert(metrics)
    }
  }

  /**
   * Update Lorenz attractor state for chaotic detuning
   */
  private updateLorenzAttractor(): void {
    const sigma = 10
    const rho = 28
    const beta = 8 / 3
    const dt = 0.01

    const { x, y, z } = this.lorenzState

    const dx = sigma * (y - x) * dt
    const dy = (x * (rho - z) - y) * dt
    const dz = (x * y - beta * z) * dt

    this.lorenzState.x += dx
    this.lorenzState.y += dy
    this.lorenzState.z += dz
  }

  /**
   * Update the ambient drone with chaotic detuning from Lorenz attractor
   */
  private updateAmbientDrone(metrics: SimulationMetrics, now: number): void {
    if (!this.audioContext || this.ambientOscillators.length !== 3 || !this.ambientGain) return

    // Base frequency (all oscillators start at 90 Hz)
    const baseFreq = 90

    // Map Lorenz coordinates to detuning (-2 to +2 Hz)
    // Normalize Lorenz values (typical range is roughly -20 to +20)
    const detuning = [
      (this.lorenzState.x / 20) * 2, // ±2 Hz for first oscillator
      (this.lorenzState.y / 20) * 2, // ±2 Hz for second oscillator
      (this.lorenzState.z / 30) * 2, // ±2 Hz for third oscillator (z has different range)
    ]

    // Apply chaotic detuning to each oscillator
    for (let i = 0; i < 3; i++) {
      const targetFreq = baseFreq + detuning[i] + (metrics.batCount / 1000) * 10
      this.ambientOscillators[i].frequency.exponentialRampToValueAtTime(
        Math.max(20, targetFreq), // Prevent going below 20Hz
        now + 0.1 // Smooth but responsive
      )
    }

    // Modulate overall volume based on average energy
    const energyVolume = 0.3 + (metrics.averageEnergy / 7) * 0.3
    this.ambientGain.gain.exponentialRampToValueAtTime(
      energyVolume * this.config.ambientVolume,
      now + 0.5
    )
  }

  /**
   * Calculate sonar ping interval based on metrics
   */
  private getSonarInterval(metrics: SimulationMetrics): number {
    // More bats = more frequent pings
    const baseInterval = 0.5
    const densityFactor = Math.max(0.1, 1 - metrics.batCount / 1000)
    return baseInterval * densityFactor
  }

  /**
   * Trigger a sonar ping sound
   */
  private triggerSonarPing(metrics: SimulationMetrics): void {
    if (!this.audioContext || !this.sonarGain) return

    const now = this.audioContext.currentTime

    // Create short chirp (frequency sweep)
    const osc = this.audioContext.createOscillator()
    osc.type = 'sine'

    // Frequency based on behavior mode
    const baseFreq = this.getSonarFrequency(metrics.behaviorMode)
    const freqRange = 800

    osc.frequency.setValueAtTime(baseFreq + freqRange, now)
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.02)

    // Envelope
    const env = this.audioContext.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(0.15, now + 0.002)
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.03)

    osc.connect(env)
    env.connect(this.sonarGain)

    osc.start(now)
    osc.stop(now + 0.03)
  }

  /**
   * Get sonar frequency based on behavior mode
   */
  private getSonarFrequency(mode: BehaviorMode): number {
    switch (mode) {
      case 'calm':
        return 1000
      case 'roosting':
        return 800
      case 'foraging':
        return 1200
      case 'panic':
        return 1500
      case 'chaos':
        return 2000
    }
  }

  /**
   * Calculate flutter interval based on velocity
   */
  private getFlutterInterval(metrics: SimulationMetrics): number {
    const baseInterval = 0.3
    const velocityFactor = Math.max(0.1, 1 - metrics.averageVelocity)
    return baseInterval * velocityFactor
  }

  /**
   * Trigger wing flutter sound (granular synthesis)
   */
  private triggerFlutter(metrics: SimulationMetrics): void {
    if (!this.audioContext || !this.flutterGain) return

    const now = this.audioContext.currentTime

    // Create brief noise burst
    const bufferSize = this.audioContext.sampleRate * 0.05
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    // Generate filtered noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) // Decay envelope
    }

    const source = this.audioContext.createBufferSource()
    source.buffer = buffer

    // Filter to simulate wing flutter (low-mid frequencies)
    const filter = this.audioContext.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 200 + metrics.averageVelocity * 300
    filter.Q.value = 2

    // Envelope
    const env = this.audioContext.createGain()
    env.gain.setValueAtTime(0.08, now)
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.05)

    source.connect(filter)
    filter.connect(env)
    env.connect(this.flutterGain)

    source.start(now)
  }

  /**
   * Update chaos tones (dissonant harmonics)
   */
  private updateChaosTones(metrics: SimulationMetrics): void {
    if (!this.audioContext || !this.chaosGain) return

    const targetCount = Math.floor(metrics.chaosLevel * 3)

    // Remove excess oscillators
    while (this.chaosOscillators.length > targetCount) {
      const osc = this.chaosOscillators.pop()
      if (osc) {
        osc.stop()
        osc.disconnect()
      }
    }

    // Add new oscillators
    while (this.chaosOscillators.length < targetCount) {
      const osc = this.audioContext.createOscillator()
      osc.type = 'sawtooth'

      // Dissonant frequencies
      const baseFreq = 120
      const ratio = [1, 1.414, 1.732, 2.236][this.chaosOscillators.length] // Irrational ratios
      osc.frequency.value = baseFreq * ratio

      const gain = this.audioContext.createGain()
      gain.gain.value = 0.05 // Subtle

      osc.connect(gain)
      gain.connect(this.chaosGain)
      osc.start()

      this.chaosOscillators.push(osc)
    }

    // Modulate existing oscillators
    this.chaosOscillators.forEach((osc, i) => {
      const freq = 120 * [1, 1.414, 1.732, 2.236][i]
      const wobble = Math.sin(Date.now() * 0.001 + i) * metrics.chaosLevel * 10
      osc.frequency.setValueAtTime(freq + wobble, this.audioContext!.currentTime)
    })
  }

  /**
   * Trigger disturbance alert sound
   */
  private triggerDisturbanceAlert(metrics: SimulationMetrics): void {
    if (!this.audioContext || !this.sonarGain) return

    const now = this.audioContext.currentTime
    const intensity = Math.min(1, metrics.totalDisturbance / 200)

    // Sharp, attention-grabbing tone
    const osc = this.audioContext.createOscillator()
    osc.type = 'square'
    osc.frequency.value = 440 * (1 + intensity * 0.5)

    const env = this.audioContext.createGain()
    env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(0.1 * intensity, now + 0.01)
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.1)

    osc.connect(env)
    env.connect(this.sonarGain)

    osc.start(now)
    osc.stop(now + 0.1)
  }

  /**
   * Update configuration
   */
  setConfig(config: Partial<AudioConfig>): void {
    this.config = { ...this.config, ...config }

    if (this.masterGain) {
      this.masterGain.gain.value = this.config.masterVolume
    }
    if (this.ambientGain) {
      this.ambientGain.gain.value = this.config.ambientVolume
    }
    if (this.sonarGain) {
      this.sonarGain.gain.value = this.config.sonarVolume
    }
    if (this.flutterGain) {
      this.flutterGain.gain.value = this.config.flutterVolume
    }
    if (this.chaosGain) {
      this.chaosGain.gain.value = this.config.chaosVolume
    }
  }

  /**
   * Suspend audio context (pause)
   */
  async suspend(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'running') {
      await this.audioContext.suspend()
      this.config.enabled = false
    }
  }

  /**
   * Resume audio context
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
      this.config.enabled = true
    }
  }

  /**
   * Cleanup and stop all audio
   */
  destroy(): void {
    this.config.enabled = false

    this.ambientOscillators.forEach((osc) => {
      osc.stop()
      osc.disconnect()
    })
    this.ambientOscillators = []

    this.chaosOscillators.forEach((osc) => {
      osc.stop()
      osc.disconnect()
    })
    this.chaosOscillators = []

    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
  }

  /**
   * Get current config
   */
  getConfig(): AudioConfig {
    return { ...this.config }
  }

  /**
   * Check if audio is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled
  }
}
