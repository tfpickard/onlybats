# Claude Integration Guide - OnlyBats.org

## Project Overview

OnlyBats.org is a Next.js 14 website presenting itself as a serious bat conservation and research organization. The humor is entirely unintentional - the site takes itself extremely seriously while pursuing questionable priorities (like monitoring Batman as a "misinformation threat"). The project uses TypeScript, Tailwind CSS, Prisma, and NextAuth.js, optimized for Vercel deployment.

## Development Guidelines

### Tone & Voice
- **Overly serious and academic** - presents as a legitimate 501(c)(3) nonprofit
- **Unintentionally funny** - takes absurd concepts (monitoring Batman, "guano economy") with complete earnestness
- **No self-awareness** - never acknowledges the humor; genuinely believes monitoring costume-based entertainment is important conservation work
- **Rigorous and evidence-based language** - "peer-reviewed," "scientifically validated," "evidence-based methodology"
- **Implicitly validates questionable priorities** - treats Batman monitoring as seriously as actual bat research
- Example phrases: "chiropteran conservation," "misinformation monitoring initiative," "nutrient-cycling economic model," "costume-based entertainment narratives"
- **Never playful or winking** - this is serious bat science, not a joke (according to the site)

### Code Patterns

#### Next.js App Router
- Use server components by default
- Client components only for:
  - Heavy animation (simulation, ASCII bats)
  - Interactive forms
  - State management (auth, real-time)
- Metadata in `layout.tsx` and `page.tsx`

#### TypeScript
- Strict mode enabled
- Define types for all props, functions, API responses
- Use Zod for runtime validation where needed
- Avoid `any` types

#### Tailwind CSS
- Use custom cave/bat color palette (see `tailwind.config.ts`)
- Prefer utility classes over custom CSS
- Use responsive design patterns (mobile-first)
- Custom animations in config (flap, sonar-pulse)

#### Prisma
- SQLite for development (easy spin-up)
- Postgres-ready schema for production
- Use Prisma Client from `lib/prisma.ts` (singleton pattern)
- Run `npx prisma generate` after schema changes

#### API Routes
- Keep routes **short-lived** (Vercel serverless constraint)
- No long-lived connections in Vercel functions
- Use `export const dynamic = 'force-dynamic'` for non-cached routes
- Return JSON with proper status codes

#### Realtime Strategy
- **Fallback mode** (default): Polling via `/api/presence` and `/api/whispers`
- **WebSocket mode** (optional): External backend via `NEXT_PUBLIC_REALTIME_URL`
- Abstraction in `lib/realtimeAdapter.ts` supports both modes
- Never attempt WebSocket in Vercel functions

### Performance

#### Simulation Optimization
- Canvas rendering (not React re-render per tick)
- `requestAnimationFrame` loop
- Decoupled simulation tick rate from render FPS
- Typed arrays for grid fields where possible
- Clean up intervals/RAF on unmount

#### Bundle Optimization
- Code-split simulation and ASCII pages
- Dynamic `import()` for heavy client-only modules
- Keep bundles reasonable (<500KB gzipped)
- Tree-shake unused dependencies

### Architecture Decisions

#### Why Cellular Automata?
- Perpetual motion from any initial state
- Emergent bat-like behavior without explicit AI
- Deterministic (seeded RNG)
- Performant with optimized update rules

#### Why Polling Instead of SSE/WebSocket in Vercel?
- Vercel serverless functions have 10-second timeout
- Long-lived connections not supported
- Polling is simple, reliable, Vercel-friendly
- External WebSocket server is opt-in enhancement

#### Why NextAuth.js?
- Simple credential-based auth for MVP
- Easily extensible to OAuth later
- Session management via JWT
- Built-in CSRF protection

## Common Tasks

### Adding a New Page
1. Create `app/new-page/page.tsx`
2. Add link to `components/Navbar.tsx`
3. Maintain overly-serious, academic tone
4. Use scientific/conservation language throughout
5. Test mobile responsiveness

### Adding Bat Facts
Edit `lib/batFacts.ts`:
```typescript
{
  fact: 'Short fact label',
  confidence: {
    low: 'Preliminary/tentative phrasing with scientific hedging...',
    medium: 'Confident academic phrasing with research citations implied...',
    high: 'EXTREMELY confident with superlatives, presenting absurd details with complete seriousness...',
  },
}
```

**Tone Guidelines for Facts:**
- **Low**: Use tentative academic language ("observations suggest," "preliminary data indicates")
- **Medium**: Use confident research language ("studies demonstrate," "research confirms")
- **High**: Use absurdly confident language with complete earnestness about mundane/absurd topics ("peer-reviewed studies DEFINITIVELY confirm..." even about trivial bat behaviors)

