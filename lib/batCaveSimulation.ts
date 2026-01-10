/**
 * Bat Cave Cellular Automata Simulation
 * A perpetual simulation of bats flying in a cave using cellular automata
 */

export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 // 8 directions

export type BehaviorMode = 'calm' | 'roosting' | 'foraging' | 'panic' | 'chaos'

export interface BatCell {
  occupied: boolean
  heading: Direction
  energy: number // 0-7
  velocity: number // 0-1, tracks recent movement success
}

export interface SimulationMetrics {
  batCount: number
  averageVelocity: number
  averageEnergy: number
  clusterCount: number
  largestClusterSize: number
  totalDisturbance: number
  chaosLevel: number // 0-1, measure of entropy/unpredictability
  behaviorMode: BehaviorMode
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
  metrics: SimulationMetrics
  behaviorMode: BehaviorMode
}

export interface SimulationConfig {
  width: number
  height: number
  density: number // 0-1
  sonarSensitivity: number // 0-1
  wallRoughness: number // 0-1
  seed: number
  preset?: 'random' | 'maternity-spiral' | 'guano-vortex' | 'tourist-panic' | 'cape-shadow'
  behaviorMode?: BehaviorMode
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
  const { width, height, density, seed, preset, behaviorMode = 'calm' } = config
  const size = width * height
  const rng = new SeededRandom(seed)

  const grid: BatCell[] = new Array(size).fill(null).map(() => ({
    occupied: false,
    heading: 0 as Direction,
    energy: 5,
    velocity: 0.5,
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

  const metrics: SimulationMetrics = {
    batCount: 0,
    averageVelocity: 0,
    averageEnergy: 0,
    clusterCount: 0,
    largestClusterSize: 0,
    totalDisturbance: 0,
    chaosLevel: 0,
    behaviorMode,
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
    metrics,
    behaviorMode,
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
      grid[idx].heading = (Math.floor((angle / (Math.PI * 2)) * 8) % 8) as Direction
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
      grid[idx].heading = (Math.floor(((angle + Math.PI / 2) / (Math.PI * 2)) * 8) % 8) as Direction
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

/**
 * Behavior mode parameters for different collective behaviors
 */
interface BehaviorParameters {
  alignment: number // How much to match neighbor headings
  cohesion: number // How much to move toward group center
  separation: number // How much to avoid crowding
  disturbanceAvoidance: number // How much to flee disturbances
  trailFollowing: number // How much to follow guano trails
  randomness: number // Noise multiplier for chaos
}

function getBehaviorParameters(mode: BehaviorMode): BehaviorParameters {
  switch (mode) {
    case 'calm':
      return {
        alignment: 3,
        cohesion: 2,
        separation: 4,
        disturbanceAvoidance: 5,
        trailFollowing: 0.15,
        randomness: 8,
      }
    case 'roosting':
      return {
        alignment: 5, // Strong alignment when roosting
        cohesion: 8, // Very strong cohesion - cluster tightly
        separation: 2, // Low separation - OK to be close
        disturbanceAvoidance: 3, // Less reactive
        trailFollowing: 0.05,
        randomness: 2, // Minimal randomness
      }
    case 'foraging':
      return {
        alignment: 2, // Medium alignment
        cohesion: 1, // Low cohesion - spread out
        separation: 6, // High separation - explore independently
        disturbanceAvoidance: 4,
        trailFollowing: 0.25, // Follow trails more
        randomness: 12, // Higher randomness for exploration
      }
    case 'panic':
      return {
        alignment: 1, // Low alignment - chaotic
        cohesion: 0, // No cohesion - scatter
        separation: 8, // Very high separation
        disturbanceAvoidance: 15, // Extreme avoidance
        trailFollowing: 0,
        randomness: 20, // Very high randomness
      }
    case 'chaos':
      return {
        alignment: 1,
        cohesion: 1,
        separation: 3,
        disturbanceAvoidance: 2,
        trailFollowing: 0.1,
        randomness: 30, // Maximum randomness
      }
  }
}

/**
 * Lorenz attractor for chaotic movement patterns
 * Returns a value influenced by chaotic dynamics
 */
function getLorenzAttractor(x: number, y: number, t: number): number {
  const sigma = 10
  const rho = 28
  const beta = 8 / 3

  // Use normalized position and time to generate chaos
  const tx = (x - 0.5) * 20
  const ty = (y - 0.5) * 20
  const tz = (t % 1000) / 10

  // Simplified Lorenz equations (single step approximation)
  const dx = sigma * (ty - tx)
  const dy = tx * (rho - tz) - ty
  const dz = tx * ty - beta * tz

  // Return combined influence
  return Math.sin(dx * 0.1) * Math.cos(dy * 0.1) + Math.sin(dz * 0.05)
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

  // Phase 4: Enhanced Steering and Movement with Flocking Behavior
  const newGrid: BatCell[] = grid.map((cell) => ({ ...cell }))

  // First pass: Calculate neighborhood information for flocking
  const neighborhoodRadius = 5
  const flockingInfo: Array<{
    nearbyCount: number
    avgHeading: number
    centerX: number
    centerY: number
  }> = []

  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].occupied) {
      flockingInfo.push({ nearbyCount: 0, avgHeading: 0, centerX: 0, centerY: 0 })
      continue
    }

    const x = i % width
    const y = Math.floor(i / width)

    let nearbyCount = 0
    let headingSum = 0
    let centerX = 0
    let centerY = 0

    // Check neighborhood
    for (let dy = -neighborhoodRadius; dy <= neighborhoodRadius; dy++) {
      for (let dx = -neighborhoodRadius; dx <= neighborhoodRadius; dx++) {
        const nx = x + dx
        const ny = y + dy
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx
          if (grid[nidx].occupied && nidx !== i) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist <= neighborhoodRadius) {
              nearbyCount++
              headingSum += grid[nidx].heading
              centerX += nx
              centerY += ny
            }
          }
        }
      }
    }

