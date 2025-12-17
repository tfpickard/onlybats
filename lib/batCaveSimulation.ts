/**
 * Bat Cave Cellular Automata Simulation
 * A perpetual simulation of bats flying in a cave using cellular automata
 */

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 // 8 directions

export interface BatCell {
  occupied: boolean
  heading: Direction
  energy: number // 0-7
}

export interface SimulationState {
  width: number
  height: number
  grid: BatCell[]
  sonarField: Float32Array
  guanoField: Float32Array
  disturbanceField: Float32Array
  tick: number
  seed: number
}

export interface SimulationConfig {
  width: number
  height: number
  density: number // 0-1
  sonarSensitivity: number // 0-1
  wallRoughness: number // 0-1
  seed: number
  preset?: 'random' | 'maternity-spiral' | 'guano-vortex' | 'tourist-panic' | 'cape-shadow'
}

// Direction vectors (8-way)
const DIRECTION_VECTORS: [number, number][] = [
  [0, -1],  // 0: N
  [1, -1],  // 1: NE
  [1, 0],   // 2: E
  [1, 1],   // 3: SE
  [0, 1],   // 4: S
  [-1, 1],  // 5: SW
  [-1, 0],  // 6: W
  [-1, -1], // 7: NW
]

// Seeded random number generator
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296
    return this.seed / 4294967296
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max)
  }
}

export function createSimulation(config: SimulationConfig): SimulationState {
  const { width, height, density, seed, preset } = config
  const size = width * height
  const rng = new SeededRandom(seed)

  const grid: BatCell[] = new Array(size).fill(null).map(() => ({
    occupied: false,
    heading: 0 as Direction,
    energy: 5,
  }))

  const sonarField = new Float32Array(size)
  const guanoField = new Float32Array(size)
  const disturbanceField = new Float32Array(size)

  // Initialize based on preset
  if (preset === 'maternity-spiral') {
    initMaternitySpiral(grid, width, height, density, rng)
  } else if (preset === 'guano-vortex') {
    initGuanoVortex(grid, width, height, density, rng)
  } else if (preset === 'tourist-panic') {
    initTouristPanic(grid, width, height, density, rng, disturbanceField)
  } else if (preset === 'cape-shadow') {
    initCapeShadow(grid, width, height, density, rng, disturbanceField)
  } else {
    initRandom(grid, width, height, density, rng)
  }

  return {
    width,
    height,
    grid,
    sonarField,
    guanoField,
    disturbanceField,
    tick: 0,
    seed,
  }
}

function initRandom(
  grid: BatCell[],
  width: number,
  height: number,
  density: number,
  rng: SeededRandom
): void {
  const size = width * height
  const count = Math.floor(size * density)

  for (let i = 0; i < count; i++) {
    const idx = rng.nextInt(size)
    grid[idx].occupied = true
    grid[idx].heading = rng.nextInt(8) as Direction
    grid[idx].energy = 5
  }
}

function initMaternitySpiral(
  grid: BatCell[],
  width: number,
  height: number,
  density: number,
  rng: SeededRandom
): void {
  const cx = width / 2
  const cy = height / 2
  const count = Math.floor(width * height * density)

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 6
    const radius = (i / count) * Math.min(width, height) / 3
    const x = Math.floor(cx + Math.cos(angle) * radius)
    const y = Math.floor(cy + Math.sin(angle) * radius)

    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = y * width + x
      grid[idx].occupied = true
      grid[idx].heading = Math.floor((angle / (Math.PI * 2)) * 8) as Direction
      grid[idx].energy = 5
    }
  }
}

function initGuanoVortex(
  grid: BatCell[],
  width: number,
  height: number,
  density: number,
  rng: SeededRandom
): void {
  const cx = width / 2
  const cy = height / 2
  const count = Math.floor(width * height * density)

  for (let i = 0; i < count; i++) {
    const angle = rng.next() * Math.PI * 2
    const radius = rng.next() * Math.min(width, height) / 3
    const x = Math.floor(cx + Math.cos(angle) * radius)
    const y = Math.floor(cy + Math.sin(angle) * radius)

    if (x >= 0 && x < width && y >= 0 && y < height) {
      const idx = y * width + x
      grid[idx].occupied = true
      // Heading perpendicular to radius (vortex)
      grid[idx].heading = Math.floor(((angle + Math.PI / 2) / (Math.PI * 2)) * 8) as Direction
      grid[idx].energy = 5
    }
  }
}

