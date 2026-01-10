# Architecture Overview

## Goals
- Production-grade Next.js application
- Clear separation between UI, data, and backend logic
- Maintainable and extensible feature structure
- Vercel-friendly runtime constraints

## High-Level Architecture

```
Browser
  ↓
Next.js App Router (Server Components)
  ├── UI Components (components/)
  ├── Pages (app/)
  ├── API Routes (app/api/)
  └── Utilities (lib/)
        ↓
     Prisma Client
        ↓
     Database (SQLite dev / Postgres prod)
```

## Key Modules

- `app/`: Next.js routes, layouts, and pages
- `components/`: UI components and interactive client modules
- `lib/`: Shared utilities, auth, realtime adapter, simulation logic
- `prisma/`: Database schema and migrations

## Data Flow

1. User interacts with a page in `app/`
2. Server component renders using data from `lib/` or Prisma
3. API routes (`app/api/`) handle mutations and dynamic data
4. Prisma abstracts database access

## Realtime Strategy

- **Default**: Polling via `/api/presence` and `/api/whispers`
- **Optional**: External WebSocket server using `NEXT_PUBLIC_REALTIME_URL`
- Abstraction handled in `lib/realtimeAdapter.ts`

## Authentication

- NextAuth.js with credential provider
- Auth configuration in `lib/auth.ts`
- Protected routes/components check session state

## Performance Notes

- Cave simulation uses canvas and `requestAnimationFrame`
- Simulation logic lives in `lib/batCaveSimulation.ts`
- Client-only modules are code-split where possible

## Deployment

- Vercel deployment with Next.js App Router
- Serverless constraints (short-lived, stateless API routes)
- Environment-driven configuration
