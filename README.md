# 🦇 OnlyBats.org

**No Capes. No Billionaires. Just Bats.**

A complete parody website dedicated to bats and only bats. A grassroots, scrappy, community-run site with mildly conspiratorial energy about "Big Bat" and the "anti-bat agenda," but never hateful or harassing.

## 🎯 Project Overview

OnlyBats.org is a satirical website that celebrates actual bats while gently mocking Batman and cape-based branding. The site features:

- **Perpetual Cellular Automata Simulation**: A never-halting bat cave simulation on the landing page
- **ASCII Bats**: Animated terminal art you can print and staple to telephone poles
- **Bat Facts**: Intentionally unhelpful but earnest-sounding bat information
- **Roost Board**: Community microforum with chirp/hiss voting
- **Microchirps**: 140-character bat microblog
- **Donate Guano**: Donation tiers with grassroots messaging
- **Poser Watch**: Report cape sightings
- **Easter Eggs**: Konami code, logo clicks, hidden pages

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma (SQLite for dev, Postgres-ready for production)
- **Auth**: NextAuth.js
- **Deployment**: Optimized for Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd onlybats
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and configure:
   - `DATABASE_URL`: Database connection string (default SQLite for dev)
   - `NEXTAUTH_URL`: Your site URL (http://localhost:3000 for dev)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXT_PUBLIC_REALTIME_URL`: (Optional) External WebSocket server URL

4. **Initialize the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Features

### Cave Simulation (Home Page)

The landing page features a perpetual cellular automata simulation of bats flying in a cave. The simulation:

- Never halts from any random initial state
- Includes multiple presets (Maternity Spiral, Guano Vortex, Tourist Panic, Cape Shadow)
- Has interactive controls (speed, density, sonar sensitivity, wall roughness)
- Responds to user clicks (inject disturbances)
- Runs smoothly using optimized canvas rendering

**Implementation**: `lib/batCaveSimulation.ts` + `components/CaveSimulation.tsx`

### Live Status

Shows real-time viewer count and "cave whispers" (community bulletin messages).

**Modes**:
- **Fallback Mode** (default): Polls `/api/presence` and `/api/whispers` every 5 seconds
- **WebSocket Mode**: Connects to external realtime backend if `NEXT_PUBLIC_REALTIME_URL` is set

**Implementation**: `lib/realtimeAdapter.ts` + `components/LiveStatus.tsx`

### ASCII Bats

Animated ASCII art bats in three styles:
- Cute
- Goth
- Taxonomically Dubious

Users can copy ASCII art to clipboard with the "PRINT THESE BATS" button.

### Bat Facts

Useless but earnest-sounding bat facts with a "Fact Quality Slider" that changes confidence tone only (low/medium/high certainty).

Includes a "Poser Watch" sidebar with mild snark at cape influencers.

### Authentication

Simple credential-based auth using NextAuth.js. Required for:
- Roost Board (microforum)
- Microchirps (microblog)

**Implementation**: `lib/auth.ts` + `/api/auth/[...nextauth]/route.ts`

### Roost Board

Community microforum with:
- Categories and threads
- Chirp/hiss voting system
- Auth-gated posting
- Database-backed via Prisma

**Status**: Basic structure implemented, expandable

### Microchirps

Microblog with:
- 140-character limit
- Filters: "High Sonar", "Low Drama", "Anti-Cape"
- Database-backed

**Status**: Basic structure implemented, expandable

### Donate Guano

Mock donation page with three tiers:
- Single Pellet ($5)
- Respectable Pile ($20)
- Cathedral of Guano ($100)

No real payment processing—just stores pledge intent.

### Poser Watch

Page for reporting cape sightings with form submission and recent verified sightings display.

### Easter Eggs

1. **Konami Code** (↑↑↓↓←→←→BA): Activates "ULTRASONIC MODE" with purple sonar waves and floating bats
2. **Logo Clicks** (13 clicks): Redirects to `/guano-economy` dashboard with nonsense metrics
3. **Hidden Page** (`/not-batman`): Deadpan analysis of "cape-based cosplay economics"

## 🗄️ Database Schema

### Models

- **User**: Authentication and user data
- **Category**: Forum categories
- **Thread**: Forum threads
- **Post**: Forum replies
- **Vote**: Chirp/hiss voting
- **Chirp**: Microchirp posts
- **Donation**: Donation pledges
- **Whisper**: Cave whisper messages

See `prisma/schema.prisma` for full schema.

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `DATABASE_URL`: Postgres connection string (use Neon, Supabase, or Vercel Postgres)
   - `NEXTAUTH_URL`: Your production URL
   - `NEXTAUTH_SECRET`: Random secret string
   - `NEXT_PUBLIC_REALTIME_URL`: (Optional) External WebSocket URL

3. **Deploy**: Vercel will automatically build and deploy

### Database Migration

For production with Postgres:

```bash
# Update DATABASE_URL in .env to Postgres connection string
npx prisma migrate dev --name init
npx prisma generate
```

### Fallback vs. WebSocket Mode

**Vercel-only mode** (no WebSocket):
- Set `NEXT_PUBLIC_REALTIME_URL` to empty
- Uses polling for presence and whispers
- Fully functional without external services

**Full mode** (with WebSocket):
- Deploy a separate Node.js WebSocket server (Fly.io, Render, Railway, etc.)
- Set `NEXT_PUBLIC_REALTIME_URL` to WebSocket server URL
- Enables real-time presence and disturbance broadcasting

## 🎨 Customization

### Adjusting Simulation Parameters

Edit `lib/batCaveSimulation.ts` to adjust:
- Direction vectors
- Field decay rates
- Movement rules
- Event frequencies

### Adding Bat Facts

Edit `app/bat-facts/page.tsx` to add more facts with confidence levels.

### Adding ASCII Bats

Edit `app/ascii-bats/page.tsx` to add new ASCII art styles.

## 🧪 Testing

Run the build to ensure Vercel compatibility:

```bash
npm run build
```

Check for TypeScript errors:

```bash
npx tsc --noEmit
```

## 📁 Project Structure

```
onlybats/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   ├── ascii-bats/           # ASCII Bats page
│   ├── bat-facts/            # Bat Facts page
│   ├── donate-guano/         # Donate page
│   ├── guano-economy/        # Easter egg dashboard
│   ├── microchirps/          # Microchirps page
│   ├── not-batman/           # Easter egg page
│   ├── poser-watch/          # Poser Watch page
│   ├── roost-board/          # Roost Board page
│   ├── sign-in/              # Sign in page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page (Cave)
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── CaveSimulation.tsx    # Main simulation component
│   ├── Footer.tsx            # Footer
│   ├── KonamiListener.tsx    # Konami code easter egg
│   ├── LiveStatus.tsx        # Live viewer count/whispers
│   ├── LogoClickListener.tsx # Logo click easter egg
│   └── Navbar.tsx            # Navigation
├── lib/                      # Utilities and core logic
│   ├── auth.ts               # NextAuth config
│   ├── batCaveSimulation.ts  # Simulation engine
│   ├── prisma.ts             # Prisma client
│   └── realtimeAdapter.ts    # Realtime abstraction
├── prisma/                   # Prisma schema and migrations
│   └── schema.prisma         # Database schema
├── types/                    # TypeScript type definitions
│   └── next-auth.d.ts        # NextAuth types
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🤝 Contributing

This is a parody project. Contributions should maintain the satirical tone:

- Keep it playful, never hateful
- Focus on bats (real bats)
- Mild snark at Batman/capes is fine, but keep it light
- No real-world harassment or targeting

## 📜 License

See LICENSE file for details.

## 🦇 Credits

- Built with Next.js, React, TypeScript, and Tailwind CSS
- Inspired by actual bats and their amazing echolocation abilities
- No affiliation with Big Bat or their anti-bat agenda
- Independent, community-funded, grassroots operation

---

**Remember**: Real bats do the work. Capes are just theater.

🦇 **No Capes. No Billionaires. Just Bats.** 🦇
