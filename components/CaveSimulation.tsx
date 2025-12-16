'use client'

import { useEffect, useRef, useState } from 'react'
import {
  createSimulation,
  updateSimulation,
  addDisturbance,
  type SimulationState,
  type SimulationConfig,
} from '@/lib/batCaveSimulation'

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

  const simulationRef = useRef<SimulationState | null>(null)
  const rafRef = useRef<number>(0)
  const lastTickRef = useRef<number>(0)

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
  }, [seed, preset]) // Reinitialize on seed/preset change

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
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isPaused, speed, density, sonarSensitivity, wallRoughness])

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

    // Render bats (simplified - no shadows, simple triangles)
    ctx.fillStyle = '#a78bfa'

    for (let i = 0; i < grid.length; i++) {
      if (grid[i].occupied) {
        const x = i % width
        const y = Math.floor(i / width)
        const cx = x * cellWidth + cellWidth / 2
        const cy = y * cellHeight + cellHeight / 2

        // Simple triangle without rotation for performance
        const heading = grid[i].heading
        const angle = (heading * Math.PI) / 4

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)

        // Simple triangle (no shadow)
        ctx.beginPath()
        ctx.moveTo(0, -cellHeight / 3)
        ctx.lineTo(-cellWidth / 4, cellHeight / 4)
        ctx.lineTo(cellWidth / 4, cellHeight / 4)
        ctx.closePath()
        ctx.fill()

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