    if (nearbyCount > 0) {
      flockingInfo.push({
        nearbyCount,
        avgHeading: headingSum / nearbyCount,
        centerX: centerX / nearbyCount,
        centerY: centerY / nearbyCount,
      })
    } else {
      flockingInfo.push({ nearbyCount: 0, avgHeading: grid[i].heading, centerX: x, centerY: y })
    }
  }

  // Behavior mode parameters
  const behaviorParams = getBehaviorParameters(state.behaviorMode)

  // Second pass: Movement with flocking behavior
  for (let i = 0; i < grid.length; i++) {
    if (!grid[i].occupied) continue

    const x = i % width
    const y = Math.floor(i / width)
    const cell = grid[i]
    const flock = flockingInfo[i]

    // Calculate steering preferences with flocking
    const turnOptions = [-2, -1, 0, 1, 2] // Extended turn options for better maneuverability
    const scores: number[] = []

    for (const turn of turnOptions) {
      let score = 0
      const newHeading = ((cell.heading + turn + 8) % 8) as Direction
      const [dx, dy] = DIRECTION_VECTORS[newHeading]
      const nx = x + dx
      const ny = y + dy

      // Wall avoidance (strong)
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
        score -= 200
      } else {
        const nidx = ny * width + nx

        // Collision avoidance (strong)
        if (grid[nidx].occupied) {
          score -= 100
        }

        // FLOCKING BEHAVIORS (modulated by behavior mode):

        // 1. Alignment: Prefer to move in same direction as neighbors
        if (flock.nearbyCount > 0) {
          const headingDiff = Math.abs(newHeading - flock.avgHeading)
          const alignmentBonus = Math.max(0, 8 - headingDiff)
          score += alignmentBonus * behaviorParams.alignment
        }

        // 2. Cohesion: Move toward center of nearby flock
        if (flock.nearbyCount > 2) {
          const toCenterX = flock.centerX - x
          const toCenterY = flock.centerY - y
          const centerAngle = Math.atan2(toCenterY, toCenterX)
          const targetHeading = Math.round((centerAngle / (Math.PI * 2)) * 8) % 8
          const cohesionDiff = Math.abs(newHeading - targetHeading)
          score += Math.max(0, 8 - cohesionDiff) * behaviorParams.cohesion
        }

        // 3. Separation: Avoid getting too close (checked via sonar)
        const crowdedness = sonarField[nidx]
        if (crowdedness > 5) {
          score -= crowdedness * behaviorParams.separation * 0.8
        } else if (crowdedness > 2) {
          score -= crowdedness * behaviorParams.separation * 0.4
        }

        // 4. Flee disturbance (behavior-dependent)
        score -= disturbanceField[nidx] * behaviorParams.disturbanceAvoidance

        // 5. Prefer guano trails perpendicular (swirling behavior)
        const perpHeading1 = ((newHeading + 2) % 8) as Direction
        const perpHeading2 = ((newHeading + 6) % 8) as Direction
        const [pdx1, pdy1] = DIRECTION_VECTORS[perpHeading1]
        const [pdx2, pdy2] = DIRECTION_VECTORS[perpHeading2]

        const px1 = nx + pdx1
        const py1 = ny + pdy1
        const px2 = nx + pdx2
        const py2 = ny + pdy2

        if (px1 >= 0 && px1 < width && py1 >= 0 && py1 < height) {
          score += guanoField[py1 * width + px1] * behaviorParams.trailFollowing
        }
        if (px2 >= 0 && px2 < width && py2 >= 0 && py2 < height) {
          score += guanoField[py2 * width + px2] * behaviorParams.trailFollowing
        }

        // 6. Energy-based behavior: tired bats seek roost
        if (cell.energy < 3) {
          // Prefer edges (roosting spots)
          const distToEdge = Math.min(x, width - x, y, height - y)
          score += (10 - distToEdge) * 0.5
        }

        // 7. Chaos mode: Add strange attractor influence
        if (state.behaviorMode === 'chaos') {
          const chaosInfluence = getLorenzAttractor(x / width, y / height, state.tick)
          score += chaosInfluence * 10
        }
      }

      // Add controlled randomness for natural variation
      score += (rng.next() - 0.5) * wallRoughness * behaviorParams.randomness

      scores.push(score)
    }

    // Softmax selection for smooth probabilistic movement
    const maxScore = Math.max(...scores)
    const expScores = scores.map((s) => Math.exp((s - maxScore) / 8))
    const sumExp = expScores.reduce((a, b) => a + b, 0)
    const probabilities = expScores.map((e) => e / sumExp)

    // Select turn based on probabilities
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

    // Execute movement
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nidx = ny * width + nx
      if (!newGrid[nidx].occupied) {
        // Successful move: gain energy and velocity
        newGrid[i].occupied = false
        newGrid[nidx].occupied = true
        newGrid[nidx].heading = newHeading
        newGrid[nidx].energy = Math.min(7, cell.energy + 1)
        newGrid[nidx].velocity = Math.min(1, cell.velocity + 0.1) // Accelerate
      } else {
        // Blocked: lose energy and velocity
        newGrid[i].energy = Math.max(0, cell.energy - 1)
        newGrid[i].velocity = Math.max(0, cell.velocity - 0.2) // Decelerate
      }
    } else {
      // Hit wall: lose energy and velocity
      newGrid[i].energy = Math.max(0, cell.energy - 1)
      newGrid[i].velocity = Math.max(0, cell.velocity - 0.2) // Decelerate
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

  // Update metrics and determine behavior mode
  calculateMetrics(state)
}

