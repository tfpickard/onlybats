'use client'

import { useEffect, useRef, useState } from 'react'
import {
  createSimulation,
  updateSimulation,
  addDisturbance,
  type SimulationState,
  type SimulationConfig,
  type BehaviorMode,
} from '@/lib/batCaveSimulation'
import { BatCaveAudioEngine } from '@/lib/batCaveAudio'

interface CaveSimulationProps {
  onViewerCountUpdate?: (count: number) => void
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
  const [behaviorMode, setBehaviorMode] = useState<BehaviorMode>('calm')
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [masterVolume, setMasterVolume] = useState(0.3)
  const [leaderGravityMean, setLeaderGravityMean] = useState(0.3)
  const [leaderGravityVariance, setLeaderGravityVariance] = useState(0.15)
  const [leaderInfluence, setLeaderInfluence] = useState(0.5)

  const simulationRef = useRef<SimulationState | null>(null)
  const audioEngineRef = useRef<BatCaveAudioEngine | null>(null)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)

  // Initialize audio engine
  useEffect(() => {
    audioEngineRef.current = new BatCaveAudioEngine({
      masterVolume,
    })

    return () => {
      audioEngineRef.current?.destroy()
    }
  }, [])

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
      behaviorMode,
      leaderGravityMean,
      leaderGravityVariance,
      leaderInfluence,
    }

    simulationRef.current = createSimulation(config)
    lastTickRef.current = 0 // Reset timing when simulation is recreated
  }, [seed, preset, behaviorMode, density, sonarSensitivity, wallRoughness, leaderGravityMean, leaderGravityVariance, leaderInfluence])

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
            leaderGravityMean,
            leaderGravityVariance,
            leaderInfluence,
          }
          updateSimulation(simulationRef.current, config)
          lastTickRef.current = currentTime
        }
      }

      // Render
      if (simulationRef.current) {
        render(ctx, simulationRef.current)

        // Update audio based on simulation metrics
        if (audioEngineRef.current && audioEnabled) {
          audioEngineRef.current.update(simulationRef.current.metrics)
        }
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isPaused, speed, density, sonarSensitivity, wallRoughness, preset, seed, behaviorMode, audioEnabled])

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
      behaviorMode,
      leaderGravityMean,
      leaderGravityVariance,
      leaderInfluence,
    }

    simulationRef.current = createSimulation(config)
  }

  const toggleAudio = async () => {
    if (!audioEngineRef.current) return

    if (audioEnabled) {
      await audioEngineRef.current.suspend()
      setAudioEnabled(false)
    } else {
      if (!audioEngineRef.current.isEnabled()) {
        await audioEngineRef.current.initialize()
      } else {
        await audioEngineRef.current.resume()
      }
      setAudioEnabled(true)
    }
  }

  const handleVolumeChange = (volume: number) => {
    setMasterVolume(volume)
    audioEngineRef.current?.setConfig({ masterVolume: volume })
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
        <div className="absolute top-4 right-4 bg-cave-dark bg-opacity-90 px-4 py-2 rounded-lg text-sm space-y-1">
          <div className="text-bat-primary font-bold">Collective Echolocation</div>
          <div className="text-gray-400">
            Tick: {simulationRef.current?.tick || 0}
          </div>
          {simulationRef.current && (
            <>
              <div className="text-bat-secondary text-xs">
                Mode: <span className="capitalize">{simulationRef.current.behaviorMode}</span>
              </div>
              <div className="text-gray-500 text-xs">
                Bats: {simulationRef.current.metrics.batCount} |
                Clusters: {simulationRef.current.metrics.clusterCount}
              </div>
              <div className="text-gray-500 text-xs">
                Velocity: {(simulationRef.current.metrics.averageVelocity * 100).toFixed(0)}% |
                Chaos: {(simulationRef.current.metrics.chaosLevel * 100).toFixed(0)}%
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-4xl bg-cave-dark border border-cave-light rounded-lg p-6 space-y-4">
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
          <button
            onClick={toggleAudio}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              audioEnabled
                ? 'bg-bat-primary hover:bg-bat-secondary text-white'
                : 'bg-cave-light hover:bg-cave-medium text-gray-300'
            }`}
          >
            Audio: {audioEnabled ? 'ON' : 'OFF'}
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

          {/* Audio Volume */}
          <div>
            <label className="block text-bat-secondary text-sm mb-2">
              Audio Volume: {(masterVolume * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={masterVolume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full"
              disabled={!audioEnabled}
            />
          </div>
        </div>

        {/* Leader Gravity Controls */}
        <div className="border-t border-cave-light pt-4">
          <h3 className="text-bat-secondary text-sm font-medium mb-3">Leader Gravity (Gaussian Distribution)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leader Gravity Mean */}
            <div>
              <label className="block text-bat-secondary text-sm mb-2">
                Mean: {leaderGravityMean.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={leaderGravityMean}
                onChange={(e) => setLeaderGravityMean(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Center of leader distribution</p>
            </div>

            {/* Leader Gravity Variance */}
            <div>
              <label className="block text-bat-secondary text-sm mb-2">
                Variance: {leaderGravityVariance.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.05"
                value={leaderGravityVariance}
                onChange={(e) => setLeaderGravityVariance(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Spread of leadership values</p>
            </div>

            {/* Leader Influence */}
            <div>
              <label className="block text-bat-secondary text-sm mb-2">
                Influence: {(leaderInfluence * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={leaderInfluence}
                onChange={(e) => setLeaderInfluence(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Strength of leader attraction</p>
            </div>
          </div>
        </div>

        {/* Behavior Mode */}
        <div>
          <label className="block text-bat-secondary text-sm mb-2">Behavior Mode</label>
          <div className="flex flex-wrap gap-2">
            {(['calm', 'roosting', 'foraging', 'panic', 'chaos'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setBehaviorMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  behaviorMode === mode
                    ? 'bg-bat-primary text-white'
                    : 'bg-cave-medium text-gray-400 hover:bg-cave-light'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {behaviorMode === 'calm' && 'Balanced flocking with gentle movement'}
            {behaviorMode === 'roosting' && 'Tight clustering with minimal movement'}
            {behaviorMode === 'foraging' && 'Active exploration with dispersed behavior'}
            {behaviorMode === 'panic' && 'Chaotic scattering from disturbances'}
            {behaviorMode === 'chaos' && 'Unpredictable emergent patterns'}
          </p>
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
