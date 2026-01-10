'use client'

import { useEffect, useRef, useState } from 'react'
import {
  createSimulation,
  updateSimulation,
  addDisturbance,
  type BatCell,
  type SimulationState,
  type SimulationConfig,
} from '@/lib/batCaveSimulation'

interface CaveSimulationProps {
  onViewerCountUpdate?: (count: number) => void
}

type ListeningMode = 'single' | 'colony' | 'cave'

interface SonificationNodes {
  masterGain: GainNode
  singleOsc: OscillatorNode
  singleGain: GainNode
  chorusOscillators: OscillatorNode[]
  chorusGain: GainNode
  lfo: OscillatorNode
  lfoGain: GainNode
  caveNoise: AudioBufferSourceNode
  caveFilter: BiquadFilterNode
  caveDelay: DelayNode
  caveFeedback: GainNode
  caveGain: GainNode
}

export default function CaveSimulation({ onViewerCountUpdate }: CaveSimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [density, setDensity] = useState(0.08) // Reduced for better performance
  const [sonarSensitivity, setSonarSensitivity] = useState(0.5)
  const [wallRoughness, setWallRoughness] = useState(0.5)
  const [preset, setPreset] = useState<'random' | 'maternity-spiral' | 'guano-vortex' | 'tourist-panic' | 'cape-shadow'>('random')
  const [seed, setSeed] = useState(42)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [audioMode, setAudioMode] = useState<ListeningMode>('colony')
  const [audioVolume, setAudioVolume] = useState(0.35)

  const simulationRef = useRef<SimulationState | null>(null)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioNodesRef = useRef<SonificationNodes | null>(null)

  // Initialize simulation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Reduced grid size for better performance
    const width = 100
    const height = 75

    const config: SimulationConfig = {
      width,
      height,
      density,
      sonarSensitivity,
      wallRoughness,
      seed,
      preset,
    }

    simulationRef.current = createSimulation(config)
    lastTickRef.current = 0 // Reset timing when simulation is recreated
  }, [seed, preset]) // Reinitialize on seed/preset change

  useEffect(() => {
    if (!audioEnabled) {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
        audioNodesRef.current = null
      }
      return
    }

    const audioContext = new AudioContext()
    const masterGain = audioContext.createGain()
    masterGain.gain.value = audioVolume
    masterGain.connect(audioContext.destination)

    const singleOsc = audioContext.createOscillator()
    singleOsc.type = 'sine'
    const singleGain = audioContext.createGain()
    singleGain.gain.value = 0
    singleOsc.connect(singleGain)
    singleGain.connect(masterGain)

    const chorusOscillators = Array.from({ length: 4 }, () => {
      const osc = audioContext.createOscillator()
      osc.type = 'triangle'
      return osc
    })
    const chorusGain = audioContext.createGain()
    chorusGain.gain.value = 0
    chorusOscillators.forEach((osc) => {
      osc.connect(chorusGain)
    })
    chorusGain.connect(masterGain)

    const lfo = audioContext.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.2
    const lfoGain = audioContext.createGain()
    lfoGain.gain.value = 12
    lfo.connect(lfoGain)
    chorusOscillators.forEach((osc) => lfoGain.connect(osc.detune))

    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.5
    }

    const caveNoise = audioContext.createBufferSource()
    caveNoise.buffer = noiseBuffer
    caveNoise.loop = true
    const caveFilter = audioContext.createBiquadFilter()
    caveFilter.type = 'bandpass'
    caveFilter.frequency.value = 260
    caveFilter.Q.value = 0.8

    const caveDelay = audioContext.createDelay(1.0)
    caveDelay.delayTime.value = 0.18
    const caveFeedback = audioContext.createGain()
    caveFeedback.gain.value = 0.45
    caveDelay.connect(caveFeedback)
    caveFeedback.connect(caveDelay)

    const caveGain = audioContext.createGain()
    caveGain.gain.value = 0

    caveNoise.connect(caveFilter)
    caveFilter.connect(caveDelay)
    caveDelay.connect(caveGain)
    caveGain.connect(masterGain)

    const nodes: SonificationNodes = {
      masterGain,
      singleOsc,
      singleGain,
      chorusOscillators,
      chorusGain,
      lfo,
      lfoGain,
      caveNoise,
      caveFilter,
      caveDelay,
      caveFeedback,
      caveGain,
    }

    audioContextRef.current = audioContext
    audioNodesRef.current = nodes

    singleOsc.start()
    chorusOscillators.forEach((osc) => osc.start())
    lfo.start()
    caveNoise.start()

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    return () => {
      audioContext.close()
      audioContextRef.current = null
      audioNodesRef.current = null
    }
  }, [audioEnabled])

  useEffect(() => {
    if (audioNodesRef.current) {
      audioNodesRef.current.masterGain.gain.setTargetAtTime(audioVolume, audioContextRef.current?.currentTime ?? 0, 0.05)
    }
  }, [audioVolume])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastRenderTime = 0
    const targetFPS = 30 // Reduced for better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      rafRef.current = requestAnimationFrame(animate)

      // Limit rendering to target FPS
      if (currentTime - lastRenderTime < frameInterval) return
      lastRenderTime = currentTime

      // Update simulation at variable speed
      if (!isPaused && simulationRef.current) {
        const timeSinceLastTick = currentTime - lastTickRef.current
        const tickInterval = 50 / speed // Base 50ms per tick

        if (timeSinceLastTick >= tickInterval) {
          const config: SimulationConfig = {
            width: simulationRef.current.width,
            height: simulationRef.current.height,
            density,
            sonarSensitivity,
            wallRoughness,
            seed: simulationRef.current.seed,
          }
          updateSimulation(simulationRef.current, config)
          lastTickRef.current = currentTime
        }
      }

      // Render
      if (simulationRef.current) {
        render(ctx, simulationRef.current)
        if (audioEnabled && audioContextRef.current && audioNodesRef.current) {
          updateSonification(simulationRef.current, audioContextRef.current, audioNodesRef.current, audioMode, isPaused)
        }
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isPaused, speed, density, sonarSensitivity, wallRoughness, preset, seed, audioEnabled, audioMode, audioVolume])

  const updateSonification = (
    state: SimulationState,
    audioContext: AudioContext,
    nodes: SonificationNodes,
    mode: ListeningMode,
    paused: boolean
  ) => {
    const { grid, sonarField, disturbanceField, tick } = state
    let sonarSum = 0
    let sonarPeak = 0
    let activeCells = 0
    let disturbanceSum = 0
    let batCount = 0
    let focusedBat: BatCell | null = null

    for (let i = 0; i < sonarField.length; i++) {
      const value = sonarField[i]
      sonarSum += value
      sonarPeak = Math.max(sonarPeak, value)
      if (value > 1) activeCells += 1
      disturbanceSum += disturbanceField[i]
      if (grid[i].occupied && !focusedBat) {
        focusedBat = grid[i]
      }
      if (grid[i].occupied) batCount += 1
    }

    const avg = sonarSum / sonarField.length
    const peak = Math.min(1, sonarPeak / 10)
    const activity = Math.min(1, activeCells / sonarField.length * 6)
    const densityRatio = batCount / grid.length
    const disturbanceAvg = disturbanceSum / disturbanceField.length
    const now = audioContext.currentTime

    const basePulse = Math.max(0, Math.sin(now * (2 + activity * 8)))
    const pausedGain = paused ? 0 : 1

    const singleTarget = mode === 'single' ? 0.6 * pausedGain : 0
    const chorusTarget = mode === 'colony' ? 0.5 * pausedGain : 0
    const caveTarget = mode === 'cave' ? 0.5 * pausedGain : 0

    nodes.singleGain.gain.setTargetAtTime(singleTarget, now, 0.08)
    nodes.chorusGain.gain.setTargetAtTime(chorusTarget, now, 0.08)
    nodes.caveGain.gain.setTargetAtTime(caveTarget, now, 0.12)

    if (mode === 'single') {
      const headingScale = [220, 247, 262, 294, 330, 349, 392, 440]
      const heading = focusedBat?.heading ?? 0
      const energy = focusedBat?.energy ?? 4
      const baseFrequency = headingScale[heading] + energy * 15
      const chirpFrequency = baseFrequency + peak * 900
      nodes.singleOsc.frequency.setTargetAtTime(chirpFrequency, now, 0.03)
      nodes.singleGain.gain.setTargetAtTime(singleTarget * (0.2 + basePulse * 0.8), now, 0.05)
    }

    if (mode === 'colony') {
      const baseFrequency = 160 + avg * 45 + densityRatio * 280
      const detuneSpread = 4 + activity * 18
      nodes.chorusOscillators.forEach((osc, index) => {
        const ratio = 1 + index * 0.03
        osc.frequency.setTargetAtTime(baseFrequency * ratio, now, 0.08)
        osc.detune.setTargetAtTime((index - 1.5) * detuneSpread * 2, now, 0.08)
      })
      nodes.lfo.frequency.setTargetAtTime(0.15 + activity * 0.6, now, 0.1)
      nodes.chorusGain.gain.setTargetAtTime(chorusTarget * (0.3 + activity * 0.7), now, 0.1)
    }

    if (mode === 'cave') {
      const resonance = Math.min(1, (disturbanceAvg / 15) + peak * 0.7 + densityRatio * 0.5)
      nodes.caveFilter.frequency.setTargetAtTime(180 + avg * 80 + peak * 300, now, 0.1)
      nodes.caveFilter.Q.setTargetAtTime(0.6 + resonance * 2, now, 0.1)
      nodes.caveDelay.delayTime.setTargetAtTime(0.12 + densityRatio * 0.18, now, 0.1)
      nodes.caveFeedback.gain.setTargetAtTime(0.25 + resonance * 0.35, now, 0.1)
      nodes.caveGain.gain.setTargetAtTime(caveTarget * (0.2 + resonance * 0.8), now, 0.1)
    }

    if (paused) {
      nodes.singleGain.gain.setTargetAtTime(0, now, 0.1)
      nodes.chorusGain.gain.setTargetAtTime(0, now, 0.1)
      nodes.caveGain.gain.setTargetAtTime(0, now, 0.1)
    }

    nodes.singleOsc.frequency.setTargetAtTime(nodes.singleOsc.frequency.value, now, 0.01)
    nodes.chorusOscillators.forEach((osc) => {
      osc.frequency.setTargetAtTime(osc.frequency.value, now, 0.01)
    })
    nodes.caveFilter.frequency.setTargetAtTime(nodes.caveFilter.frequency.value, now, 0.01)

    if (tick % 120 === 0 && mode === 'colony') {
      nodes.lfoGain.gain.setTargetAtTime(10 + activity * 25, now, 0.2)
    }
  }

  const render = (ctx: CanvasRenderingContext2D, state: SimulationState) => {
    const { width, height, grid, sonarField, guanoField, disturbanceField } = state
    const canvas = ctx.canvas
    const cellWidth = canvas.width / width
    const cellHeight = canvas.height / height

    // Clear with cave darkness
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Optimized field rendering - only draw significant values
    const minFieldThreshold = 0.5

    // Render guano field (batch similar intensities)
    ctx.globalAlpha = 0.2
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        if (guanoField[idx] > minFieldThreshold) {
          const intensity = Math.min(1, guanoField[idx] / 50)
          const alpha = intensity * 0.2
          ctx.fillStyle = `rgba(161, 98, 7, ${alpha})`
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
        }
      }
    }
    ctx.globalAlpha = 1

    // Render sonar field (simplified - no arcs, just rectangles)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        if (sonarField[idx] > minFieldThreshold) {
          const intensity = Math.min(1, sonarField[idx] / 10)
          const alpha = intensity * 0.4
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
          ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
        }
      }
    }

    // Render disturbance field (simplified - no arcs)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x
        if (disturbanceField[idx] > minFieldThreshold) {
          const intensity = Math.min(1, disturbanceField[idx] / 50)
          const alpha = intensity * 0.6
          ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`
          const size = cellWidth * (1 + intensity)
          ctx.fillRect(
            x * cellWidth - size / 4,
            y * cellHeight - size / 4,
            size,
            size
          )
        }
      }
    }

    // Render bats with Unicode bat emoji
    const batEmojis = ['🦇', '🦇', '🦇', '🦇'] // Could add variations
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Use larger font for better visibility
    const fontSize = Math.max(cellWidth * 1.5, 12)
    ctx.font = `${fontSize}px Arial`

    for (let i = 0; i < grid.length; i++) {
      if (grid[i].occupied) {
        const x = i % width
        const y = Math.floor(i / width)
        const cx = x * cellWidth + cellWidth / 2
        const cy = y * cellHeight + cellHeight / 2

        // Get bat emoji (vary based on energy level)
        const energy = grid[i].energy
        const batEmoji = batEmojis[0] // Simple for now, could add variety

        // Heading-based rotation
        const heading = grid[i].heading
        const angle = (heading * Math.PI) / 4

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)

        // Add glow effect for bats
        ctx.shadowColor = '#a78bfa'
        ctx.shadowBlur = 8

        // Draw bat emoji
        ctx.fillText(batEmoji, 0, 0)

        ctx.shadowBlur = 0
        ctx.restore()
      }
    }
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const sim = simulationRef.current
    if (!canvas || !sim) return

    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * sim.width)
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * sim.height)

    addDisturbance(sim.disturbanceField, sim.width, sim.height, x, y, 50)
  }

  const handleReset = () => {
    if (!simulationRef.current) return

    const config: SimulationConfig = {
      width: simulationRef.current.width,
      height: simulationRef.current.height,
      density,
      sonarSensitivity,
      wallRoughness,
      seed,
      preset,
    }

    simulationRef.current = createSimulation(config)
  }

  const handleAudioToggle = () => {
    setAudioEnabled((prev) => !prev)
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-2 border-bat-primary rounded-lg shadow-xl cursor-crosshair"
          onClick={handleCanvasClick}
          style={{ background: '#0a0a0a' }}
        />
        <div className="absolute top-4 right-4 bg-cave-dark bg-opacity-90 px-4 py-2 rounded-lg text-sm">
          <div className="text-bat-primary font-bold">Collective Echolocation</div>
          <div className="text-gray-400">
            Tick: {simulationRef.current?.tick || 0}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-4xl bg-cave-dark border border-cave-light rounded-lg p-6 space-y-4">
        <div className="rounded-lg border border-cave-light bg-cave-medium/30 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-bat-primary font-semibold">Echolocation Sonification Engine</div>
              <p className="text-xs text-gray-400">
                Frequency-shifted chirps and interference tones from the live sonar field.
              </p>
            </div>
            <button
              onClick={handleAudioToggle}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                audioEnabled
                  ? 'bg-bat-primary text-white'
                  : 'bg-cave-light text-gray-300 hover:bg-cave-medium'
              }`}
            >
              {audioEnabled ? 'Disable Audio' : 'Enable Audio'}
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="block text-bat-secondary text-sm mb-2">
                Listening Mode
              </label>
              <select
                value={audioMode}
                onChange={(e) => setAudioMode(e.target.value as ListeningMode)}
                className="w-full rounded-lg border border-cave-light bg-cave-dark px-3 py-2 text-sm text-gray-200"
                disabled={!audioEnabled}
              >
                <option value="single">Single Bat POV</option>
                <option value="colony">Colony Chorus</option>
                <option value="cave">Cave Resonance</option>
              </select>
            </div>
            <div>
              <label className="block text-bat-secondary text-sm mb-2">
                Output Level: {(audioVolume * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioVolume}
                onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                className="w-full"
                disabled={!audioEnabled}
              />
            </div>
            <div className="text-xs text-gray-500 md:pt-6">
              Best with headphones. Audio begins after enabling due to browser policies.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-6 py-2 bg-bat-primary hover:bg-bat-secondary text-white rounded-lg font-medium transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-cave-light hover:bg-cave-medium text-gray-300 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speed */}
          <div>
            <label className="block text-bat-secondary text-sm mb-2">
              Speed: {speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Density */}
          <div>
            <label className="block text-bat-secondary text-sm mb-2">
              Density: {(density * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={density}
              onChange={(e) => setDensity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Sonar Sensitivity */}
          <div>
            <label className="block text-bat-secondary text-sm mb-2">
              Sonar Sensitivity: {(sonarSensitivity * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sonarSensitivity}
              onChange={(e) => setSonarSensitivity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Wall Roughness */}
          <div>
            <label className="block text-bat-secondary text-sm mb-2">
              Wall Roughness: {(wallRoughness * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={wallRoughness}
              onChange={(e) => setWallRoughness(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Presets */}
        <div>
          <label className="block text-bat-secondary text-sm mb-2">Preset</label>
          <div className="flex flex-wrap gap-2">
            {(['random', 'maternity-spiral', 'guano-vortex', 'tourist-panic', 'cape-shadow'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  preset === p
                    ? 'bg-bat-primary text-white'
                    : 'bg-cave-medium text-gray-400 hover:bg-cave-light'
                }`}
              >
                {p.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Seed */}
        <div>
          <label className="block text-bat-secondary text-sm mb-2">Seed</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(parseInt(e.target.value) || 0)}
              className="flex-1 px-4 py-2 bg-cave-medium border border-cave-light rounded-lg text-gray-300"
            />
            <button
              onClick={() => setSeed(Math.floor(Math.random() * 100000))}
              className="px-4 py-2 bg-cave-light hover:bg-cave-medium text-gray-300 rounded-lg text-sm transition-colors"
            >
              Random
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t border-cave-light">
          Click or drag on the cave to inject disturbances • Some tourist waved their phone flashlight again
        </div>
      </div>
    </div>
  )
}