/**
 * Calculate simulation metrics using efficient clustering algorithm
 */
function calculateMetrics(state: SimulationState): void {
  const { width, height, grid, disturbanceField } = state
  let batCount = 0
  let totalVelocity = 0
  let totalEnergy = 0
  let totalDisturbance = 0

  // Count bats and sum properties
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].occupied) {
      batCount++
      totalVelocity += grid[i].velocity
      totalEnergy += grid[i].energy
    }
    totalDisturbance += disturbanceField[i]
  }

  // Calculate clusters using union-find algorithm
  const parent = new Int32Array(grid.length)
  for (let i = 0; i < parent.length; i++) parent[i] = i

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  function union(x: number, y: number): void {
    parent[find(x)] = find(y)
  }

  // Connect adjacent bats
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x
      if (!grid[idx].occupied) continue

      // Check 4-connected neighbors for clustering
      const neighbors = [
        [x + 1, y],
        [x, y + 1],
        [x + 1, y + 1],
        [x - 1, y + 1],
      ]

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx
          if (grid[nidx].occupied) {
            union(idx, nidx)
          }
        }
      }
    }
  }

  // Count cluster sizes
  const clusterSizes = new Map<number, number>()
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].occupied) {
      const root = find(i)
      clusterSizes.set(root, (clusterSizes.get(root) || 0) + 1)
    }
  }

  const clusterCount = clusterSizes.size
  const largestClusterSize = clusterCount > 0 ? Math.max(...clusterSizes.values()) : 0

  // Calculate chaos level (based on velocity variance and disturbance)
  let velocityVariance = 0
  if (batCount > 0) {
    const avgVel = totalVelocity / batCount
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].occupied) {
        const diff = grid[i].velocity - avgVel
        velocityVariance += diff * diff
      }
    }
    velocityVariance /= batCount
  }

  const normalizedDisturbance = Math.min(1, totalDisturbance / (width * height * 10))
  const chaosLevel = Math.min(1, velocityVariance * 2 + normalizedDisturbance * 0.5)

  // Determine behavior mode based on state
  let behaviorMode: BehaviorMode = state.behaviorMode

  // Auto-transition behavior modes based on conditions
  if (normalizedDisturbance > 0.3) {
    behaviorMode = 'panic'
  } else if (chaosLevel > 0.7) {
    behaviorMode = 'chaos'
  } else if (batCount > 0 && totalVelocity / batCount < 0.3) {
    behaviorMode = 'roosting'
  } else if (clusterCount > 0 && largestClusterSize / batCount > 0.6) {
    behaviorMode = 'roosting'
  } else if (totalVelocity / Math.max(batCount, 1) > 0.6) {
    behaviorMode = 'foraging'
  } else {
    behaviorMode = 'calm'
  }

  // Update metrics
  state.metrics = {
    batCount,
    averageVelocity: batCount > 0 ? totalVelocity / batCount : 0,
    averageEnergy: batCount > 0 ? totalEnergy / batCount : 0,
    clusterCount,
    largestClusterSize,
    totalDisturbance,
    chaosLevel,
    behaviorMode,
  }

  state.behaviorMode = behaviorMode
}