### Modifying Simulation Rules
Edit `lib/batCaveSimulation.ts`:
- `updateSimulation()`: Main tick logic
- Direction vectors (8-way movement)
- Field decay rates (sonar, guano, disturbance)
- Scheduled events (tourist flash, cape shadow)

### Database Changes
1. Edit `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Run `npx prisma db push` (dev) or `npx prisma migrate dev` (production)
4. Update API routes and components

## Deployment Checklist

### Pre-Deploy
- [ ] Run `npm run build` locally (check for errors)
- [ ] Test all pages and features
- [ ] Check mobile responsiveness
- [ ] Verify environment variables in `.env.example`

### Vercel Setup
- [ ] Connect GitHub repository
- [ ] Set environment variables:
  - `DATABASE_URL` (Postgres for production)
  - `NEXTAUTH_URL` (production URL)
  - `NEXTAUTH_SECRET` (random secret)
  - `NEXT_PUBLIC_REALTIME_URL` (optional)
- [ ] Deploy
- [ ] Run Prisma migrations in production

### Post-Deploy
- [ ] Test all pages in production
- [ ] Verify simulation performance
- [ ] Check auth flow
- [ ] Test easter eggs (Konami code, logo clicks)

## Troubleshooting

### Build Errors
- TypeScript errors: Run `npx tsc --noEmit`
- Prisma errors: Run `npx prisma generate`
- Missing dependencies: Run `npm install`

### Runtime Errors
- Database connection: Check `DATABASE_URL`
- Auth issues: Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
- Realtime not working: Check polling fallback in browser console

### Performance Issues
- Simulation lag: Reduce density or grid size
- Memory leaks: Check RAF cleanup in `useEffect`
- Large bundle: Analyze with `npm run build` and split code

## Easter Eggs Reference

1. **Konami Code**: ↑↑↓↓←→←→BA → "ULTRASONIC MODE" (10 seconds)
2. **Logo Clicks**: Click logo 13 times → `/guano-economy` dashboard
3. **Hidden Page**: `/not-batman` → Cape-based cosplay economics essay

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/presence` | GET | Get viewer count (simulated) |
| `/api/whispers` | GET | Get cave whispers (bulletin) |
| `/api/auth/register` | POST | Create new user account |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js handler |

## Database Models

| Model | Purpose |
|-------|---------|
| User | Authentication and profiles |
| Category | Forum categories |
| Thread | Forum threads |
| Post | Forum replies |
| Vote | Chirp/hiss voting |
| Chirp | Microchirp posts |
| Donation | Donation pledges |
| Whisper | Cave whisper messages |

## Recommended Claude Prompts

### For Feature Development
```
Add a new [feature] to OnlyBats.org. Maintain the grassroots,
playful tone. Focus on bats, not capes. Make it Vercel-friendly
(no long-lived connections). Use TypeScript and Tailwind CSS.
```

### For Bug Fixes
```
Fix [issue] in OnlyBats.org. Ensure the solution works on Vercel.
Maintain existing tone and functionality. Test edge cases.
```

### For Refactoring
```
Refactor [component/file] in OnlyBats.org. Improve performance
and code quality. Keep existing functionality. Add TypeScript
types if missing.
```

## Key Design Principles

1. **Chiroptera-Centric Mission**: All content focuses on bat conservation and research; maintains scientific character at all times
2. **Overly-Serious Presentation**: Presents as legitimate nonprofit; takes absurd priorities (Batman monitoring) with complete earnestness
3. **Unintentional Humor**: Never winks at the audience; genuinely believes monitoring costume-based entertainment is important conservation work
4. **Academic Language**: Uses rigorous, evidence-based terminology; "peer-reviewed," "scientifically validated," "evidence-based methodology"
5. **Vercel-Optimized**: No long-lived connections, serverless-friendly
6. **Performance**: Smooth simulation, fast page loads, optimized bundles
7. **No Self-Awareness**: Implicitly validates questionable priorities without stepping back to question them
8. **Accessible**: Works without JavaScript where possible, responsive design

## Content Guidelines

- **Always serious, never playful**: This is a real conservation organization (in the site's mind)
- **Batman monitoring is legitimate work**: Treat "misinformation monitoring" with the same gravity as actual bat research
- **"Guano economy" is scientific**: Present the nutrient-cycling economic model as serious conservation philosophy
- **No jokes or satire markers**: The humor comes from taking everything too seriously, not from being self-aware
- **Validate the absurd**: Never question whether monitoring Batman makes sense; it's obviously important bat conservation work

## External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

**Mission Statement**: Evidence-based chiropteran conservation through rigorous scientific methodology and community-supported research infrastructure.