function initTouristPanic(
  grid: BatCell[],
  width: number,
  height: number,
  density: number,
  rng: SeededRandom,
  disturbanceField: Float32Array
): void {
  initRandom(grid, width, height, density, rng)

  // Add multiple disturbance points
  for (let i = 0; i < 5; i++) {
    const x = rng.nextInt(width)
    const y = rng.nextInt(height)
    addDisturbance(disturbanceField, width, height, x, y, 30)
  }
}

function initCapeShadow(
  grid: BatCell[],
  width: number,
  height: number,
  density: number,
  rng: SeededRandom,
  disturbanceField: Float32Array
): void {
  initRandom(grid, width, height, density, rng)

  // Add a large cape-shaped disturbance
  const cx = width / 2
  const cy = height / 3
  addDisturbance(disturbanceField, width, height, cx, cy, 50)
}

export function addDisturbance(
  field: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number,
  strength: number
): void {
  const radius = 20

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const nx = x + dx
      const ny = y + dy
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist <= radius) {
          const idx = ny * width + nx
          const falloff = 1 - dist / radius
          field[idx] = Math.min(100, field[idx] + strength * falloff)
        }
      }
    }
  }
}

export function updateSimulation(
  state: SimulationState,
  config: SimulationConfig
): void {
  const { width, height, grid, sonarField, guanoField, disturbanceField } = state
  const { sonarSensitivity, wallRoughness } = config
  const rng = new SeededRandom(state.seed + state.tick)

  // Phase 1: Sonar ping
  sonarField.fill(0)
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].occupied) {
      const x = i % width
      const y = Math.floor(i / width)
      const [dx, dy] = DIRECTION_VECTORS[grid[i].heading]

      // Forward cone sonar
      for (let d = 1; d <= 5; d++) {
        const nx = x + dx * d
        const ny = y + dy * d
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const idx = ny * width + nx
          sonarField[idx] += (5 - d) * sonarSensitivity
        }
      }
    }
  }

  // Sonar field fast decay
  for (let i = 0; i < sonarField.length; i++) {
    sonarField[i] *= 0.7
  }

  // Phase 2: Guano trail
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].occupied) {
      guanoField[i] = Math.min(100, guanoField[i] + 0.5)
    }
  }

  // Guano diffusion
  const tempGuano = new Float32Array(guanoField)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x
      let sum = guanoField[idx] * 0.6
      sum += guanoField[idx - 1] * 0.1
      sum += guanoField[idx + 1] * 0.1
      sum += guanoField[idx - width] * 0.1
      sum += guanoField[idx + width] * 0.1
      tempGuano[idx] = sum * 0.98 // slow decay
    }
  }
  guanoField.set(tempGuano)

  // Phase 3: Disturbance decay
  for (let i = 0; i < disturbanceField.length; i++) {
    disturbanceField[i] *= 0.9
  }

  // Phase 4: Steering and movement
  const newGrid: BatCell[] = grid.map((cell) => ({ ...cell }))

  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].occupied) continue

    const x = i % width
    const y = Math.floor(i / width)
    const cell = grid[i]

    // Calculate steering preferences
    const turnOptions = [-1, 0, 1] // left, straight, right
    const scores: number[] = []

    for (const turn of turnOptions) {
      let score = 0
      const newHeading = ((cell.heading + turn + 8) % 8) as Direction
      const [dx, dy] = DIRECTION_VECTORS[newHeading]
      const nx = x + dx
      const ny = y + dy

      // Wall avoidance
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
        score -= 100
      } else {
        const nidx = ny * width + nx

        // Collision avoidance
        if (grid[nidx].occupied) {
          score -= 50
        }

        // Avoid high sonar (crowding)
        score -= sonarField[nidx] * 2

        // Flee disturbance
        score -= disturbanceField[nidx] * 3

        // Prefer guano gradient perpendicular (swirl)
        const perpHeading1 = ((newHeading + 2) % 8) as Direction
        const perpHeading2 = ((newHeading + 6) % 8) as Direction
        const [pdx1, pdy1] = DIRECTION_VECTORS[perpHeading1]
        const [pdx2, pdy2] = DIRECTION_VECTORS[perpHeading2]

        const px1 = nx + pdx1
        const py1 = ny + pdy1
        const px2 = nx + pdx2
        const py2 = ny + pdy2

        if (px1 >= 0 && px1 < width && py1 >= 0 && py1 < height) {
          score += guanoField[py1 * width + px1] * 0.1
        }
        if (px2 >= 0 && px2 < width && py2 >= 0 && py2 < height) {
          score += guanoField[py2 * width + px2] * 0.1
        }
      }

      // Add tiny noise
      score += (rng.next() - 0.5) * wallRoughness * 5

      scores.push(score)
    }

    // Softmax selection
    const maxScore = Math.max(...scores)
    const expScores = scores.map((s) => Math.exp((s - maxScore) / 5))
    const sumExp = expScores.reduce((a, b) => a + b, 0)
    const probabilities = expScores.map((e) => e / sumExp)

    // Select turn
    const rand = rng.next()
    let cumProb = 0
    let selectedTurn = 0
    for (let j = 0; j < probabilities.length; j++) {
      cumProb += probabilities[j]
      if (rand <= cumProb) {
        selectedTurn = turnOptions[j]
        break
      }
    }

    const newHeading = ((cell.heading + selectedTurn + 8) % 8) as Direction
    const [dx, dy] = DIRECTION_VECTORS[newHeading]
    const nx = x + dx
    const ny = y + dy

    // Movement
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nidx = ny * width + nx
      if (!newGrid[nidx].occupied) {
        // Move
        newGrid[i].occupied = false
        newGrid[nidx].occupied = true
        newGrid[nidx].heading = newHeading
        newGrid[nidx].energy = Math.min(7, cell.energy + 1)
      } else {
        // Stuck
        newGrid[i].energy = Math.max(0, cell.energy - 1)
      }
    } else {
      // Hit wall
      newGrid[i].energy = Math.max(0, cell.energy - 1)
    }
  }

  // Phase 5: Energy and respawn
  const roostPoints = [
    { x: Math.floor(width * 0.1), y: Math.floor(height * 0.1) },
    { x: Math.floor(width * 0.9), y: Math.floor(height * 0.1) },
    { x: Math.floor(width * 0.5), y: Math.floor(height * 0.5) },
  ]

  let activeBats = 0
  for (let i = 0; i < newGrid.length; i++) {
    if (newGrid[i].occupied) {
      activeBats++
      if (newGrid[i].energy === 0) {
        // Hang for respawn
        newGrid[i].occupied = false
      }
    }
  }

  // Maintain minimum population
  const minPop = Math.floor(width * height * config.density * 0.8)
  let attempts = 0
  const maxAttempts = minPop * 10 // Prevent infinite loop

  while (activeBats < minPop && attempts < maxAttempts) {
    attempts++

    // Try roost points first
    if (attempts < roostPoints.length * 3) {
      const roost = roostPoints[attempts % roostPoints.length]
      const idx = roost.y * width + roost.x
      if (!newGrid[idx].occupied) {
        newGrid[idx].occupied = true
        newGrid[idx].heading = rng.nextInt(8) as Direction
        newGrid[idx].energy = 5
        activeBats++
      }
    } else {
      // Fall back to random positions if roosts are full
      const x = rng.nextInt(width)
      const y = rng.nextInt(height)
      const idx = y * width + x
      if (!newGrid[idx].occupied) {
        newGrid[idx].occupied = true
        newGrid[idx].heading = rng.nextInt(8) as Direction
        newGrid[idx].energy = 5
        activeBats++
      }
    }
  }

  state.grid = newGrid
  state.tick++

  // Global events (scheduled)
  if (state.tick % 500 === 0) {
    // Tourist flash
    const x = rng.nextInt(width)
    const y = rng.nextInt(height)
    addDisturbance(disturbanceField, width, height, x, y, 40)
  }

  if (state.tick % 1000 === 0) {
    // Cape Shadow event
    const cx = width / 2
    const cy = rng.nextInt(height)
    addDisturbance(disturbanceField, width, height, cx, cy, 30)
  }
}
